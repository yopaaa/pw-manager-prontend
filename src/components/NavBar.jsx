import React, { useState, useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import moment from "moment"
import "../style/navbar.css"

const NavBar = () => {
  const [date, setDate] = useState("")
  const hostname = process.env.REACT_APP_SERVER_END_POINT
  const navigate = useNavigate()

  async function logout() {
    await axios.delete(`${hostname}/sign/out`)
    navigate("/signin")
  }

  useEffect(() => {
    const timerId = setInterval(() => {
      setDate(moment().format("MMMM Do YYYY, h:mm:ss a"))
    }, 1000)
    return function cleanup() {
      clearInterval(timerId)
    }
  }, [])

  return (
    <div className="nav-container">
      <nav className="navMenu">
        <a href="/home">Home</a>
        <a href="/signup">Sign up</a>
        <a href="/signin">Sign in</a>
        <a href="/signin" onClick={logout}>
          Sign out
        </a>
      </nav>
      <span>{date.toLocaleString()}</span>
      <a href="/">
        <img src="/icon.png" alt="icon" width="30px" style={{ cursor: "pointer" }} />
      </a>
    </div>
  )
}

export default NavBar
