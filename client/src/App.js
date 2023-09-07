import Home from "./components/Home";
import Login from "./components/Login";
import Otp from "./components/Otp";
import SignUp from "./components/SignUp";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/otp" element={<Otp />} />
      </Routes>
      <ToastContainer />
    </>

  );
}

export default App;
