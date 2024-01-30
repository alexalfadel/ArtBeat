import "./Rsvps.css";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Rsvps({ rsvpProps }) {
  const { closeModal } = useModal();
  const { upcomingOrAttending, rsvps, artists, shows, message } = rsvpProps;

  let rsvpList;

  if ( rsvps && !rsvps.length) {
    rsvpList = <p id='no-rsvps-p' >No RSVPs yet, check back soon.</p>
  } else {
    rsvpList = rsvps?.map((rsvp) => {
      const name = artists.filter((artist) => artist.id === rsvp.userId)[0].name;
      return (
        <Link
          className="rsvp-names"
          onClick={closeModal}
          key={`rsvp-${rsvp.id}`}
          to={`/artists/${rsvp.userId}`}
        >
          {name}
        </Link>
      );
    });
  }

  const showList = shows?.map((show) => {
    return (
      <Link
        className='attending-shows-rsvps'
        onClick={closeModal}
        key={`rsvp-show-${show.name}`}
        to={`/shows/${show.id}`}
      >
        {show.name}
      </Link>
    );
  });

  return (
    <div id='rsvp-modal-container'>
      <p id='rsvp-modal-x' onClick={closeModal}>X</p>
      {upcomingOrAttending === "upcoming" && (
        <h2>You can count on seeing these people at your show!</h2>
      )}
      {upcomingOrAttending === "attending" && !message && (
        <h2>Shows you're RSVP'd to:</h2>
      )}
      {message && <h2>{message}</h2>}
      <div>
        {upcomingOrAttending === "upcoming" && <div id='rsvp-list-div'>{rsvpList}</div>}
        {upcomingOrAttending === "attending" && !message && <div id='show-list-container'>{showList}</div>}
      </div>
    </div>
  );
}

export default Rsvps;
