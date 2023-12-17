import { React, useContext } from "react";
import { Link } from "react-router-dom";
import { BsPlusLg } from "react-icons/bs";
import "./navbar.css";
import { instance } from "../../helpers/api";
import miruUpdatedImage from "../../asset/miruUpdated.png";
import { UserContext } from "../Contexts/UserContext";

const Navbar = () => {
  const { userValue, setUserValue } = useContext(UserContext);

  // send request to the back end to logout the user.
  const logout = () => {
    instance
      .post(`/user/logout`)
      .then((response) => {
        setUserValue({ id: "" });
      })
      .catch((error) => console.warn("catch", error));
  };

  //displays either login button if user if logged out or logout button if user is logged in.
  const userLog = userValue.id ? (
    <Link to="/activity/login" className="nav-link">
      <button onClick={logout} type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
        Logout
      </button>
    </Link>
  ) : (
    <Link to="/activity/login" className="nav-link">
      <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
        Login
      </button>
    </Link>
  );

  let initials = null;
  // checks if user is logged then set the initials var to user initials.
  if (userValue && userValue.name) {
    const fullName = userValue.name.split(" ");
    initials = <h5>{fullName.shift().charAt(0) + fullName.pop().charAt(0).toUpperCase()}</h5>;
  }

  return (
    <nav className="navbar navbar-expand-lg  navbar-dark">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <img className="img-fluid" src={miruUpdatedImage} alt="Miru" />
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navmenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navmenu">
          <ul className="navbar-nav ms-auto">
            <li>
              <Link to="/activity/new" className="nav-link">
                <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
                  <BsPlusLg />
                  &nbsp;&nbsp; Post
                </button>
              </Link>
            </li>

            <li>{userLog}</li>
            <li>
              <Link to="/activity/listings" className="nav-link">
                <button type="button" style={{ color: "white" }} className="btn btn-outline-secondary">
                  My listing
                </button>
              </Link>
            </li>
            <li>
              <Link to="/activity/favorites" className="nav-link">
                <button
                  onClick={() => {
                    if (userValue === null || userValue === undefined) {
                      window.location.href = "/activity/login";
                    }
                    // else {
                    //     // Handle the button click event for other cases
                    //     // ...
                    //   }
                  }}
                  type="button"
                  style={{ color: "white" }}
                  className="btn btn-outline-secondary"
                >
                  Favorites
                </button>
              </Link>
            </li>
          </ul>
        </div>
        {initials}
      </div>
    </nav>
  );
};

export default Navbar;
