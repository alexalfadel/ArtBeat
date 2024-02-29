import { useDispatch, useSelector } from "react-redux";
import "./ArtistProfile.css";
import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { getAllArtistsThunk, updateArtistThunk } from "../../store/artists";
import { getAllShowsThunk } from "../../store/shows";
import { useState } from "react";
import { validProfilePic } from "../SignUpFormModal";
import ShowCard from "../ShowCard";
import Rsvps from "../Rsvps";
import OpenModalButton from "../OpenModalButton";
import { getAllRsvpsThunk } from "../../store/rsvp";
import DeleteShowModal from "../DeleteShowModal";
import { useHistory } from "react-router-dom";
import { isValidImageFile } from "../AddShowForm";

function ArtistProfile() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { artistId } = useParams();
  const user = useSelector((state) => state.session).user;
  const allShows = useSelector((state) => state.shows);
  const allArtists = useSelector((state) => state.artists)[0];
  const attendingRsvps = useSelector((state) => state.rsvps);
  const [updating, setUpdating] = useState(false);
  const [profilePic, setProfilePic] = useState("");
  const [newProfilePic, setNewProfilePic] = useState(false);
  const [newProfilePicUrl, setNewProfilePicUrl] = useState("");
  const [holdProfilePicUrl, setHoldProfilePicUrl] = useState("");
  const [previewProfileUrl, setPreviewProfileUrl] = useState("");
  const [location, setLocation] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [upcomingOrAttending, setUpcomingOrAttending] = useState("upcoming");
  const [updatedProfilePic, setUpdatedProfilePic] = useState('')
  const [reRender, setReRender] = useState(0)
  const allArtistUsernames = allArtists?.map((currArtist) => {
    if (`${currArtist.id}` !== artistId) return currArtist.username;
  });


  useEffect(() => {
    dispatch(getAllArtistsThunk());
    dispatch(getAllShowsThunk());
    dispatch(getAllRsvpsThunk(artistId));
    console.log('we are dispatching getAllArtists')
  }, [dispatch, reRender]);

  // useEffect(() => {
  //   dispatch(getAllShowsThunk())
  //   console.log('we are dispatching getAllShows')
  // }, [dispatch])

  // useEffect(() => {
  //   dispatch(getAllRsvpsThunk(artistId))
  //   console.log('we are dispatching getAllRSVP')
  // }, [dispatch])

  useEffect(() => {
    let errors = {};

    if (newProfilePicUrl && !isValidImageFile(profilePic))
      errors.profilePic =
        "Please enter a valid url ending in .jpg, .jpeg, or .png";
    if (allArtistUsernames?.includes(username))
      errors.username = "This username is already taken.";

    setErrors(errors);
  }, [username, newProfilePicUrl]);

  console.log(allArtists, '---allArtists outside of the if, BEFORE')

  if (!user || !allShows.length) {
    console.log(!user, '---!user')
    console.log(user, '---user')
    console.log(allShows, '---allShows')
    console.log(allArtists, '---allArtists')
    console.log(!allShows.length, '----!allShows.length')
    console.log(!allArtists, '---!allArtists')
    return <h1 className='loading'>Loading...</h1>;
  }

 if (!allArtists) {
  return <h1 className="loading">Loading... If you don't get redirected in 30 seconds, please click <Link to={`artists/${artistId}`}></Link></h1>
  }

  console.log(allArtists, '---allArtists outside of the if, AFTER')
  const artist = allArtists?.filter((artist) => `${artist.id}` === artistId)[0];
  if (!artist) {
    history.push("/");
    console.log('---we are in !artist----')
    
    return <h1 className='loading'>Loading...</h1>;
  }
  if (!attendingRsvps.length) {
    console.log(!attendingRsvps.length, '---!attendingRsvps.length')
    return <h1 className='loading'>Loading...</h1>;
  }

  if (!profilePic || !holdProfilePicUrl) {
    setProfilePic(artist.profilePic);
    setHoldProfilePicUrl(artist.profilePic);
  }

  if (!location) {
    setLocation(artist.location);
    setUsername(artist.username);
    setBio(artist.bio);
  }

  let ownProfile = false;
  if (artist.id === user.id) ownProfile = true;

  const cancel = () => {
    setProfilePic(artist.profilePic);
    setLocation(artist.location);
    setUsername(artist.username);
    setBio(artist.bio);
    setUpdating(false);
    setHoldProfilePicUrl(artist.profilePic);
    setNewProfilePic("");
  };


  const onSubmit = (e) => {
    e.preventDefault();

    if (errors.profilePic || errors.username) {
      setShowErrors(true);
    } else {
      const updatedProfilePic = newProfilePic
        ? profilePic
        : null;
      const updatedArtist = {
        id: artist.id,
        username: username,
        bio: bio,
        location: location,
        profilePic: updatedProfilePic,
      };

      dispatch(updateArtistThunk(updatedArtist));
      setUpdating(false);
      setErrors({});
      setUpdatedProfilePic(profilePic)
      setNewProfilePicUrl('')
      setReRender(reRender + 1)
    }
  };


  const upcomingShows = allShows.filter((show) => show.userId === artist.id);
  const upcomingShowCards = upcomingShows?.map((show) => {
    const rsvpProps = {
      upcomingOrAttending: "upcoming",
      rsvps: show.Rsvps,
      artists: allArtists,
    };
    return (
      <div className='artist-profile-show-card-box'>
        <ShowCard id={`upcoming-show-${show.id}`} show={show} />
        {ownProfile && <div className='artist-profile-show-card-links'>
          <OpenModalButton
            id='artist-profile-show-card-rsvps'
            buttonText="RSVPs"
            modalComponent={<Rsvps rsvpProps={rsvpProps} />}
          />
          <Link id='artist-profile-show-card-update' to={`/shows/${show.id}/update`}>Update Show</Link>
          <Link id='artist-profile-show-card-update' to={`/shows/${show.id}/images`}>Update Images</Link>
          <OpenModalButton
            id='artist-profile-show-card-delete'
            buttonText="Delete"
            modalComponent={<DeleteShowModal showId={show.id} />}
          />
        </div>}
      </div>
    );
  });

  let attendingRsvpProps;

  if (attendingRsvps[0].message && attendingRsvps[0].message === "No Rsvps") {
    attendingRsvpProps = {
      upcomingOrAttending: "attending",
      message: "You're not RSVP'd to any upcoming shows.",
    };
  } else {
    const attendingRsvpShowIds = attendingRsvps[0].map((rsvp) => rsvp.showId);
    const attendingRsvpShows = allShows.filter((show) =>
      attendingRsvpShowIds.includes(show.id)
    );

    attendingRsvpProps = {
      upcomingOrAttending: "attending",
      shows: attendingRsvpShows,
    };
  }

  return (
    <div id="artist-profile-full-page">
      <div id="artist-profile-container">
        {!updating && (
          <div className="top-profile-box">
            <div id="top-top-profile-box">
              <div className="left-top-profile-box">
                <img
                  className="artist-profile-profile-pic"
                  src={artist.profilePic}
                  alt={`${artist.name}`}
                ></img>
                <p>Located in {artist.location}</p>
              </div>
              <div id="right-top-profile-box">
                {ownProfile && <h2>Hi, {artist.username}!</h2>}
                {!ownProfile && <h2>{artist.username}</h2>}
                {artist.bio && <p className='artist-profile-bio'>{artist.bio}</p>}
                {!artist.bio && !ownProfile && <p className='artist-profile-bio'>No bio yet, check back soon!</p>}
                {!artist.bio && ownProfile && <p className='artist-profile-bio'>Add a bio, tell the world who you are!</p>}

              </div>
            </div>
            {ownProfile && (
              <button
                id="update-profile-button"
                onClick={() => setUpdating(true)}
              >
                Update Profile
              </button>
            )}
          </div>
        )}
        {updating && ownProfile && (
          <form className="form-profile-box">
            <div className="form-top-container-holder">
              <div>
                {/* <img className='artist-profile-profile-pic' src={holdProfilePicUrl} alt={`${artist.name}`}></img> */}
                <div id="profile-picture-input-box">
                  <img
                    className="artist-profile-profile-pic"
                    src={newProfilePicUrl ? holdProfilePicUrl : artist.profilePic}
                    alt={`${artist.name}`}
                  ></img>
                  <input
                    id="profile-picture-input"
                    type='file'
                    // value={previewProfileUrl}
                    // placeholder="Add a new profile picture url here."
                    onChange={(e) => {
                      if (isValidImageFile(e.target.files[0])) {
                        setNewProfilePicUrl(URL.createObjectURL(e.target.files[0]));
                        setHoldProfilePicUrl(URL.createObjectURL(e.target.files[0]));
                        setPreviewProfileUrl(URL.createObjectURL(e.target.files[0]));
                        setProfilePic(e.target.files[0]);
                        setNewProfilePic(true);
                        // setPreviewImagePlaceholder(e.target.value);
                      } else {
                        // setPreviewImageUrl(e.target.value);
                        // setPreviewProfileUrl(e.target.files[0]);
                        setHoldProfilePicUrl(
                          "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                        );
                      }
                    }}
                  ></input>
                  <div>
                    <p id="update-profile-located-in">
                      Located in{" "}
                      <span>
                        <select
                          id="update-profile-change-location"
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                        >
                          <option value="San Francisco">San Francisco</option>
                          <option value="Los Angeles">Los Angeles</option>
                          <option value="Phoenix">Phoenix</option>
                          <option value="Tucson">Tucson</option>
                          <option value="Austin">Austin</option>
                          <option value="Dallas">Dallas</option>
                          <option value="New York">New York</option>
                          <option value="Miami">Miami</option>
                          <option value="Seattle">Seattle</option>
                          <option value="Portland">Portland</option>
                          <option value="Santa Fe">Santa Fe</option>
                          <option value="New Orleans">New Orleans</option>
                          <option value="Chicago">Chicago</option>
                          <option value="Cincinnati">Cincinnati</option>
                          <option value="Atlanta">Atlanta</option>
                          <option value="Philadelphia">Philadelphia</option>
                          <option value="Boston">Boston</option>
                          <option value="Baltimore">Baltimore</option>
                          <option value="Other">Other</option>
                        </select>
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className='updating-top-right-profile-box'>
                <h2>
                  Hi,{" "}
                  <span>
                    <input
                      id='updating-username-input'
                      value={username}
                      type="text"
                      minLength="4"
                      maxLength="30"
                      placeholder={artist.username}
                      onChange={(e) => setUsername(e.target.value)}
                    ></input>
                  </span> !
                </h2>
                <textarea
                  id='updating-description-text-area'
                  maxLength="256"
                  value={bio}
                  placeholder={bio}
                  onChange={(e) => setBio(e.target.value)}
                ></textarea>
              </div>
            </div>
            <div className='updating-profile-buttons'>
              <button className='update-cancel-profile' onClick={onSubmit}>Update</button>
              <button className='update-cancel-profile' onClick={cancel}>X</button>
            </div>
          </form>
        )}
        {/* {!ownProfile && <div id='not-profile-upcoming-shows-box'><p id='not-profile-upcoming-shows-p'>Upcoming Shows</p></div>} */}
        {ownProfile && (
          <div className='artist-profile-show-links'>
            <div className='artist-profile-show-links-left'>
              {/* <p id='artist-profile-upcoming-shows'>Upcoming Shows</p> */}
            </div>
            <div className='artist-profile-show-links-right'>
            <OpenModalButton
                id='shows-attending-modal'
                buttonText="Show's I'm Attending"
                modalComponent={<Rsvps rsvpProps={attendingRsvpProps} />}
              />
              <Link to="/shows/new">
                <button id='artist-profile-add-show-button'>Add a Show+</button>
              </Link>
            </div>
          </div>
        )}
        <p id='artist-profile-upcoming-shows'>Upcoming Shows</p>
        {/* {upcomingOrAttending === 'upcoming' && upcomingShowCards.length && ownProfile && <p id='no-shows-p'>Upcoming Shows</p>} */}

        {upcomingOrAttending === "upcoming" && <div className='artist-profile-upcoming-show-container'>{upcomingShowCards}</div>}
        {upcomingOrAttending === 'upcoming' && !upcomingShowCards.length && !ownProfile && <p id='no-shows-p'>No shows scheduled, check back soon!</p>}
        {upcomingOrAttending === 'upcoming' && !upcomingShowCards.length && ownProfile && <p id='no-shows-p'>No shows scheduled, add one soon!</p>}

        {/* {upcomingOrAttending === "attending" && <div></div>} */}
      </div>
    </div>
  );
}

export default ArtistProfile;
