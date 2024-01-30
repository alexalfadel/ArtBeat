import "./AddShowForm.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validProfilePic } from "../SignUpFormModal";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addShowThunk } from "../../store/shows";
import { addShowImage } from "../../store/ShowImages";

export const isValidAddress = (address) => {
  const splitAddress = address.split(" ");
  if (typeof Number(splitAddress[0]) !== "number" || splitAddress.length < 2) {
    return false;
  } else return true;
};

export const formatTime = (time, amPm) => {
  if (amPm === "am") return time;
  else if (time.split(":")[1] === "30") {
    const numTime = Number(time.split(":")[0]) + 12;
    return `${Number(time.split(":")[0]) + 12}:30`;
  } else return `${Number(time.split(":")[0]) + 12}:00`;
};

function AddShowForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session).user;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [amPm, setAmPm] = useState("am");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  const [previewImagePlaceholder, setPreviewImagePlaceholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [previewImageUrl, setPreviewImageUrl] = useState("");
  const [previewImageTitle, setPreviewImageTitle] = useState("");
  const [previewImageDescription, setPreviewImageDescription] = useState("");
  const [showImage1, setShowImage1] = useState("");
  const [showImage2, setShowImage2] = useState("");
  const [showImage3, setShowImage3] = useState("");
  const [showImage4, setShowImage4] = useState("");
  const [showImage5, setShowImage5] = useState("");
  const [imageCounter, setImageCounter] = useState(0);
  const [image1Placeholder, setImage1Placeholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [image2Placeholder, setImage2Placeholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [image3Placeholder, setImage3Placeholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [image4Placeholder, setImage4Placeholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [image5Placeholder, setImage5Placeholder] = useState(
    "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  );
  const [image1Title, setImage1Title] = useState("");
  const [image2Title, setImage2Title] = useState("");
  const [image3Title, setImage3Title] = useState("");
  const [image4Title, setImage4Title] = useState("");
  const [image5Title, setImage5Title] = useState("");
  const [image1Url, setImage1Url] = useState("");
  const [image2Url, setImage2Url] = useState("");
  const [image3Url, setImage3Url] = useState("");
  const [image4Url, setImage4Url] = useState("");
  const [image5Url, setImage5Url] = useState("");
  const [image1Description, setImage1Description] = useState("");
  const [image2Description, setImage2Description] = useState("");
  const [image3Description, setImage3Description] = useState("");
  const [image4Description, setImage4Description] = useState("");
  const [image5Description, setImage5Description] = useState("");

  useEffect(() => {
    const errors = {};

    if (name.length < 10) errors.name = "Name must be at least 10 characters";
    if (address.length < 5)
      errors.address = "Address must be at least 5 characters";
    if (description.length < 24)
      errors.description = "Description must be at least 24 characters long";
    if (!isValidAddress(address))
      errors.address = "Please enter a valid address";
    if (!validProfilePic(previewImageUrl))
      errors.previewPic =
        "Please enter a valid image url ending in .png, .jpg, or .jpeg";
    if (image1Url && !validProfilePic(image1Url))
      errors.image1Url = "Url must end in .jpg, .jpeg, or .png";
    if (image2Url && !validProfilePic(image2Url))
      errors.image2Url = "Url must end in .jpg, .jpeg, or .png";
    if (image3Url && !validProfilePic(image3Url))
      errors.image3Url = "Url must end in .jpg, .jpeg, or .png";
    if (image4Url && !validProfilePic(image4Url))
      errors.image4Url = "Url must end in .jpg, .jpeg, or .png";
    if (image5Url && !validProfilePic(image5Url))
      errors.image5Url = "Url must end in .jpg, .jpeg, or .png";
    if (previewImageTitle < 5)
      errors.previewImageTitle = "Title must be at least 5 characters long";
    if (image1Title && image1Title < 5)
      errors.image1Title = "Title must be at least 5 characters long";
    if (image2Title && image2Title < 5)
      errors.image2Title = "Title must be at least 5 characters long";
    if (image3Title && image3Title < 5)
      errors.image3Title = "Title must be at least 5 characters long";
    if (image4Title && image4Title < 5)
      errors.image4Title = "Title must be at least 5 characters long";
    if (image5Title && image5Title < 5)
      errors.image5Title = "Title must be at least 5 characters long";
    if (previewImageUrl.length < 3)
      errors.previewImageUrl = "Url must be at least 3 characters long";
    if (image1Url && image1Url.length < 3)
      errors.image1Url = "Url must be at least 3 characters long";
    if (image2Url && image2Url.length < 3)
      errors.image2Url = "Url must be at least 3 characters long";
    if (image3Url && image3Url.length < 3)
      errors.image3Url = "Url must be at least 3 characters long";
    if (image4Url && image4Url.length < 3)
      errors.image4Url = "Url must be at least 3 characters long";
    if (image5Url && image5Url.length < 3)
      errors.image5Url = "Url must be at least 3 characters long";
    if (!location) errors.location = "Location is required";
    if (!time) errors.time = "Time is required";
    if (!price) errors.price = "Price is required";
    if (price < 1) errors.price = "Price must be at least $1.00";
    if (price > 100000) errors.price = "Price must be less than $100,000.00";
    if (new Date(date) < new Date())
      errors.date = "Date must be set in the future";

    setErrors(errors);
  }, [
    name,
    address,
    previewImageUrl,
    previewImageTitle,
    image1Title,
    image2Title,
    image3Title,
    image4Title,
    image5Title,
    image1Url,
    image2Url,
    image3Url,
    image4Url,
    image4Url,
    location,
    time,
    price,
    date,
    description,
  ]);

  const reset = () => {
    // e.preventDefault();

    setName("");
    setDescription("");
    setAddress("");
    setLocation("");
    setTime("");
    setPrice("");
    setAmPm("am");
    setErrors({});
    setPreviewImagePlaceholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setImage1Placeholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setImage2Placeholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setImage3Placeholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setImage4Placeholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setImage5Placeholder(
      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    );
    setPreviewImageUrl("");
    setImage1Url("");
    setImage2Url("");
    setImage3Url("");
    setImage4Url("");
    setImage5Url("");
    setPreviewImageTitle("");
    setImage1Title("");
    setImage2Title("");
    setImage3Title("");
    setImage4Title("");
    setImage5Title("");
    setPreviewImageDescription("");
    setImage1Description("");
    setImage2Description("");
    setImage3Description("");
    setImage4Description("");
    setImage5Description("");
    setShowImage1(false);
    setShowImage2(false);
    setShowImage3(false);
    setShowImage4(false);
    setShowImage5(false);
    setImageCounter(0);
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
        time: formatTime(time, amPm),
        date: new Date(date),
        price: Number(price),
        userId: user.id,
      };

      const newShow = await dispatch(addShowThunk(show));

      const newShowId = newShow.id;

      const images = [
        {
          title: previewImageTitle,
          imageUrl: previewImageUrl,
          description: previewImageDescription,
          preview: true,
          showId: newShowId,
        },
      ];

      if (image1Title && image1Description && image1Url) {
        images.push({
          title: image1Title,
          imageUrl: image1Url,
          description: image1Description,
          preview: false,
          showId: newShowId,
        });
      }

      if (image2Title && image2Description && image2Url) {
        images.push({
          title: image2Title,
          imageUrl: image2Url,
          description: image2Description,
          preview: false,
          showId: newShowId,
        });
      }

      if (image3Title && image3Description && image3Url) {
        images.push({
          title: image3Title,
          imageUrl: image3Url,
          description: image3Description,
          preview: false,
          showId: newShowId,
        });
      }

      if (image4Title && image4Description && image4Url) {
        images.push({
          title: image4Title,
          imageUrl: image4Url,
          description: image4Description,
          preview: false,
          showId: newShowId,
        });
      }

      if (image5Title && image5Description && image5Url) {
        images.push({
          title: image5Title,
          imageUrl: image5Url,
          description: image5Description,
          preview: false,
          showId: newShowId,
        });
      }

      for (let i = 0; i < images.length; i++) {
        dispatch(addShowImage(images[i]));
      }

      reset();
    }
  };

  return (
    <div className="add-show-full-page">
      <form className="add-show-component-box">
        <div>
          <div className="add-show-name-description-address">
            <h2 className="add-show-h2">Your Upcoming Show</h2>
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
            {showErrors && errors.description && (
              <p className="add-show-errors-p">{errors.description}</p>
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
                <select
                  className="add-show-time-select"
                  required
                  onChange={(e) => setTime(e.target.value)}
                >
                  <option value="12:00">12:00</option>
                  <option value="12:30">12:30</option>
                  <option value="1:00">1:00</option>
                  <option value="1:30">1:30</option>
                  <option value="2:00">2:00</option>
                  <option value="2:30">2:30</option>
                  <option value="3:00">3:00</option>
                  <option value="3:30">3:30</option>
                  <option value="4:00">4:00</option>
                  <option value="4:30">4:30</option>
                  <option value="5:00">5:00</option>
                  <option value="5:30">5:30</option>
                  <option value="6:00">6:00</option>
                  <option value="6:30">6:30</option>
                  <option value="7:00">7:00</option>
                  <option value="7:30">7:30</option>
                  <option value="8:00">8:00</option>
                  <option value="8:30">8:30</option>
                  <option value="9:00">9:00</option>
                  <option value="9:30">9:30</option>
                  <option value="10:00">10:00</option>
                  <option value="10:30">10:30</option>
                  <option value="11:00">11:00</option>
                  <option value="11:30">11:30</option>
                </select>
                <select
                  className="am-pm-select"
                  required
                  onChange={(e) => setAmPm(e.target.value)}
                >
                  <option value="am">A.M.</option>
                  <option value="pm">P.M</option>
                </select>
              </div>
              <input
                className="add-show-date-select"
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
                  defaultValue="Location:"
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
        <div className="add-show-add-images-container">
          <div className="add-show-preview-image-container">
            <div>
              <img
                className="add-show-preview-image"
                src={previewImagePlaceholder}
              ></img>
            </div>
            <div className="add-show-preview-image-inputs-container">
              <input
                className="add-show-preview-image-inputs"
                type="text"
                maxLength="50"
                placeholder="Preview Image Title"
                value={previewImageTitle}
                onChange={(e) => setPreviewImageTitle(e.target.value)}
              ></input>
              {showErrors && errors.previewImageTitle && (
                <p className="add-show-errors-p">{errors.previewImageTitle}</p>
              )}
              <input
                className="add-show-preview-image-inputs"
                type="text"
                maxLength="300"
                placeholder="Preview Image URL"
                value={previewImageUrl}
                onChange={(e) => {
                  if (validProfilePic(e.target.value)) {
                    setPreviewImageUrl(e.target.value);
                    setPreviewImagePlaceholder(e.target.value);
                  } else {
                    setPreviewImageUrl(e.target.value);
                    setPreviewImagePlaceholder(
                      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                    );
                  }
                }}
              ></input>
              {showErrors && errors.previewImageUrl && (
                <p className="add-show-errors-p">{errors.previewImageUrl}</p>
              )}
              <textarea
                className="add-show-preview-image-description-input"
                placeholder="Preview Image Description"
                maxLength="256"
                value={previewImageDescription}
                onChange={(e) => setPreviewImageDescription(e.target.value)}
              ></textarea>
            </div>
          </div>
          {showImage1 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image1Placeholder}
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={image1Title}
                  onChange={(e) => setImage1Title(e.target.value)}
                ></input>
                {showErrors && errors.image1Title && (
                  <p className="add-show-errors-p">{errors.image1Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="300"
                  placeholder="Image URL"
                  value={image1Url}
                  onChange={(e) => {
                    if (validProfilePic(e.target.value)) {
                      setImage1Url(e.target.value);
                      setImage1Placeholder(e.target.value);
                    } else {
                      setImage1Url(e.target.value);
                      setImage1Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image1Url && (
                  <p className="add-show-errors-p">{errors.image1Url}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image1Description}
                  onChange={(e) => setImage1Description(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {showImage2 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image2Placeholder}
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={image2Title}
                  onChange={(e) => setImage2Title(e.target.value)}
                ></input>
                {showErrors && errors.image2Title && (
                  <p className="add-show-errors-p">{errors.image2Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="300"
                  placeholder="Image URL"
                  value={image2Url}
                  onChange={(e) => {
                    if (validProfilePic(e.target.value)) {
                      setImage2Url(e.target.value);
                      setImage2Placeholder(e.target.value);
                    } else {
                      setImage2Url(e.target.value);
                      setImage2Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image2Url && (
                  <p className="add-show-errors-p">{errors.image2Url}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image2Description}
                  onChange={(e) => setImage2Description(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {showImage3 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image3Placeholder}
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={image3Title}
                  onChange={(e) => setImage3Title(e.target.value)}
                ></input>
                {showErrors && errors.image3Title && (
                  <p className="add-show-errors-p">{errors.image3Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="300"
                  placeholder="Image URL"
                  value={image3Url}
                  onChange={(e) => {
                    if (validProfilePic(e.target.value)) {
                      setImage3Url(e.target.value);
                      setImage3Placeholder(e.target.value);
                    } else {
                      setImage3Url(e.target.value);
                      setImage3Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image3Url && (
                  <p className="add-show-errors-p">{errors.image3Url}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image3Description}
                  onChange={(e) => setImage3Description(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {showImage4 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image4Placeholder}
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={image4Title}
                  onChange={(e) => setImage4Title(e.target.value)}
                ></input>
                {showErrors && errors.image4Title && (
                  <p className="add-show-errors-p">{errors.image4Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="300"
                  placeholder="Image URL"
                  value={image4Url}
                  onChange={(e) => {
                    if (validProfilePic(e.target.value)) {
                      setImage4Url(e.target.value);
                      setImage4Placeholder(e.target.value);
                    } else {
                      setImage4Url(e.target.value);
                      setImage4Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image4Url && (
                  <p className="add-show-errors-p">{errors.image4Url}</p>
                )}

                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image4Description}
                  onChange={(e) => setImage4Description(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {showImage5 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image5Placeholder}
                ></img>
              </div>
              <div className="add-show-preview-image-inputs-container">
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="50"
                  placeholder="Image Title"
                  value={image5Title}
                  onChange={(e) => setImage5Title(e.target.value)}
                ></input>
                {showErrors && errors.image5Title && (
                  <p className="add-show-errors-p">{errors.image5Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="text"
                  maxLength="300"
                  placeholder="Image URL"
                  value={image5Url}
                  onChange={(e) => {
                    if (validProfilePic(e.target.value)) {
                      setImage5Url(e.target.value);
                      setImage5Placeholder(e.target.value);
                    } else {
                      setImage5Url(e.target.value);
                      setImage5Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image5Url && (
                  <p className="add-show-errors-p">{errors.image5Url}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image5Description}
                  onChange={(e) => setImage5Description(e.target.value)}
                ></textarea>
              </div>
            </div>
          )}

          {imageCounter < 5 && (
            <button
              className="add-image-button"
              onClick={(e) => {
                e.preventDefault();
                if (imageCounter === 0) {
                  setShowImage1(true);
                } else if (imageCounter === 1) {
                  setShowImage2(true);
                } else if (imageCounter === 2) {
                  setShowImage3(true);
                } else if (imageCounter === 3) {
                  setShowImage4(true);
                } else if (imageCounter === 4) {
                  setShowImage5(true);
                }

                setImageCounter(imageCounter + 1);
              }}
            >
              Add an Image+
            </button>
          )}
        </div>
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

export default AddShowForm;
