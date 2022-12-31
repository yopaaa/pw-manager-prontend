import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/SignUp.css";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const [verifyCode, setVerifyCode] = useState("");
  const [payload, setPayload] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const hostname = `http://${window.location.hostname}:40100`;

  async function Register(event) {
    event.preventDefault();
    const data = {
      name,
      email,
      pwd,
      confirmpwd,
    };

    try {
      const _id = await axios.post(`${hostname}/sign/up`, data);
      setPayload(_id.data.payload);
      console.log(payload);
      hideOrShowElement("#registerForm");
      hideOrShowElement("#verifyForm");
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.error);
    }
  }

  async function sendVerify(event) {
    event.preventDefault();
    try {
      await axios.post(`${hostname}/sign/verify/${payload._id}`, {
        code: verifyCode,
      });
      navigate("/signin");
    } catch (error) {
      console.log(error.response.data);
      setMessage(error.response.data.error);
    }
  }

  function hideOrShowElement(target) {
    var x = document.querySelector(target);
    if (x.classList.contains("d-none")) {
      x.classList.replace("d-none", "d-block");
    } else {
      x.classList.replace("d-block", "d-none");
    }
  }

  return (
    <div className="login">
      <div className="container">
        <div className="login-box">
          <h2>Register</h2>
          <p className="errorMessage">{message}</p>

          <div id="verifyForm" className="d-none">
            <form onSubmit={sendVerify} method="post">
              <div className="user-box">
                <input
                  type="number"
                  className="formInput"
                  id="name"
                  required
                  autoComplete="off"
                  value={verifyCode}
                  onChange={(event) => setVerifyCode(event.target.value)}
                />
                <label>Verify code</label>
              </div>
              <div className="form-button">
                <a
                  href="?"
                  className="buttonSubmit-signin"
                  onClick={() => {
                    hideOrShowElement("#registerForm");
                    hideOrShowElement("#verifyForm");
                    setMessage('')
                  }}
                >
                  back
                </a>

                <button type="submit" className="buttonSubmit">
                  verify
                </button>
              </div>
            </form>
          </div>

          <form
            onSubmit={Register}
            method="post"
            className="d-block "
            id="registerForm"
          >
            <div className="user-box">
              <input
                type="text"
                name="name"
                className="formInput"
                id="name"
                required
                autoComplete="off"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
              <label>Username</label>
            </div>

            <div className="user-box">
              <input
                type="email"
                name="email"
                className="formInput"
                id="email"
                required
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
              <label>Email</label>
            </div>

            <div className="user-box">
              <input
                type="password"
                name="pwd"
                id="pwd"
                className="formInput"
                autoComplete="off"
                required
                value={pwd}
                onChange={(event) => setPwd(event.target.value)}
              />
              <label>Password</label>
            </div>

            <div className="user-box">
              <input
                type="password"
                name="confirmpwd"
                className="formInput"
                id="confirmpwd"
                autoComplete="off"
                required
                value={confirmpwd}
                onChange={(event) => setConfirmpwd(event.target.value)}
              />
              <label>Confirm password</label>
            </div>

            <div className="form-button">
              <a href="/signin" className="buttonSubmit-signin">
                sign in
              </a>

              <button type="submit" className="buttonSubmit" onClick={(e)=> setMessage('')}>
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
