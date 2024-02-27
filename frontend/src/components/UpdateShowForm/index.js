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
import { updateShowImageThunk, addShowImage, addShowImageToAws } from "../../store/ShowImages";
import { Redirect } from "react-router-dom";
import { isValidImageFile } from '../AddShowForm'

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
  // const [amPm, setAmPm] = useState("am");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [showErrors, setShowErrors] = useState(false);
  // const [previewImagePlaceholder, setPreviewImagePlaceholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [previewImageUrl, setPreviewImageUrl] = useState("");
  // const [previewImageTitle, setPreviewImageTitle] = useState("");
  // const [previewImageDescription, setPreviewImageDescription] = useState("");
  // const [previewImageId, setPreviewImageId] = useState("");
  // const [showImage1, setShowImage1] = useState("");
  // const [showImage2, setShowImage2] = useState("");
  // const [showImage3, setShowImage3] = useState("");
  // const [showImage4, setShowImage4] = useState("");
  // const [showImage5, setShowImage5] = useState("");
  // const [imageCounter, setImageCounter] = useState(0);
  // const [image1Placeholder, setImage1Placeholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [image2Placeholder, setImage2Placeholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [image3Placeholder, setImage3Placeholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [image4Placeholder, setImage4Placeholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [image5Placeholder, setImage5Placeholder] = useState(
  //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  // );
  // const [image1Title, setImage1Title] = useState("");
  // const [image2Title, setImage2Title] = useState("");
  // const [image3Title, setImage3Title] = useState("");
  // const [image4Title, setImage4Title] = useState("");
  // const [image5Title, setImage5Title] = useState("");
  // const [image1Url, setImage1Url] = useState("");
  // const [image2Url, setImage2Url] = useState("");
  // const [image3Url, setImage3Url] = useState("");
  // const [image4Url, setImage4Url] = useState("");
  // const [image5Url, setImage5Url] = useState("");
  // const [image1Description, setImage1Description] = useState("");
  // const [image2Description, setImage2Description] = useState("");
  // const [image3Description, setImage3Description] = useState("");
  // const [image4Description, setImage4Description] = useState("");
  // const [image5Description, setImage5Description] = useState("");
  // const [image1Id, setImage1Id] = useState("");
  // const [image2Id, setImage2Id] = useState("");
  // const [image3Id, setImage3Id] = useState("");
  // const [image4Id, setImage4Id] = useState("");
  // const [image5Id, setImage5Id] = useState("");
  // const [image1Action, setImage1Action] = useState('')
  // const [image2Action, setImage2Action] = useState('')
  // const [image3Action, setImage3Action] = useState('')
  // const [image4Action, setImage4Action] = useState('')
  // const [image5Action, setImage5Action] = useState('')
  // const [updatingPreviewImageFile, setUpdatingPreviewImageFile] = useState(false)
  // const [updatingImage1File, setUpdatingImage1File] = useState(false)
  // const [updatingImage2File, setUpdatingImage2File] = useState(false)
  // const [updatingImage3File, setUpdatingImage3File] = useState(false)
  // const [updatingImage4File, setUpdatingImage4File] = useState(false)
  // const [updatingImage5File, setUpdatingImage5File] = useState(false)
  // const [previewImageFile, setPreviewImageFile] = useState('')
  // const [image1File, setImage1File] = useState('')
  // const [image2File, setImage2File] = useState('')
  // const [image3File, setImage3File] = useState('')
  // const [image4File, setImage4File] = useState('')
  // const [image5File, setImage5File] = useState('')
  // const [showPreviewImageError, setShowPreviewImageError] = useState(false)
  // const [showImage1Error, setShowImage1Error] = useState(false)
  // const [showImage2Error, setShowImage2Error] = useState(false)
  // const [showImage3Error, setShowImage3Error] = useState(false)
  // const [showImage4Error, setShowImage4Error] = useState(false)
  // const [showImage5Error, setShowImage5Error] = useState(false)
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
      // let showImages = show?.ShowImages;
      // showImages = showImages.sort((a, b) =>
      //   a.createdAt < b.createdAt ? -1 : 1
      // );
      // const previewImage = showImages?.filter(
      //   (image) => image.preview === true
      // )[0];
      // const remainingImages = [];
      // for (let i = 0; i < showImages.length; i++) {
      //   if (!showImages[i].preview) remainingImages.push(showImages[i]);
      // }

      setUserId(show.userId);
      setName(show.name);
      setDescription(show.description);
      setAddress(show.address);
      setLocation(show.location);
      const formattedTime = deconstructTime(show.time);
      setTime(show.time)
      setDate(dateFormat(show.date));
      setPrice(show.price);
      // setPreviewImageTitle(previewImage.title);
      // setPreviewImageUrl(previewImage.imageUrl);
      // setPreviewImageDescription(previewImage.description);
      // setPreviewImagePlaceholder(previewImage.imageUrl)
      // setPreviewImageId(previewImage.id);
      // if (remainingImages[0]) {
      //   setImage1Title(remainingImages[0].title);
      //   setImage1Placeholder(remainingImages[0].imageUrl);
      //   setImage1Description(remainingImages[0].description);
      //   setImage1Url(remainingImages[0].imageUrl);
      //   setShowImage1(true);
      //   setImage1Id(remainingImages[0].id);
      //   setImage1Action('update')
      // }
      // if (remainingImages[1]) {
      //   setImage2Title(remainingImages[1].title);
      //   setImage2Placeholder(remainingImages[1].imageUrl);
      //   setImage2Description(remainingImages[1].description);
      //   setImage2Url(remainingImages[1].imageUrl);
      //   setShowImage2(true);
      //   setImage2Id(remainingImages[1].id);
      //   setImage2Action('update')
      // }
      // if (remainingImages[2]) {
      //   setImage3Title(remainingImages[2].title);
      //   setImage3Placeholder(remainingImages[2].imageUrl);
      //   setImage3Description(remainingImages[2].description);
      //   setImage3Url(remainingImages[2].imageUrl);
      //   setShowImage3(true);
      //   setImage3Id(remainingImages[2].id);
      //   setImage3Action('update')
      // }
      // if (remainingImages[3]) {
      //   setImage4Title(remainingImages[3].title);
      //   setImage4Placeholder(remainingImages[3].imageUrl);
      //   setImage4Description(remainingImages[3].description);
      //   setImage4Url(remainingImages[3].imageUrl);
      //   setShowImage4(true);
      //   setImage4Id(remainingImages[3].id);
      //   setImage4Action('update')
      // }
      // if (remainingImages[4]) {
      //   setImage5Title(remainingImages[4].title);
      //   setImage5Placeholder(remainingImages[4].imageUrl);
      //   setImage5Description(remainingImages[4].description);
      //   setImage5Url(remainingImages[4].imageUrl);
      //   setShowImage5(true);
      //   setImage5Id(remainingImages[4].id);
      //   setImage4Action('update')
      // }
      // setImageCounter(remainingImages.length);
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
    // if (!validProfilePic(previewImageUrl))
    //   errors.previewImageUrl =
    //     "Please enter a valid image url ending in .png, .jpg, or .jpeg";
    // if (image1Url && !validProfilePic(image1Url))
    //   errors.image1Url = "Url must end in .jpg, .jpeg, or .png";
    // if (image2Url && !validProfilePic(image2Url))
    //   errors.image2Url = "Url must end in .jpg, .jpeg, or .png";
    // if (image3Url && !validProfilePic(image3Url))
    //   errors.image3Url = "Url must end in .jpg, .jpeg, or .png";
    // if (image4Url && !validProfilePic(image4Url))
    //   errors.image4Url = "Url must end in .jpg, .jpeg, or .png";
    // if (image5Url && !validProfilePic(image5Url))
    //   errors.image5Url = "Url must end in .jpg, .jpeg, or .png";
    // if (previewImageTitle.length < 5)
    //   errors.previewImageTitle = "Title must be at least 5 characters long";
    // if (image1File && image1Title.length < 5)
    //   errors.image1Title = "Title must be at least 5 characters long";
    // if (image2File && image2Title.length < 5)
    //   errors.image2Title = "Title must be at least 5 characters long";
    // if (image3File && image3Title.length < 5)
    //   errors.image3Title = "Title must be at least 5 characters long";
    // if (image4File && image4Title.length < 5)
    //   errors.image4Title = "Title must be at least 5 characters long";
    // if (image5File && image5Title.length < 5)
    //   errors.image5Title = "Title must be at least 5 characters long";
    // if (previewImageUrl.length < 3)
    //   errors.previewImageUrl = "Url must be at least 3 characters long";
    // if (image1Url && image1Url.length < 3)
    //   errors.image1Url = "Url must be at least 3 characters long";
    // if (image2Url && image2Url.length < 3)
    //   errors.image2Url = "Url must be at least 3 characters long";
    // if (image3Url && image3Url.length < 3)
    //   errors.image3Url = "Url must be at least 3 characters long";
    // if (image4Url && image4Url.length < 3)
    //   errors.image4Url = "Url must be at least 3 characters long";
    // if (image5Url && image5Url.length < 3)
    //   errors.image5Url = "Url must be at least 3 characters long";
    if (!location) errors.location = "Location is required";
    if (!time) errors.time = "Time is required";
    if (!price) errors.price = "Price is required";
    if (price < 1) errors.price = "Price must be at least $1.00";
    if (price > 100000) errors.price = "Price must be less than $100,000.00";
    if (new Date(`${date}T00:00-0800`) < new Date())
      errors.date = "Date must be set in the future";
    // if (previewImageFile && !isValidImageFile(previewImageFile))
    //   errors.previewImageFile = "Image must be.jpg, .jpeg, or .png";
    // if (image1File && !isValidImageFile(image1File))
    //   errors.image1File = "Image must be .jpg, .jpeg, or .png";
    // if (image2File && !isValidImageFile(image2File))
    //   errors.image2File = "Image must be .jpg, .jpeg, or .png";
    // if (image3File && !isValidImageFile(image3File))
    //   errors.image3File = "Image must be .jpg, .jpeg, or .png";
    // if (image4File && !isValidImageFile(image4File))
    //   errors.image4File = "Image must be .jpg, .jpeg, or .png";
    // if (image5File && !isValidImageFile(image5File))
    //   errors.image5File = "Image must be .jpg, .jpeg, or .png";

    setErrors(errors);
  }, [
    name,
    address,
    // previewImageUrl,
    // previewImageTitle,
    // image1Title,
    // image2Title,
    // image3Title,
    // image4Title,
    // image5Title,
    // image1Url,
    // image2Url,
    // image3Url,
    // image4Url,
    // image5Url,
    location,
    time,
    price,
    date,
    description,
    // image1File,
    // image2File,
    // image3File,
    // image4File,
    // image5File,
    // previewImageFile
  ]);


  if (!Object.keys(allShows).length) return <h1>Loading...</h1>;
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
    // setPreviewImagePlaceholder(
    //   ''
    // );
    // setImage1Placeholder(
    //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    // );
    // setImage2Placeholder(
    //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    // );
    // setImage3Placeholder(
    //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    // );
    // setImage4Placeholder(
    //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    // );
    // setImage5Placeholder(
    //   "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
    // );
    // setPreviewImageUrl("");
    // setImage1Url("");
    // setImage2Url("");
    // setImage3Url("");
    // setImage4Url("");
    // setImage5Url("");
    // setPreviewImageTitle("");
    // setImage1Title("");
    // setImage2Title("");
    // setImage3Title("");
    // setImage4Title("");
    // setImage5Title("");
    // setPreviewImageDescription("");
    // setImage1Description("");
    // setImage2Description("");
    // setImage3Description("");
    // setImage4Description("");
    // setImage5Description("");
    // setShowImage1(false);
    // setShowImage2(false);
    // setShowImage3(false);
    // setShowImage4(false);
    // setShowImage5(false);
    // setImage1Id("");
    // setImage2Id("");
    // setImage3Id("");
    // setImage4Id("");
    // setImage5Id("");
    // setImageCounter(0);
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

      // const imagesToUpdate = [
      //   {
      //     title: previewImageTitle,
      //     imageUrl: updatingPreviewImageFile ? null : previewImageUrl,
      //     description: previewImageDescription,
      //     preview: true,
      //     showId: showId,
      //     id: previewImageId,
      //     imageFile: updatingPreviewImageFile ? previewImageFile : null
      //   },
      // ];

      // const imagesToAdd = []

      // if (image1Title && (image1Url || image1File)) {
      //   const image1 = {
      //     title: image1Title,
      //     imageUrl: updatingImage1File ? null : image1Url,
      //     description: image1Description,
      //     preview: false,
      //     showId: showId,
      //     imageFile: image1Action === 'add' || 'update' ? image1File : null,
      //     id: image1Id
      //   }
      //   if (image1Action === 'update') imagesToUpdate.push(image1);
      //    else imagesToAdd.push(image1)
        
      // }

      // if (image2Title && (image2Url || image2File)) {
      //   const image2 = {
      //     title: image2Title,
      //     imageUrl: updatingImage2File ? null : image2Url,
      //     description: image2Description,
      //     preview: false,
      //     showId: showId,
      //     imageFile: image2Action === 'add' || 'update' ? image2File : null,
      //     id: image2Id
      //   }
      //   if (image2Action === 'update') imagesToUpdate.push(image2);
      //   else imagesToAdd.push(image2)
      // }

      // if (image3Title && (image3Url || image3File)) {
      //   const image3 = {
      //     title: image3Title,
      //     imageUrl: updatingImage3File ? null : image3Url,
      //     description: image3Description,
      //     preview: false,
      //     showId: showId,
      //     imageFile: image3Action === 'add' || 'update' ? image3File : null,
      //     id: image3Id

      //   }
      //   if (image3Action === 'update') imagesToUpdate.push(image3)
      //   else imagesToAdd.push(image3)
      // }

      // if (image4Title && (image4Url || image4File)) {
      //   const image4 = {
      //     title: image4Title,
      //     imageUrl: updatingImage4File ? null : image4Url,
      //     description: image4Description,
      //     preview: false,
      //     showId: showId,
      //     imageFile: image4Action === 'add' || 'update' ? image4File : null,
      //     id: image4Id
      //   }
      //   if (image4Action === 'update') imagesToUpdate.push(image4)
      //   else imagesToAdd.push(image4)
        
      // }

      // if (image5Title && (image5Url || image5File)) {
      //   const image5 = {
      //     title: image5Title,
      //     imageUrl: updatingImage5File ? null : image5Url,
      //     description: image5Description,
      //     preview: false,
      //     showId: showId,
      //     imageFile: image5Action === 'add' || 'update' ? image5File : null,
      //     id: image5Id
      //   }
      //   if (image5Action === 'update') imagesToUpdate.push(image5)
      //   else imagesToAdd.push(image5)
      // }

      // for (let i = 0; i < imagesToUpdate.length; i++) {
      //   await dispatch(updateShowImageThunk(imagesToUpdate[i]));
      // }

      // for (let i = 0; i < imagesToAdd.length; i++) {
      //   await dispatch(addShowImageToAws(imagesToAdd[i]))
      // }

      reset();
    }
  };

  // const removeShowImage = (e) => {
  //   e.preventDefault();
  //   if (imageCounter === 1) {
  //     setShowImage1(false);
  //     setImage1Title("");
  //     setImage1Description("");
  //     setImage1Url("");
  //     setImageCounter(imageCounter - 1);
  //     setImage1Action('')
  //     setImage1File('')
  //     setUpdatingImage1File(true)

  //     setImage1Placeholder(
  //       "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  //     );
  //   } else if (imageCounter === 2) {
  //     setShowImage2(false);
  //     setImage2Title("");
  //     setImage2Description("");
  //     setImage2Url("");
  //     setImageCounter(imageCounter - 1);
  //     setImage2Action('')
  //     setImage2File('')
  //     setUpdatingImage2File(true)

  //     setImage2Placeholder(
  //       "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  //     );
  //   } else if (imageCounter === 3) {
  //     setShowImage3(false);
  //     setImage3Title("");
  //     setImage3Description("");
  //     setImage3Url("");
  //     setImageCounter(imageCounter - 1);
  //     setImage3Action('')
  //     setImage3File('')
  //     setUpdatingImage3File(true)

  //     setImage3Placeholder(
  //       "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  //     );
  //   } else if (imageCounter === 4) {
  //     setShowImage4(false);
  //     setImage4Title("");
  //     setImage4Description("");
  //     setImage4Url("");
  //     setImageCounter(imageCounter - 1);
  //     setImage4Action('')
  //     setImage4File('')
  //     setUpdatingImage4File(true)

  //     setImage4Placeholder(
  //       "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  //     );
  //   } else if (imageCounter === 5) {
  //     setShowImage5(false);
  //     setImage5Title("");
  //     setImage5Description("");
  //     setImage5Url("");
  //     setImageCounter(imageCounter - 1);
  //     setImage5Action('')
  //     setImage5File('')
  //     setUpdatingImage5File(true)

  //     setImage5Placeholder(
  //       "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
  //     );
  //   }
  // };


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
              <input type='time' id='add-show-time-select' value={time} onChange={(e) => setTime(e.target.value)}></input>
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
        {/* <div className="add-show-add-images-container"> */}
          {/* <div className="add-show-preview-image-container">
            <div>
              <img
                className="add-show-preview-image"
                src={previewImageFile ? previewImageUrl : previewImagePlaceholder}
                alt='Image Unavailable'
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
                type="file"
                
                onChange={(e) => {
                  if (isValidImageFile(e.target.files[0])) {
                    setPreviewImagePlaceholder(e.target.files[0])
                    setPreviewImageUrl(URL.createObjectURL(e.target.files[0]))
                    setPreviewImageFile(e.target.files[0])
                    setUpdatingPreviewImageFile(true)
                  } else {
                    setShowPreviewImageError(true)
                    setPreviewImageFile('')
                    setPreviewImagePlaceholder(
                      "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                    );
                  }
                }}
              ></input>
               {showPreviewImageError && <p className='add-show-errors-p'>{errors.previewImageFile}</p>}

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
          </div> */}
          {/* {showImage1 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image1File ? image1Url : image1Placeholder}
                  alt='Image Unavailable'
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
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage1Url(URL.createObjectURL(e.target.files[0]));
                      setImage1Placeholder(e.target.files[0]);
                      setImage1File(e.target.files[0])
                    } else {
                      // setImage1Url(e.target.value);
                      setShowImage1Error(true)
                      setImage1File('')
                      setImage1Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage1Error && <p className='add-show-errors-p'>{errors.image1File}</p>}

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
                  alt='Image Unavailable'
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
                  type="file"
                  
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage2Url(URL.createObjectURL(e.target.files[0]));
                      setImage2Placeholder(e.target.files[0]);
                      setImage2File(e.target.files[0])
                      setUpdatingImage2File(true)
                    } else {
                      // setImage2Url(e.target.value);
                      setImage2File('')
                      setImage2Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
                {showImage2Error && <p className='add-show-errors-p'>{errors.image2File}</p>}

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
                  alt='Image Unavailable'
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
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage3File(e.target.files[0])
                      setImage3Url(URL.createObjectURL(e.target.files[0]));
                      setImage3Placeholder(e.target.files[0]);
                    } else {
                      setShowImage3Error(true)
                      // setImage3Url(e.target.value);
                      setImage3File('')
                      setImage3Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
              {showImage3Error && <p className='add-show-errors-p'>{errors.image3File}</p>}

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
          )} */}
{/* 
          {showImage4 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image4File ? image4Url : image4Placeholder}
                  alt='Image Unavailable'
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
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage4File(e.target.files[0])
                      setImage4Url(URL.createObjectURL(e.target.files[0]));
                      setImage4Placeholder(e.target.value);
                    } else {
                      setShowImage4Error(true)
                      setImage4File('')
                      setImage4Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input>
              {showImage4Error && <p className='add-show-errors-p'>{errors.image4File}</p>}


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
          )} */}
{/* 
          {showImage5 && (
            <div className="add-show-preview-image-container">
              <div>
                <img
                  className="add-show-preview-image"
                  src={image5File ? image5Url : image5Placeholder}
                  alt='Image Unavailable'
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
                  type="file"
                  onChange={(e) => {
                    if (isValidImageFile(e.target.files[0])) {
                      setImage5File(e.target.files[0])
                      setImage5Url(URL.createObjectURL(e.target.files[0]));
                      setImage5Placeholder(e.target.files[0]);
                    } else {
                      setShowImage5Error(true)
                      setImage5File('')
                      setImage5Placeholder(
                        "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
                      );
                    }
                  }}
                ></input> */}
              {/* {showImage5Error && <p className='add-show-errors-p'>{errors.image5File}</p>}

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
          )} */}
          {/* {imageCounter < 4 && (
            <p className="image-counter">
              You can add {5 - imageCounter} more images!
            </p>
          )}
          {imageCounter === 4 && (
            <p className="image-counter">
              You can add {5 - imageCounter} more image!
            </p>
          )} */}
          {/* {imageCounter < 5 && (
            <button
              className="add-image-button"
              onClick={(e) => {
                e.preventDefault();
                if (imageCounter === 0) {
                  setShowImage1(true);
                  setImage1Action('add')
                } else if (imageCounter === 1) {
                  setShowImage2(true);
                  setImage2Action('add')
                } else if (imageCounter === 2) {
                  setShowImage3(true);
                  setImage3Action('add')
                } else if (imageCounter === 3) {
                  setShowImage4(true);
                  setImage4Action('add')
                } else if (imageCounter === 4) {
                  setShowImage5(true);
                  setImage5Action('add')
                }

                setImageCounter(imageCounter + 1);
              }}
            >
              Add an Image+
            </button>
          )} */}
          {/* {imageCounter > 0 && (image1Action === 'add' || image2Action === 'add' || image3Action === 'add' || image4Action === 'add' || image5Action === 'add')&& (
            <button id="remove-last-image-button" onClick={removeShowImage}>
              Remove Last Image
            </button>
          )} */}
        {/* </div> */}
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
