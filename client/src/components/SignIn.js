import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const SignIn = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPwd] = useState("");
  const [message, setMessage] = useState("");
  const hostname = `http://${window.location.hostname}:40100`
  const navigate = useNavigate();


  async function login(event) {
    event.preventDefault();
    const data = {email,pwd};
    try {
      await axios.post(`${hostname}/sign/in`, data, )
      navigate('/')
    } catch (error) {
      // console.log(error.response.data.error);
      setMessage(error.response.data.error);
    }
  }

  return (
    <div className="login">
      <h1>Sign in</h1>
      <p>{message}</p>
      <br />

      <form onSubmit={login} method="post">
        <div>
          <label for="text">Email</label>
          <div>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
        </div>
        <br />

        <div>
          <label for="password">Password</label>
          <div>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="password"
              autocomplete="off"
              value={pwd}
              onChange={(event) => setPwd(event.target.value)}
            />
          </div>
        </div>
        <br />
        <button type="submit">Sign in</button>
      </form>
    </div>
  );
};

export default SignIn;
