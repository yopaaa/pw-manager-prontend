import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import "../style/Sign.css"
import Func from "./home-component/Func"

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [confirmpwd, setConfirmpwd] = useState("")
  const [verifyCode, setVerifyCode] = useState("")

  const [message, setMessage] = useState("")
  const [confirmpwdMessage, setConfirmpwdMessage] = useState("")
  const [pwdMessage, setPwdMessage] = useState("")
  const navigate = useNavigate()
  const hostname = process.env.REACT_APP_SERVER_END_POINT

  useEffect(() => {
    const test = () => {
      axios
        .get(`${hostname}/ping`)
        .then(() => {
          navigate("/home")
        })
        .catch((reason) => console.log(reason))
    }

    test()
  }, [])

  async function Register(event) {
    event.preventDefault()
    const data = { name, email, pwd, confirmpwd }

    try {
      if (pwd.length < 8 || pwd !== confirmpwd) throw new Error("password less than 8 or confirm wrong password")
      await axios.post(`${hostname}/sign/up`, data)
      Func.hideOrShowElement("registerForm")
      Func.hideOrShowElement("verifyForm")
      document.querySelector("#errorMessage-login").classList.replace("d-block", "d-none")
    } catch (error) {
      document.querySelector("#errorMessage-login").classList.replace("d-none", "d-block")
      setMessage(error.response.data.error)
    }
  }

  async function sendVerify(event) {
    event.preventDefault()
    try {
      await axios.post(`${hostname}/sign/verify`, {
        code: verifyCode,
      })
      navigate("/signin")
    } catch (error) {
      document.querySelector("#errorMessage-login").classList.replace("d-none", "d-block")
      setMessage(error.response.data.error)
    }
  }
  

  return (
    <div className="container-login">
      <div className="login-box">
        <h2>Register</h2>
        <p className="errorMessage-login d-none" id="errorMessage-login">
          ⚠ {message}
        </p>

        <form onSubmit={Register} method="post" className="d-block " id="registerForm">
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
              onChange={(event) => {
                setPwd(event.target.value)
                if (event.target.value.length >= 8) {
                  setPwdMessage("")
                } else {
                  setPwdMessage("Password length must be 8 or more")
                }
              }}
            />
            <label>Password</label>
            <p style={{ color: "red", fontSize: 12, top: -25, position: "relative" }}>{pwdMessage}</p>
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
              onChange={(event) => {
                setConfirmpwd(event.target.value)
                if (event.target.value === pwd) {
                  setConfirmpwdMessage("")
                } else {
                  setConfirmpwdMessage("confirm password incorrect")
                }
              }}
            />
            <label>Confirm password</label>
            <p style={{ color: "red", fontSize: 12, top: -25, position: "relative" }}>{confirmpwdMessage}</p>
          </div>

          <div className="form-button">
            <a href="/signin" className="buttonSubmit-signin">
              sign in
            </a>

            <button type="submit" className="buttonSubmit" onClick={(e) => setMessage("")}>
              Register
            </button>
          </div>
        </form>

        <form onSubmit={sendVerify} method="post" id="verifyForm" className="d-none">
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

          <p style={{ fontSize: 12 }}>We have just sent a verification code to your email</p>
          <p style={{ fontSize: 12 }}>if you don't receive the email try checking in span</p>
          <br />

          <div className="form-button">
            <a
              href="#"
              className="buttonSubmit-signin"
              onClick={() => {
                Func.hideOrShowElement("registerForm")
                Func.hideOrShowElement("verifyForm")
                setMessage("")
              }}>
              back
            </a>

            <button type="submit" className="buttonSubmit">
              verify
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignUp
