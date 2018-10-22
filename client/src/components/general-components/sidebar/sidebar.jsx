import React from "react";
import "./sidebar.css";
import { Link } from "react-router-dom";

export default props => {
  return (
    <nav id="ml-menu" className="sidebar">
      <div className="logo">
        <img src="/imgs/old-logo.png" alt="" />
      </div>
      <ul>
        <li>
          <Link to={"/dashboard/projects"}>projects</Link>
        </li>
        <li>
          <Link to={"/dashboard/stories"}>stories</Link>
        </li>
      </ul>
    </nav>
  );
};
