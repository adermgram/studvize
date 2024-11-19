import React from "react";
import { IoLogOutOutline } from "react-icons/io5";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <nav className="navbar">
      <ul>
        
        <li>
          <NavLink to="/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
        </li>
        <li>
          <NavLink to="/scheduling" className={({ isActive }) => (isActive ? "active" : "")}>
            Scheduling Sessions
          </NavLink>
        </li>
        <li>
          <NavLink to="/focus" className={({ isActive }) => (isActive ? "active" : "")}>
            Break & Focus Reminders
          </NavLink>
        </li>
       
        <li>
          <NavLink to="/sessions" className={({ isActive }) => (isActive ? "active" : "")}>
            Interactive Study Sessions
          </NavLink>
        </li>
        <li id='signout'>
          <NavLink to="/" >
            Signout <IoLogOutOutline />
          </NavLink>
        </li>
        
      </ul>
    </nav>
  );
}

export default Navbar;
