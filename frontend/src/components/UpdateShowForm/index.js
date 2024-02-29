import "./UpdateShowForm.css";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { validProfilePic } from "../SignUpFormModal";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { isValidAddress, formatTime } from "../AddShowForm";
import { getAllShowsThunk } from "../../store/shows";
import { formatDate } from "../ShowCard";
import { updateShowThunk } from "../../store/shows";
import {
  updateShowImageThunk,
  addShowImage,
  addShowImageToAws,
} from "../../store/ShowImages";
import { Redirect } from "react-router-dom";
import { isValidImageFile } from "../AddShowForm";

const deconstructTime = (time) => {
  const splitTime = time.split(":");
  if (Number(splitTime[0]) <= 12) {
    if (Number(splitTime[0]) === 12 && Number(splitTime[1]) === 0)
      return `${time} AM`;
    else if (Number(splitTime[0]) === 12) return `${time} PM`;
    else return `${time} AM`;
  } else {
    const newTime = Number(splitTime[0]) - 12;
    return `${newTime}:00 PM`;
  }
};

const dateFormat = (date) => {
  return date.split("T")[0];
};

function UpdateShowForm() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { showId } = useParams();
  const allShows = useSelector((state) => state.shows);
  const user = useSelector((state) => state.session.user);
  // const show = allShows?.filter((show) => `${show.id}` === showId)[0]
  // const showImages = show?.ShowImages
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [descriptionClass, setDescriptionClass] = useState("black");

  const [userId, setUserId] = useState("");

  useEffect(() => {
    dispatch(getAllShowsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (Object.keys(allShows).length) {
      const show = allShows?.filter((show) => `${show.id}` === showId)[0];
      if (!show) return history.push("/");
      if (show.userId !== user.id) return history.push("/");
      setUserId(show.userId);
      setName(show.name);
      setDescription(show.description);
      setAddress(show.address);
      setLocation(show.location);
      const formattedTime = deconstructTime(show.time);
      setTime(show.time);
      setDate(dateFormat(show.date));
      setPrice(show.price);
    }
  }, [allShows]);

  useEffect(() => {
    if (description.length < 25) setDescriptionClass("red");
    else if (description.length >= 25) setDescriptionClass("black");
  }, [description]);

  useEffect(() => {
    const errors = {};

    if (name.length < 10) errors.name = "Name must be at least 10 characters";
    if (address.length < 5)
      errors.address = "Address must be at least 5 characters";
    if (description.length < 24)
      errors.description = "Description must be at least 24 characters long";
    if (!isValidAddress(address))
      errors.address = "Please enter a valid address";
    if (!location) errors.location = "Location is required";
    if (!time) errors.time = "Time is required";
    if (!price) errors.price = "Price is required";
    if (price < 1) errors.price = "Price must be at least $1.00";
    if (price > 100000) errors.price = "Price must be less than $100,000.00";
    if (new Date(`${date}T00:00-0800`) < new Date())
      errors.date = "Date must be set in the future";

    setErrors(errors);
  }, [name, address, location, time, price, date, description]);

  if (!Object.keys(allShows).length) return <h1 className='loading'>Loading...</h1>;
  const show = allShows.filter((show) => `${show.id}` === showId)[0];

  const reset = () => {
    setUserId("");
    setName("");
    setDescription("");
    setAddress("");
    setLocation("");
    setTime("");
    setPrice("");
    setErrors({});
    setDate("");
    setShowErrors(false);

    history.push("/shows");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (Object.keys(errors).length) {
      setShowErrors(true);
    } else {
      const show = {
        name: name,
        description: description,
        location: location,
        address: address,
        time: time,
        date: new Date(date),
        price: Number(price),
        userId: userId,
      };

      const dispatchData = {
        show: show,
        showId: showId,
      };

      const updatedShow = await dispatch(updateShowThunk(dispatchData));

      reset();
    }
  };

  return (
    <div className="add-show-full-page">
      <form className="add-show-component-box">
        <div>
          <div className="add-show-name-description-address">
            <h2 className="add-show-h2">Edit Your Upcoming Show</h2>
            <input
              className="add-show-name-input"
              type="text"
              required
              value={name}
              maxLength="100"
              placeholder="Please enter your show's name"
              onChange={(e) => setName(e.target.value)}
            ></input>
            {showErrors && errors.name && (
              <p className="add-show-errors-p">{errors.name}</p>
            )}
            <textarea
              className="add-show-description-input"
              maxLength="256"
              value={description}
              placeholder="Description goes here"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <p
              id={`description-character-counter-${descriptionClass}`}
              className="character-counter"
            >{`${description.length}/256`}</p>
            {showErrors && errors.description && (
              <p lassName="add-show-errors-p">{errors.description}</p>
            )}
            <input
              className="add-show-address-input"
              type="text"
              required
              value={address}
              maxLength="256"
              onChange={(e) => setAddress(e.target.value)}
              placeholder="What's your shows address?"
            ></input>
            {showErrors && errors.address && (
              <p className="add-show-errors-p">{errors.address}</p>
            )}
          </div>
          <div>
            <div className="add-show-date-time-box">
              <div className="add-show-time-box">
                <input
                  type="time"
                  id="add-show-time-select"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                ></input>
              </div>
              <input
                className="add-show-date-select"
                defaultValue={date}
                type="date"
                min={`${new Date()}`}
                onChange={(e) => setDate(e.target.value)}
              ></input>
            </div>
            <div className="add-show-price-location-box">
              <div className="add-show-price-input-box">
                $
                <input
                  className="add-show-price-input"
                  type="number"
                  placeholder="1"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                ></input>
                .00
              </div>
              <div>
                <select
                  className="add-show-location"
                  required
                  defaultValue={location}
                  onChange={(e) => setLocation(e.target.value)}
                >
                  <option value="Location:" disabled>
                    Location:
                  </option>
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
              </div>
            </div>
          </div>
        </div>
        {showErrors && errors.time && (
          <p className="add-show-errors-p">{errors.time}</p>
        )}
        {showErrors && errors.location && (
          <p className="add-show-errors-p">{errors.location}</p>
        )}
        {showErrors && errors.price && (
          <p className="add-show-errors-p">{errors.price}</p>
        )}
        {showErrors && errors.date && (
          <p className="add-show-errors-p">{errors.date}</p>
        )}

        <div className="add-show-buttons-container">
          <button className="add-show-submit-buttons" onClick={onSubmit}>
            Save
          </button>
          <button className="add-show-submit-buttons" onClick={reset}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateShowForm;
