import "./AddShowForm.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validProfilePic } from "../SignUpFormModal";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { addShowThunk } from "../../store/shows";
import { addShowImageToAws } from "../../store/ShowImages";

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

export const isValidImageFile = (file) => {
  const validTypes = ["image/jpeg", "image/jpg", "image/png"];
  if (validTypes.includes(file.type)) return true;
  else return false;
};

function AddShowForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session).user;
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [location, setLocation] = useState("");
  const [time, setTime] = useState("12:00");
  const [date, setDate] = useState("");
  // const [amPm, setAmPm] = useState("am");
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
  const [descriptionClass, setDescriptionClass] = useState("black");
  const [previewImageFile, setPreviewImageFile] = useState("");
  const [image1File, setImage1File] = useState("");
  const [image2File, setImage2File] = useState("");
  const [image3File, setImage3File] = useState("");
  const [image4File, setImage4File] = useState("");
  const [image5File, setImage5File] = useState("");
  const [showPreviewImageError, setShowPreviewImageError] = useState(false);
  const [showImage1Error, setShowImage1Error] = useState(false);
  const [showImage2Error, setShowImage2Error] = useState(false);
  const [showImage3Error, setShowImage3Error] = useState(false);
  const [showImage4Error, setShowImage4Error] = useState(false);
  const [showImage5Error, setShowImage5Error] = useState(false);

  useEffect(() => {
    const errors = {};

    if (name.length < 10) errors.name = "Name must be at least 10 characters";
    if (address.length < 5)
      errors.address = "Address must be at least 5 characters";
    if (description.length < 24)
      errors.description = "Description must be at least 24 characters long";
    if (!isValidAddress(address))
      errors.address = "Please enter a valid address";
    if (previewImageTitle.length < 5)
      errors.previewImageTitle = "Title must be at least 5 characters long";
    if (image1Title && image1Title.length < 5)
      errors.image1Title = "Title must be at least 5 characters long";
    if (image2Title && image2Title.length < 5)
      errors.image2Title = "Title must be at least 5 characters long";
    if (image3Title && image3Title.length < 5)
      errors.image3Title = "Title must be at least 5 characters long";
    if (image4Title && image4Title.length < 5)
      errors.image4Title = "Title must be at least 5 characters long";
    if (image5Title && image5Title.length < 5)
      errors.image5Title = "Title must be at least 5 characters long";
    if (!location) errors.location = "Location is required";
    if (!time) errors.time = "Time is required";
    if (!price) errors.price = "Price is required";
    if (price < 1) errors.price = "Price must be at least $1.00";
    if (price > 100000) errors.price = "Price must be less than $100,000.00";
    if (new Date(`${date}T00:00-0800`) < new Date())
      errors.date = "Date must be set in the future";
    if (!date) errors.date = "Date is required.";
    if (!isValidImageFile(previewImageFile))
      errors.previewImageFile = "Image must be.jpg, .jpeg, or .png";
    if (image1File && !isValidImageFile(image1File))
      errors.image1File = "Image must be .jpg, .jpeg, or .png";
    if (image2File && !isValidImageFile(image2File))
      errors.image2File = "Image must be .jpg, .jpeg, or .png";
    if (image3File && !isValidImageFile(image3File))
      errors.image3File = "Image must be .jpg, .jpeg, or .png";
    if (image4File && !isValidImageFile(image4File))
      errors.image4File = "Image must be .jpg, .jpeg, or .png";
    if (image5File && !isValidImageFile(image5File))
      errors.image5File = "Image must be .jpg, .jpeg, or .png";

    setErrors(errors);
  }, [
    name,
    address,
    previewImageTitle,
    image1Title,
    image2Title,
    image3Title,
    image4Title,
    image5Title,
    location,
    time,
    price,
    date,
    description,
    image1File,
    image2File,
    image3File,
    image4File,
    image5File,
    previewImageFile,
  ]);

  useEffect(() => {
    if (description.length < 25) setDescriptionClass("red");
    else if (description.length >= 25) setDescriptionClass("black");
  }, [description]);

  const reset = async () => {
    setName("");
    setDescription("");
    setAddress("");
    setLocation("");
    setTime("12:00");
    setPrice("");
    // setAmPm("am");
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
      return;
    } else {
      const show = {
        name: name,
        description: description,
        location: location,
        address: address,
        time: time,
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
          imageFile: previewImageFile,
        },
      ];

      if (image1Title && image1Url && image1File) {
        images.push({
          title: image1Title,
          imageUrl: image1Url,
          description: image1Description,
          preview: false,
          showId: newShowId,
          imageFile: image1File,
        });
      }

      if (image2Title && image2Url && image2File) {
        images.push({
          title: image2Title,
          imageUrl: image2Url,
          description: image2Description,
          preview: false,
          showId: newShowId,
          imageFile: image2File,
        });
      }

      if (image3Title && image3Url && image3File) {
        images.push({
          title: image3Title,
          imageUrl: image3Url,
          description: image3Description,
          preview: false,
          showId: newShowId,
          imageFile: image3File,
        });
      }

      if (image4Title && image4Url && image4File) {
        images.push({
          title: image4Title,
          imageUrl: image4Url,
          description: image4Description,
          preview: false,
          showId: newShowId,
          imageFile: image4File,
        });
      }

      if (image5Title && image5Url && image5File) {
        images.push({
          title: image5Title,
          imageUrl: image5Url,
          description: image5Description,
          preview: false,
          showId: newShowId,
          imageFile: image5File,
        });
      }

      for (let i = 0; i < images.length; i++) {
        await dispatch(addShowImageToAws(images[i]));
      }
    }
    reset();
  };

  const removeShowImage = (e) => {
    e.preventDefault();
    if (imageCounter === 1) {
      setShowImage1(false);
      setImage1Title("");
      setImage1Description("");
      setImage1Url("");
      setImage1File("");
      setImage1Placeholder(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      );
      setImageCounter(imageCounter - 1);
    } else if (imageCounter === 2) {
      setShowImage2(false);
      setImage2Title("");
      setImage2Description("");
      setImage2Url("");
      setImage2File("");
      setImage2Placeholder(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      );
      setImageCounter(imageCounter - 1);
    } else if (imageCounter === 3) {
      setShowImage3(false);
      setImage3Title("");
      setImage3Description("");
      setImage3Url("");
      setImage3File("");
      setImage3Placeholder(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      );
      setImageCounter(imageCounter - 1);
    } else if (imageCounter === 4) {
      setShowImage4(false);
      setImage4Title("");
      setImage4File("");
      setImage4Description("");
      setImage4Url("");
      setImage4Placeholder(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      );
      setImageCounter(imageCounter - 1);
    } else if (imageCounter === 5) {
      setShowImage5(false);
      setImage5Title("");
      setImage5File("");
      setImage5Description("");
      setImage5Url("");
      setImage5Placeholder(
        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      );
      setImageCounter(imageCounter - 1);
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
            <p
              id={`description-character-counter-${descriptionClass}`}
              className="character-counter"
            >{`${description.length}/256`}</p>
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
                <input type='time' id='add-show-time-select' value={time} onChange={(e) => setTime(e.target.value)}></input>
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
                  min="1"
                  max="100000"
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
                src={
                  previewImageFile ? previewImageUrl : previewImagePlaceholder
                }
                alt="Image Unavailable"
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
              {/* <p className="character-counter">{`${previewImageTitle.length}/50`}</p> */}
              {showErrors && errors.previewImageTitle && (
                <p className="add-show-errors-p">{errors.previewImageTitle}</p>
              )}
              <input
                className="add-show-preview-image-inputs"
                type="file"
                onChange={(e) => {
                  if (isValidImageFile(e.target.files[0])) {
                    setPreviewImageFile(e.target.files[0]);
                    setPreviewImagePlaceholder(e.target.files[0]);
                    setPreviewImageUrl(URL.createObjectURL(e.target.files[0]));
                  } else {
                    setShowPreviewImageError(true);
                    setPreviewImageFile("");
                    setPreviewImagePlaceholder(
                      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                    );
                  }
                }}
              ></input>
              {showErrors && errors.previewImageUrl && (
                <p className="add-show-errors-p">{errors.previewImageUrl}</p>
              )}
              {showPreviewImageError && (
                <p className="add-show-errors-p">{errors.previewImageFile}</p>
              )}
              {/* {showErrors && errors.previewImage} */}
              <textarea
                className="add-show-preview-image-description-input"
                placeholder="Preview Image Description"
                maxLength="256"
                value={previewImageDescription}
                onChange={(e) => setPreviewImageDescription(e.target.value)}
              ></textarea>
              <p
                className={`character-counter`}
              >{`${previewImageDescription.length}/256`}</p>
            </div>
          </div>
          {showImage1 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image1File ? image1Url : image1Placeholder}
                  alt="Image Unavailable"
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
                {/* <p className="character-counter">{`${image1Title.length}/50`}</p> */}
                {showErrors && errors.image1Title && (
                  <p className="add-show-errors-p">{errors.image1Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage1File(e.target.files[0]);
                      setImage1Placeholder(e.target.files[0]);
                      setImage1Url(URL.createObjectURL(e.target.files[0]));
                    } else {
                      setShowImage1Error(true);
                      setImage1File("");
                      // setImage1Url(e.target.value);
                      setImage1Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showErrors && errors.image1Url && (
                  <p className="add-show-errors-p">{errors.image1Url}</p>
                )}
                {showImage1Error && (
                  <p className="add-show-errors-p">{errors.image1File}</p>
                )}
                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image1Description}
                  onChange={(e) => setImage1Description(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${image1Description.length}/256`}</p>
              </div>
            </div>
          )}

          {showImage2 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image2File ? image2Url : image2Placeholder}
                  alt="Image Unavailable"
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
                {/* <p className="character-counter">{`${image2Title.length}/50`}</p> */}
                {showErrors && errors.image2Title && (
                  <p className="add-show-errors-p">{errors.image2Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage2File(e.target.files[0]);
                      setImage2Url(URL.createObjectURL(e.target.files[0]));
                      setImage2Placeholder(e.target.files[0]);
                    } else {
                      setShowImage2Error(true);
                      setImage2File("");
                      setImage2Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage2Error && (
                  <p className="add-show-errors-p">{errors.image2File}</p>
                )}

                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image2Description}
                  onChange={(e) => setImage2Description(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${image2Description.length}/256`}</p>
              </div>
            </div>
          )}

          {showImage3 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image3File ? image3Url : image3Placeholder}
                  alt="Image Unavailable"
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
                {/* <p className="character-counter">{`${image3Title.length}/50`}</p> */}
                {showErrors && errors.image3Title && (
                  <p className="add-show-errors-p">{errors.image3Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage3File(e.target.files[0]);
                      setImage3Url(URL.createObjectURL(e.target.files[0]));
                      setImage3Placeholder(e.target.files[0]);
                    } else {
                      setShowImage3Error(true);
                      setImage3File("");
                      setImage3Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage3Error && (
                  <p className="add-show-errors-p">{errors.image3File}</p>
                )}

                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image3Description}
                  onChange={(e) => setImage3Description(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${image3Description.length}/256`}</p>
              </div>
            </div>
          )}

          {showImage4 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image4File ? image4Url : image4Placeholder}
                  alt="Image Unavailable"
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
                {/* <p className="character-counter">{`${image4Title.length}/50`}</p> */}
                {showErrors && errors.image4Title && (
                  <p className="add-show-errors-p">{errors.image4Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage4File(e.target.files[0]);
                      setImage4Url(URL.createObjectURL(e.target.files[0]));
                      setImage4Placeholder(e.target.files[0]);
                    } else {
                      setShowImage4Error(true);
                      setImage4File("");
                      setImage4Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage4Error && (
                  <p className="add-show-errors-p">{errors.image4File}</p>
                )}

                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image4Description}
                  onChange={(e) => setImage4Description(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${image4Description.length}/256`}</p>
              </div>
            </div>
          )}

          {showImage5 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image5File ? image5Url : image5Placeholder}
                  alt="Image Unavailable"
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
                {/* <p className='character-counter'>{`${image5Title.length}/50`}</p> */}
                {showErrors && errors.image5Title && (
                  <p className="add-show-errors-p">{errors.image5Title}</p>
                )}
                <input
                  className="add-show-preview-image-inputs"
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage5File(e.target.files[0]);
                      setImage5Url(URL.createObjectURL(e.target.files[0]));
                      setImage5Placeholder(e.target.files[0]);
                    } else {
                      setShowImage5Error(true);
                      setImage5File("");
                      setImage5Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage5Error && (
                  <p className="add-show-errors-p">{errors.image5File}</p>
                )}

                <textarea
                  className="add-show-preview-image-description-input"
                  placeholder="Image Description"
                  maxLength="256"
                  value={image5Description}
                  onChange={(e) => setImage5Description(e.target.value)}
                ></textarea>
                <p
                  className={`character-counter`}
                >{`${image5Description.length}/256`}</p>
              </div>
            </div>
          )}
          {imageCounter < 4 && (
            <p className="image-counter">
              You can add {5 - imageCounter} more images!
            </p>
          )}
          {imageCounter === 4 && (
            <p className="image-counter">
              You can add {5 - imageCounter} more image!
            </p>
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
          {imageCounter > 0 && (
            <button id="remove-last-image-button" onClick={removeShowImage}>
              Remove Last Image
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
