import "./Rsvps.css";
import { useModal } from "../../context/Modal";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Rsvps({ rsvpProps }) {
  const { closeModal } = useModal();
  const { upcomingOrAttending, rsvps, artists, shows, message } = rsvpProps;

  const rsvpList = rsvps?.map((rsvp) => {
    const name = artists.filter((artist) => artist.id === rsvp.userId)[0].name;
    return (
      <Link
        onClick={closeModal}
        key={`rsvp-${rsvp.id}`}
        to={`/artists/${rsvp.userId}`}
      >
        {name}
      </Link>
    );
  });

  const showList = shows?.map((show) => {
    return (
      <Link
        onClick={closeModal}
        key={`rsvp-show-${show.name}`}
        to={`/shows/${show.id}`}
      >
        {show.name}
      </Link>
    );
  });

  return (
    <div>
      <p onClick={closeModal}>X</p>
      {upcomingOrAttending === "upcoming" && (
        <h2>You can count on seeing these people at your show!</h2>
      )}
      {upcomingOrAttending === "attending" && !message && (
        <h2>Shows you're RSVP'd to:</h2>
      )}
      {message && <h2>{message}</h2>}
      <div>
        {upcomingOrAttending === "upcoming" && rsvpList}
        {upcomingOrAttending === "attending" && !message && showList}
      </div>
    </div>
  );
}

export default Rsvps;
