import React, { useState } from "react";
import "./Login.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { islogin } from "../redux/userSlice";

const Login = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.email === "" || userData.password === "") {
      toast.success("fill all details", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    } else {
      try {
        const { data } = await axios.post("/login", userData);
        // console.log("🚀 ~ file: Login.js:38 ~ handleSubmit ~ data:", data);

        dispatch(islogin(1));
        localStorage.setItem("jwt", data.token);
        navigate("/");
      } catch (error) {
        toast.warning(error.response.data.message, {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-left">
          <div className="login-center">
            <h1 id="login-hello">Happy</h1>
            <h1 id="login-world">Shop.</h1>
            <p id="login-p2">dont you have an accont ?</p>
            <NavLink to="/register">
              <button type="submit">Register</button>
            </NavLink>
          </div>
        </div>
        <div className="login-right">
          <h1>Login</h1>
          <form action="" id="login-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userData.email}
              name="email"
              placeholder="Email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="Password"
              value={userData.password}
              name="password"
              placeholder="Password"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit"> Login</button>
          </form>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
};

export default Login;
