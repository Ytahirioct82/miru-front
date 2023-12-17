import { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./userLogin.css";
import { postUser } from "../api/postUser";
import { UserContext } from "../Contexts/UserContext";

function UserLogin() {
  const navigate = useNavigate();

  //stores the user email and password text filed to the userLog state
  const [userLogInfo, setUserLogInfo] = useState({
    email: "",
    password: "",
  });

  //stores the user info when the login authentication is successful.
  const { setUserValue } = useContext(UserContext);

  // sets user input for email and password text filed to the userLog state
  const HandleChange = (event) => {
    setUserLogInfo({ ...userLogInfo, [event.target.id]: event.target.value });
  };

  /*sends an api call to authenticate the user login info when user logs 
  and sets userValue context state with user info.*/
  const onSubmit = (event) => {
    event.preventDefault();

    postUser(userLogInfo)
      .then((response) => {
        if (response.data.id) {
          setUserValue(response.data);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.error(error);
        alert("you have entered the wrong username or password");
      });

    setUserLogInfo({
      email: "",
      password: "",
    });
  };

  return (
    <div className="UserLogin">
      <h3>Please login to your account</h3>
      <div className="UserForm">
        <form onSubmit={onSubmit}>
          <label htmlFor="UserEmail"> Email</label>
          <input
            id="email"
            value={userLogInfo.email}
            type="email"
            onChange={HandleChange}
            placeholder="Email"
            required
          />

          <label htmlFor="Password">Password</label>
          <input
            id="password"
            value={userLogInfo.password}
            type="password"
            onChange={HandleChange}
            placeholder="Password"
            required
          />
          <br></br>
          <button type="submit">Login</button>
        </form>
      </div>
      <Link to="/activity/registration" className="nav-link">
        <h4>Click here to register</h4>
      </Link>
    </div>
  );
}

export default UserLogin;
