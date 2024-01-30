import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const demoLogin = async () => {
    const demoUser = {
      credential: 'demo@demo.io',
      password: 'password'
    }
    const serverResponse = await dispatch(
      sessionActions.login(demoUser)
    ).then(closeModal)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  return (
    <div className='log-in-container'>
      <h1>Log In</h1>
      <form className="log-in-form" onSubmit={handleSubmit}>
        <label>
          Username or Email
          {/* <input
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          /> */}
        </label>
        <input
            className='log-in-input'
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        <label>
          Password
          {/* <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          /> */}
        </label>
        <input
            className='log-in-input'
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        {errors.credential && (
          <p className='log-in-errors'>{errors.credential}</p>
        )}
        <p onClick={demoLogin} id='demo-login'>Demo Login</p>
        <button className='log-in-button' type="submit">Log In</button>
      </form>
    </div>
  );
}

export default LoginFormModal;