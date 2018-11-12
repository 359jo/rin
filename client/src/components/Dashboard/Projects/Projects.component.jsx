import React, { Component } from "react";
import { Link, Route } from "react-router-dom";
import NewProject from "./NewProject/NewProject.component";
import ProjectsList from "./ProjectsList/ProjectsList.component";
import ProjectInfo from "./ProjectInfo/ProjectInfo.component";
import UpdateProject from "./UpdateProject/UpdateProject.component";
import "./Projects.css";

export default class Projects extends Component {
  render() {
    return (
      <div className="projects-dashboard">
        <nav className="nav-up">
          <Link to="/dashboard/projects/add">
            <i className="fas fa-plus" />
            <span>New Project</span>
          </Link>
          <div className="search-group">
            <input
              type="search"
              className="search-input"
              placeholder="Search"
            />
            <i className="fas fa-search" />
          </div>
        </nav>
        <main>
          <Route path={"/dashboard/projects/add"} component={NewProject} />
          <Route
            exact
            path={"/dashboard/projects/list"}
            component={ProjectsList}
          />
          <Route
            exact
            path={"/dashboard/projects/list/:id"}
            component={ProjectInfo}
          />
          <Route
            exact
            path={"/dashboard/projects/list/updateproject/:id"}
            component={UpdateProject}
          />
        </main>
      </div>
    );
  }
}
