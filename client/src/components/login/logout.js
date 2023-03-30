import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { islogin } from "../redux/userSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const setLogout = async () => {
    const res = await axios.get("/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    dispatch(islogin(0));
    localStorage.removeItem("jwt");
    navigate("/login");
  };
  useEffect(() => {
    setLogout();
  }, []);

  return <div></div>;
};

export default Logout;
