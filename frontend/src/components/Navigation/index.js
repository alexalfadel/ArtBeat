import React from "react";
import { NavLink } from "react-router-dom";
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
      <li>
        <ProfileButton user={sessionUser} />
      </li>
    );
  } else {
    sessionLinks = (
      <li>
        <OpenModalButton
          buttonText="Log In"
          modalComponent={<LoginFormModal />}
        />
        <OpenModalButton
          buttonText="Sign Up"
          modalComponent={<SignupFormModal />}
        />
      </li>
    );
  }

  return (
    <ul>
      <li>
        <NavLink exact to="/shows">
          ARTBEAT
        </NavLink>
      </li>
      {sessionUser && <div><li>
        <NavLink exact to='/shows'>
            <i className="fa-solid fa-calendar-days"></i>
          </NavLink>
      </li>
      <li>
        <NavLink exact to={`/artists/${sessionUser.id}`}>
          <i class="fa-solid fa-id-badge"></i>
        </NavLink>
      </li></div>}
      {isLoaded && sessionLinks}
    </ul>
  );
}

export default Navigation;