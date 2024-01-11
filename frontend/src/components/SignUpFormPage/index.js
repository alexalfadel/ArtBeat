import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";
// import { profile } from "console";

const validProfilePic = (url) => {
    const splitUrl = url.split('.')
    const validEndings = ['.png', '.jpeg', '.jpg']
    if (validEndings.includes(splitUrl[splitUrl.length - 1])) return true
    return false
}

function SignupFormPage() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [profilePic, setProfilePic] = useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          name,
          location,
          bio: bio ? bio : null,
          profilePic: validProfilePic(profilePic) ? profilePic : null,
          password,
        })
      ).catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>
        {errors.email && <p>{errors.email}</p>}
        <label>
          Username
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </label>
        {errors.username && <p>{errors.username}</p>}
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        {errors.name && <p>{errors.name}</p>}
        <label>
            Location
          <select value={location} onChange={(e) => setLocation(e.target.value)} required>
            <option value='San Francisco'>San Francisco</option>
            <option value='Los Angeles'>Los Angeles</option>
            <option value='Phoenix'>Phoenix</option>
            <option value='Tucson'>Tucson</option>
            <option value='Austin'>Austin</option>
            <optoin value='Dallas'>Dallas</optoin>
            <option value='New York'>New York</option>
            <option value='Miami'>Miami</option>
          </select>
        </label>
        {errors.location && <p>{errors.location}</p>}
        <label>
            Bio 
            <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <label>
            Profiel Picture
            <input type='text' value={profilePic} onChange={(e) => setProfilePic(e.target.value)}></input>
        </label>
        {errors.password && <p>{errors.password}</p>}
        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>
        {errors.confirmPassword && <p>{errors.confirmPassword}</p>}
        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;