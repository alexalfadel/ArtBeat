import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import "./SignupForm.css";
import "./SignupForm.css";

export const validProfilePic = (url) => {
  const splitUrl = url.split(".");
  const validEndings = ["png", "jpeg", "jpg"];
  if (validEndings.includes(splitUrl[splitUrl.length - 1])) return true;
  return false;
};

function SignupFormModal() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("San Francisco");
  const [profilePic, setProfilePic] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  useEffect(() => {
    let errors = {}
    if (profilePic && !validProfilePic(profilePic)) errors.profilePic = "URL must end in .jpg, .png, or .jpeg"
    setErrors(errors)
  }, [profilePic])

  const handleSubmit = (e) => {
    e.preventDefault();

  
    if (password === confirmPassword) {
      setErrors({});
      const profPic = validProfilePic(profilePic) ? profilePic : "https://www.wildseedfarms.com/wp-content/plugins/shopwp-pro/public/imgs/placeholder.png"
      return dispatch(
        sessionActions.signup({
          email,
          username,
          name,
          location,
          bio: bio ? bio : null,
          profilePic: profPic,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword:
        "Confirm Password field must be the same as the Password field",
    });
  };

  return (
    <div className='sign-up-container'>
      <h1>Sign Up</h1>
      <form className='sign-up-form-container' onSubmit={handleSubmit}>
        <label id='sign-up-email-label'>
          Email
          <input
            id='sign-up-email-input'
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p className='sign-up-errors'>{errors.email}</p>}
        <label>
          Username
          <input
            id='sign-up-username-input'
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p className='sign-up-errors'>{errors.username}</p>}
        <label>
          Name
          <input
            id='sign-up-name-input'
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p className='sign-up-errors'>{errors.name}</p>}
        <label>
          Location
          <select
            id='sign-up-location-select'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
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
        </label>
        {errors.location && <p className='sign-up-errors'>{errors.location}</p>}
        <label>
          Bio
          <textarea
            id='sign-up-bio-textarea'
            value={bio}
            maxLength='256'
            onChange={(e) => setBio(e.target.value)}
          ></textarea>
        </label>
        <label>
          Password
          <input
            id='sign-up-password-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        {/* <label>
          Profile Picture
          <input
            id='sign-up-profile-picture-link'
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          ></input>
        </label> */}
        {errors.password && <p className='sign-up-errors'>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            id='sign-up-confirm-password-input'
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p className='sign-up-errors'>{errors.confirmPassword}</p>}
        <label>
          Profile Picture
          <input
            id='sign-up-profile-picture-link'
            type="text"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          ></input>
        </label>
        {errors.profilePic && <p className='sign-up-errors'>{errors.profilePic}</p>}
        <button id='sign-up-submit-form' type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default SignupFormModal;
