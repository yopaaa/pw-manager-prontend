import React, { useEffect } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Ping = () => {
  const navigate = useNavigate()
  const hostname = process.env.REACT_APP_SERVER_END_POINT

  useEffect(() => {
    const test = () => {
      axios
        .get(`${hostname}/ping`)
        .then(() => {
          navigate("/home")
        })
        .catch((reason) => navigate("/signin"))
    }

    test()
  }, [])
  return <div></div>
}

export default Ping
