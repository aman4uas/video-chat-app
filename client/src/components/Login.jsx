import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { COMPANY_NAME } from '../constants/constants'


const Login = () => {
  document.title = COMPANY_NAME.toString() + " | Login";
  // eslint-disable-next-line
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function changeHandlerEmail(event) {
    let cleanedValue = event.target.value.replace(/\s/g, '');
    setEmail(cleanedValue);
  }
  function changeHandlerPassword(event) {
    let cleanedValue = event.target.value.replace(/\s/g, '');
    setPassword(cleanedValue);
  }
  function submitHandler(event) {
    event.preventDefault();
    console.log(email, password);
    //navigate("/");
  }
  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-4xl font-semibold text-[#FBAE3C]">
          <img className="w-12 h-12 mr-4" src="assets/logo.png" alt="logo" loading='lazy' />
          {COMPANY_NAME}
        </Link>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Login Here
            </h1>
            <form autocomplete="off" onSubmit={submitHandler} className="space-y-4 md:space-y-6">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
                <input value={email} onChange={changeHandlerEmail} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-dark:700" placeholder="name@company.com" required />
              </div>
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                <input value={password} onChange={changeHandlerPassword} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
              </div>
              <button type="submit" className="w-full text-white bg-[#FBAE3C] hover:bg-[#D97706] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Login</button>

            </form>
            <p className="text-sm font-light text-gray-500">
              Don't have an account? <Link to="/signup" className="font-medium text-[#FBAE3C] hover:underline">Sign Up here</Link>
            </p>
            <p className="text-sm font-light text-gray-500">
              Forgot Password? <Link to="/forgot-password" className="font-medium text-[#FBAE3C] hover:underline">Click here</Link>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Login