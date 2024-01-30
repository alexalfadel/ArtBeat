import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import OpenModalButton from "../OpenModalButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignUpFormModal";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <li id='profile-button-holder'>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li className='navigation-session-links'>
        <OpenModalButton
          id='log-in-modal-button'
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          id='sign-up-modal-button'
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <div className='nav-div'>
    <ul>
      <li>
        <NavLink id='nav-logo' exact to="/shows">
          <p id='nav-logo'>ARTBEAT</p>
        </NavLink>
      </li>
    </ul>
    <ul className='center-nav'>
      {sessionUser && <div className='middle-nav-buttons-box'><li className='middle-nav-buttons-area'>
        <NavLink className='middle-nav-buttons' exact to='/shows'>
            <i id='calendar-button' className="fa-solid fa-calendar-days"></i>
          </NavLink>
      </li>
      <li className='middle-nav-buttons-area'>
        <NavLink className='middle-nav-buttons' exact to={`/artists/${sessionUser.id}`}>
          <i id='badge-button' class="fa-solid fa-id-badge"></i>
        </NavLink>
      </li></div>}
    </ul>
    <ul className='right-nav'>
      {sessionUser && 
        <Link id='nav-new-show-button' to='/shows/new'><p id="nav-new-show-p">New Show+</p></Link>
        }
      {isLoaded && sessionLinks}
    </ul>
    </div>
  );
}

export default Navigation;