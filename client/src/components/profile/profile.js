import React, { useState, useEffect } from "react";
import "./profile.css";
import imagepic from "../../public/images/moon_crop.webp";
import { NavLink } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { islogin } from "../redux/userSlice";

const Profile = () => {
  const [date, setDate] = useState({});
  const [profiledata, setProfileData] = useState({});

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      userData.username === "" &&
      userData.email === "" &&
      userData.phone === "" &&
      userData.password === "" &&
      userData.confirmPassword === ""
    ) {
      toast.success("all field cant be empty", {
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
      } else {
        try {
          await axios.post("/profile", userData);
          toast.success("profile updated", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          setUserData({
            username: "",
            email: "",
            phone: "",
            password: "",
            confirmPassword: "",
          });
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

  const uploadPhoto = async (e) => {
    // const files = e.target.files;
    // const formData = new FormData();

    // formData.append("myfile", files[0]);
    // const { data } = await axios.post("/profileImage", formData);
    // console.log("🚀 ~ file: profile.js:105 ~ uploadPhoto ~ data:", data);
    getUserData();
  };

  const getUserData = async () => {
    // console.log("reached here", "running");
    const { data } = await axios.get("/getuser");
    console.log(
      "🚀 ~ file: profile.js:111 ~ getUserData ~ data:",
      data.profilepic
    );
    setProfileData(data);
    getjoinedDate(data);
  };

  useEffect(() => {
    getUserData();
  }, []);

  const getjoinedDate = (data) => {
    let d = new Date(data.createdAt);
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let month = months[d.getMonth()];
    let date = d.getDate();
    let year = d.getFullYear();
    setDate({ date, month, year });
  };

  return (
    <>
      <div className="d-flex  profile-container mx-5 mt-2 p-3">
        {profiledata ? (
          <div className="profile-left ">
            <div className="author-card-cover"></div>
            <div className="author-card-avatar ">
              {/* <img src={profiledata.profilepic} alt="userprofileimage" /> */}
              <img src={"background.jpg"} alt="userprofileimage" />
            </div>
            <div className="author-card-details ">
              <h5 className="author-card-name ">
                <strong>{profiledata.username}</strong>
              </h5>
              <div className="author-card-position">
                Joined {date.date} {date.month} {date.year}
              </div>
              <span className="author-card-position">{profiledata.email}</span>
            </div>
            <input
              type="file"
              name="upload Profile"
              id="proimg"
              className="inputfile"
              onChange={(e) => uploadPhoto(e)}
            />
            <label className="wizard" for="proimg">
              Click to upload image
            </label>
          </div>
        ) : (
          ""
        )}

        <div className="profile-right">
          <div className="">
            <div className="tab-pane fade show active">
              <div>
                <div className="Toastify"></div>
                <div className="Toastify"></div>
              </div>
              <form className="form-container">
                <div className="">
                  <div className="form">
                    <label>UserName</label>
                    <input
                      className="form-control"
                      type="text"
                      required=""
                      value={userData.username}
                      name="username"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form">
                    <label className="mt-3" for="account-email">
                      E-mail Address
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      required=""
                      value={userData.email}
                      name="email"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form">
                    <label className="mt-3" for="account-email">
                      phone
                    </label>
                    <input
                      className="form-control"
                      type="number"
                      required=""
                      value={userData.phone}
                      name="phone"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form">
                    <label className="mt-3" for="account-pass mb-2">
                      New Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={userData.password}
                      name="password"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <div className="">
                  <div className="form">
                    <label className="mt-3" for="account-confirm-pass">
                      Confirm Password
                    </label>
                    <input
                      className="form-control"
                      type="password"
                      value={userData.confirmPassword}
                      name="confirmPassword"
                      onChange={(e) => handleChange(e)}
                    />
                  </div>
                </div>
                <button
                  className="upadate-button mt-3"
                  // type="button"
                  onClick={handleSubmit}
                >
                  Update Profile
                </button>
              </form>
              <ToastContainer />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
