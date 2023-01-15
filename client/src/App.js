import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Root from "./components/Root";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import './style/body.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Root />} />
        <Route path="/home" element={ <Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
