import React from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";


const NavBar = () => {
  const hostname = `http://${window.location.hostname}:40100`
  const navigate = useNavigate();


  async function logout() {
    await axios.delete(`${hostname}/sign/out`)
    navigate('/signin')
  }

  return (
    <nav className="navMenu">
      <a href="/">Home</a>
      <a href="/signup">Sign up</a>
      <a href="/signin">Sign in</a>
      <a href='/signin' onClick={logout}>Sign out</a>
    </nav>
  )
}

export default NavBar