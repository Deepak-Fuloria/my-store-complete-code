import React, { useState } from "react";
import "./register.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { islogin } from "../redux/userSlice";

const Register = () => {
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username === "" ||
      userData.email === "" ||
      userData.phone === "" ||
      userData.password === "" ||
      userData.confirmPassword === ""
    ) {
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
      if (userData.password !== userData.confirmPassword) {
        {
          toast.success("password and confirm password are not same", {
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
        setUserData({
          ...userData,
          password: "",
          confirmPassword: "",
        });
      } else {
        try {
          // console.log("reached here", userData);
          const { data } = await axios.post("/register", userData);
          // console.log("🚀 ~ file: Register.js:68 ~ handleSubmit ~ res:", data);

          dispatch(islogin(1));
          localStorage.setItem("jwt", data.token);
          navigate("/");
        } catch (error) {
          console.log(error);

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
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-left">
          <h1 id="register-hello">Happy</h1>
          <h1 id="register-world">Shop.</h1>
          {/* <p id="register-p1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur voluptas reiciendis facilis odit, harum dolores ut illum cumque at aliquam.</p> */}
          <p id="register-p2">Already have an accont ?</p>
          <NavLink to="/login">
            <button type="submit">Login</button>
          </NavLink>
        </div>
        <div className="register-right">
          <h1>Register</h1>
          <form action="" id="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              value={userData.username}
              placeholder="Username"
              name="username"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              value={userData.email}
              placeholder="Email"
              name="email"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="text"
              placeholder="Phone"
              value={userData.phone}
              name="phone"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="Password"
              placeholder="Password"
              value={userData.password}
              name="password"
              onChange={(e) => handleChange(e)}
            />
            <input
              type="Password"
              placeholder="Confirm Password"
              value={userData.confirmPassword}
              name="confirmPassword"
              onChange={(e) => handleChange(e)}
            />
            <button type="submit">Register</button>
          </form>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Register;
