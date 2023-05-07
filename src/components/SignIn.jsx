import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Ping from "./Ping"

const SignIn = () => {
  const [email, setEmail] = useState("")
  const [pwd, setPwd] = useState("")
  const [message, setMessage] = useState("")
  const hostname = process.env.REACT_APP_SERVER_END_POINT
  const navigate = useNavigate()

  // useEffect(() => {
  //   const test = () => {
  //     axios
  //       .get(`${hostname}/ping`)
  //       .then(() => {
  //         navigate("/home")
  //       })
  //       .catch((reason) => console.log(reason))
  //   }

  //   test()
  // }, [])
  Ping()

  async function login(event) {
    event.preventDefault()
    const data = { email, pwd }
    try {
      await axios.post(`${hostname}/sign/in`, data)
      navigate("/home")
    } catch (error) {
      document.querySelector("#errorMessage-login").classList.replace("d-none", "d-block")
      setMessage(error.response ? error.response.data.error : error.message)
    }
  }

  return (
    <div className="container-login">
      <div className="login-box">
        <h2>Sign in</h2>
        <p className="errorMessage-login d-none" id="errorMessage-login">
          ⚠ {message}
        </p>

        <form onSubmit={login} method="post" className="d-block " id="registerForm">
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

          <a href="#" className="buttonSubmit-signin" style={{ fontSize: 12 }}>
            Forget password?
          </a>
          <br />
          <br />

          <div className="form-button">
            <a href="/signup" className="buttonSubmit-signin">
              register
            </a>

            <button type="submit" className="buttonSubmit" onClick={(e) => setMessage("")}>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default SignIn
