import React, { useState } from 'react'
import { Link } from "react-router-dom";
import { COMPANY_NAME } from '../../constants/constants'

const Navbar = () => {
  const [currentWindowLocation, setWindowLocation] = useState("");
  window.addEventListener('scroll', () => {
    setWindowLocation(window.location.hash);
  })
  return (
    <div className="fixed z-10 top-0 w-full flex flex-row justify-between text-white bg-gradient h-[55px]">
      <div className="ml-[10vw] flex flex-row justify-center items-center">
        <Link
          className="flex flex-row justify-center items-center space-x-4"
          to="/"
        >
          <img src="assets/icon-white.png" alt="logo" className="h-[40px]" />
          <h1 className="font-semibold font-sans text-2xl">{COMPANY_NAME}</h1>
        </Link>
      </div>

      <div className="flex flex-row justify-center items-center space-x-[6vw] text-lg">
        <div
          className={
            `hover:drop-shadow-lg ` +
            (currentWindowLocation === ""
              ? "border rounded-md p-1 font-semibold"
              : "")
          }
        >
          <Link to="/">Home</Link>
        </div>
        <div
          className={
            `hover:drop-shadow-lg ` +
            (currentWindowLocation === "#About"
              ? "border rounded-md p-1 font-semibold"
              : "")
          }
        >
          <Link to="/#About">About</Link>
        </div>
        <div
          className={
            `hover:drop-shadow-lg ` +
            (currentWindowLocation === "#Contact"
              ? "border rounded-md p-1 font-semibold"
              : "")
          }
        >
          <Link to="/server">Server</Link>
        </div>
      </div>

      <div className="mr-[10vw] flex flex-row justify-center items-center text-lg">
        <div className="py-1 px-4 bg-white border rounded text-[#FD6B00] font-semibold hover:drop-shadow-lg">
          <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  );
}

export default Navbar