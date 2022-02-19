import React from "react"
import { Link } from "react-router-dom"
import LoggedIn from "./LoggedIn"

const Navigation = () => {
  return (
    <nav className="navbar is-spaced has-shadow is-light " role="navigation">
      <div className="navbar-start">
        <Link className="navbar-item" to="/">
          Blogs
        </Link>
        <Link className="navbar-item" to="/users">
          {" "}
          Users
        </Link>
        <div className="navbar-item">
          <LoggedIn />
        </div>
      </div>
    </nav>
  )
}
export default Navigation
