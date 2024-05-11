import React, { useState } from "react";
import "../styles/main.css";
import "../styles/content.css";
import { useNavigate } from "react-router-dom";
export default function UserProfile() {
  const navigate = useNavigate();
  async function updatePassword(e) {
    e.preventDefault();
    try {
      const email = e.target.Email.value;
      const NewPassword = e.target.newPassword.value;
      console.log("email,newpassword", email, NewPassword);
      const response = await fetch(
        "http://localhost:3000/user/updateuserpassword",

        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: email, password: NewPassword }),
        }
      );
      if (response.ok) navigate("/Homepage");
      else alert("Error while updating the Password");
    } catch (error) {
      console.log("Error while updating the Password", error);
    }
  }

  return (
    <div className="ctr-main">
      <div className="ctr-sub">
        <div className="ctr-sub-left">
          <img src="images/logo-cut.png" alt="Logo" />
          <h1 className="ctr-sub-left-font">CarCheckMate</h1>
          <br />
          <br />
          <hr />
          <h6 className="placeAtBottom-right">
            <a href="mailto:carcheckmate@mail.com">carcheckmate@mail.com</a>
          </h6>
        </div>
        <div className="ctr-sub-right">
          <h1 className="ctr-sub-right-font">Enter A New Password</h1>
          <form onSubmit={updatePassword}>
            <input type="email" name="Email" placeholder="Your Email" />
            <input
              type="password"
              name="newPassword"
              placeholder="New Password"
            />
            <input
              type="password"
              name="confirmNewPassword"
              placeholder="Confirm New Password"
            />
            <button className="btn-forget-password" type="Submit">
              Save
            </button>
          </form>
          <h6 className="placeAtBottom-left">
            {/*<span>Forgot your login?</span>&nbsp;-&nbsp;*/}
            <span>Privacy Policy</span>
          </h6>
        </div>
      </div>
    </div>
  );
}
