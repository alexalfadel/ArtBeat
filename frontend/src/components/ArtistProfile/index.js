import { useDispatch, useSelector } from 'react-redux'
import './ArtistProfile.css'
import { useParams, Link } from 'react-router-dom'
import { useEffect } from 'react'
import { getAllArtistsThunk, updateArtistThunk } from '../../store/artists'
import { getAllShowsThunk } from '../../store/shows'
import { useState } from 'react'
import { validProfilePic } from '../SignUpFormModal'
import ShowCard from '../ShowCard'
import Rsvps from '../Rsvps'
import OpenModalButton from '../OpenModalButton'
import { getAllRsvpsThunk } from '../../store/rsvp'
import DeleteShowModal from '../DeleteShowModal'


function ArtistProfile() {
    const dispatch = useDispatch()
    const { artistId } = useParams()
    const user = useSelector((state) => state.session).user
    const allShows = useSelector((state) => state.shows)
    const allArtists = useSelector((state) => state.artists)[0]
    const attendingRsvps = useSelector((state) => state.rsvps)
    const [ updating, setUpdating ] =  useState(false)
    const [ profilePic, setProfilePic ] = useState('')
    const [ newProfilePic, setNewProfilePic ] = useState(false)
    const [ newProfilePicUrl, setNewProfilePicUrl ] = useState('')
    const [ holdProfilePicUrl, setHoldProfilePicUrl ] = useState('')
    const [ previewProfileUrl, setPreviewProfileUrl ] = useState('')
    const [ location, setLocation ] = useState('')
    const [ username, setUsername ] = useState('')
    const [ bio, setBio ] = useState('')
    const [ errors, setErrors ] = useState({})
    const [ showErrors, setShowErrors ] = useState(false)
    const [ upcomingOrAttending, setUpcomingOrAttending ] = useState('upcoming')
    const allArtistUsernames = allArtists?.map((currArtist) => {
        if (`${currArtist.id}` !== artistId) return currArtist.username
    })

    useEffect(() => {
        dispatch(getAllArtistsThunk())
        dispatch(getAllShowsThunk())
        dispatch(getAllRsvpsThunk(artistId))
    }, [dispatch])

    useEffect(() => {
        let errors = {}

        if (newProfilePicUrl && !validProfilePic(newProfilePicUrl)) errors.profilePic = 'Please enter a valid url ending in .jpg, .jpeg, or .png'
        if (allArtistUsernames?.includes(username))  errors.username = 'This username is already taken.'

        setErrors(errors)
    }, [username, newProfilePicUrl])

    if (!user || !allShows.length || !allArtists || !attendingRsvps.length ) return <h1>loading...</h1>

    const artist = allArtists.filter((artist) => `${artist.id}` === artistId)[0]

    if (!profilePic) setProfilePic(artist.profilePic)
    if (!previewProfileUrl) setPreviewProfileUrl(artist.profilePic)
    if (!location) {
        setLocation(artist.location)
        setUsername(artist.username)
        setBio(artist.bio)
    }


    let ownProfile = false;
    if (artist.id === user.id) ownProfile = true

    const cancel = () => {
        setProfilePic(artist.profilePic)
        setLocation(artist.location)
        setUsername(artist.username)
        setBio(artist.bio)
        setUpdating(false)
        setHoldProfilePicUrl('')
        setNewProfilePic('')
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if (errors.profilePic || errors.username) {
            setShowErrors(true)
        } else {
            const updatedProfilePic = newProfilePic ? newProfilePicUrl : artist.profilePic
            const updatedArtist = {
                id: artist.id,
                username: username,
                bio: bio,
                location: location,
                profilePic: updatedProfilePic
            }

            dispatch(updateArtistThunk(updatedArtist))
            setUpdating(false)
            setErrors({})
            setProfilePic('')
        }

    }

    const upcomingShows = allShows.filter((show) => show.userId === artist.id)
    const upcomingShowCards = upcomingShows?.map((show) => {

    const rsvpProps = {
        upcomingOrAttending: 'upcoming',
        rsvps: show.Rsvps,
        artists: allArtists
    }
        return (
            <div>
                <ShowCard id={`upcoming-show-${show.id}`} show={show}/>
                <div>
                    <OpenModalButton buttonText='RSVPs' modalComponent={<Rsvps rsvpProps={rsvpProps}/>}/>
                    <Link to={`/show/${show.id}/update`}>Update</Link>
                    <OpenModalButton buttonText='Delete' modalComponent={<DeleteShowModal showId={show.id} />}/>
                </div>
            </div>
            
        )
    })

    let attendingRsvpProps;

    if (attendingRsvps[0].message && attendingRsvps[0].message === 'No Rsvps') {
        attendingRsvpProps = {
            upcomingOrAttending: 'attending',
            message: "You're not RSVP'd to any upcoming shows."
        }
    } else {
        const attendingRsvpShowIds = attendingRsvps[0].map((rsvp) => rsvp.showId )
        const attendingRsvpShows = allShows.filter((show) => attendingRsvpShowIds.includes(show.id))
    
        attendingRsvpProps = {
            upcomingOrAttending: 'attending',
            shows: attendingRsvpShows
        }
    }
    
    // console.log(attendingRsvpProps)

    return (
        <div>
            {!updating && <div className='top-profile-box'>
                <div className='left-top-profile-box'>
                    <img src={artist.profilePic} alt={`${artist.name}`}></img>
                    <p>Located in {artist.location}</p>
                </div>
                <div>
                    {ownProfile && <h2>Hi, {artist.username}!</h2>}
                    {!ownProfile && <h2>{artist.username}</h2>}
                    <p>{artist.bio}</p>
                </div>
                {ownProfile && <button onClick={(() => setUpdating(true))}>Update Profile</button>}
            </div>}
            { updating && ownProfile && <form>
                <div>
                    <img src={previewProfileUrl} alt={`${artist.name}`}></img>
                    <div>
                        <input value={holdProfilePicUrl} placeholder='Add a new profile picture url here.' onChange={(e) => setHoldProfilePicUrl(e.target.value)}></input>
                        <button onClick={((e) => {
                            e.preventDefault()
                            setNewProfilePicUrl(holdProfilePicUrl)
                            setNewProfilePic(true)
                            setPreviewProfileUrl(holdProfilePicUrl)
                        })}>Change</button>
                    </div>
                    <div>
                        <p>Located in <span><select value={location} onChange={((e) => setLocation(e.target.value))}>
                                <option value='San Francisco'>San Francisco</option>
                                <option value='Los Angeles'>Los Angeles</option>
                                <option value='Phoenix'>Phoenix</option>
                                <option value='Tucson'>Tucson</option>
                                <option value='Austin'>Austin</option>
                                <option value='Dallas'>Dallas</option>
                                <option value='New York'>New York</option>
                                <option value='Miami'>Miami</option>
                                <option value='Other'>Other</option>
                            </select></span></p>
                    </div>
                </div>
                <div>
                        <h2>Hi, <span><input value={username} type='text' minLength='4' maxLength='30' placeholder={artist.username} onChange={((e) => setUsername(e.target.value))}></input></span></h2>
                        <textarea  maxLength='256' value={bio} placeholder={bio} onChange={(e) => setBio(e.target.value)}></textarea>
                </div>
                <div>
                    <button onClick={onSubmit}>Update</button>
                    <button onClick={cancel}>X</button>
                </div>
                </form>}
                {ownProfile && <div>
                            <div>
                                <p>Upcoming Shows</p>
                                <OpenModalButton buttonText="Show's I'm Attending" modalComponent={<Rsvps rsvpProps={attendingRsvpProps}/>}/>
                            </div>
                            <div>
                                <Link to='/shows/new'><button>Add a Show+</button></Link>
                            </div>
                </div>}
                {upcomingOrAttending === 'upcoming' && <div>
                    {upcomingShowCards}
                    </div>}
                {upcomingOrAttending === 'attending' && <div>

                    </div>}
               
            
        </div>
    )
}

export default ArtistProfile