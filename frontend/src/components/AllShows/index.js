import React, { useEffect, useState } from "react";
import "./AllShows.css";
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
import { getAllShowsThunk } from "../../store/shows";
import ShowCard from "../ShowCard";

function AllShows() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.session);
  let shows = useSelector((state) => state.shows);
  const [locationFilter, setLocationFilter] = useState("");
  const { user } = userData;

  useEffect(() => {
    dispatch(getAllShowsThunk());
  }, [dispatch]);

 

  if (!user) return <Redirect to="/" />;

  if (!shows.length) return <h1>Loading...</h1>;

 

  shows = shows.sort((a, b) => (a.date < b.date ? -1 : 1));

  const locations = new Set(shows.map((show) => show.location));

  const locationButtons = [];

  for (const location of locations) {
    locationButtons.push(
      <button
        className="show-location-button"
        id={
          locationFilter === location ? "location-active" : "location-inactive"
        }
        onClick={() => setLocationFilter(location)}
      >
        {location}
      </button>
    );
  }

  const createCards = (location) => {
    if (!location) {
      return shows?.map((show) => {
        return (
          <li key={show.id}>
            <ShowCard show={show} />
          </li>
        );
      });
    } else {
      return shows.map((show) => {
        if (show.location === location) {
          return (
            <li key={show.id}>
              <ShowCard show={show} />
            </li>
          );
        }
      });
    }
  };

  return (
    <div id="all-shows-page">
      <div id="show-location-buttons-box">
        {locationButtons}
        <button
          className="all-location-button"
          id={locationFilter === "" ? "location-active" : "location-inactive"}
          onClick={() => setLocationFilter("")}
        >
          All
        </button>
      </div>
      <ul id="all-cards-box">{createCards(locationFilter)}</ul>
    </div>
  );
}

export default AllShows;
