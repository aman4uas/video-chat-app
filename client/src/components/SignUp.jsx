import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { COMPANY_NAME } from '../constants/constants';
import { toast } from 'react-toastify';
import axios from 'axios';

const SignUp = () => {
  document.title = COMPANY_NAME.toString() + " | Sign Up";
  const SERVER_BASE_URL = process.env.REACT_APP_SERVER_URL;
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(SERVER_BASE_URL + "/api/user/validate/signupform");
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }


  }

  function changeHandler(event) {
    let cleanedValue = event.target.value.replace(/\s/g, '');
    return cleanedValue;
  }
  function nameHandler(event) {
    setName(event.target.value);
  }
  function emailHandler(event) {
    let value = changeHandler(event);
    setEmail(value);
  }
  function passwordHandler(event) {
    let value = changeHandler(event);
    setPassword(value);
  }
  function confirmPasswordHandler(event) {
    let value = changeHandler(event);
    setConfirmPassword(value);
  }



  return (
    <section className="bg-gray-50 w-[100vw]">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto w-full">

        <Link to="/" className="flex mb-10 items-center text-4xl font-semibold text-[#FBAE3C]">
          <img className="w-12 h-12 mr-4" src="assets/logo.png" alt="logo" loading='lazy' />
          {COMPANY_NAME}
        </Link>

        <div className='bg-white p-6 w-[80vw] lg:w-[45%]'>
          <h1 className="text-xl mb-4 font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
            Create an account
          </h1>
          <form autocomplete="off" onSubmit={submitHandler} className="space-y-4 md:space-y-6">
            <div>
              <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">Full Name</label>
              <input value={name} onChange={nameHandler} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-dark:700" placeholder="John Doe" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Your email</label>
              <input value={email} onChange={emailHandler} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-dark:700" placeholder="name@company.com" required />
            </div>

            <div className='flex flex-row items-center'>
              <label htmlFor='gender' className="block mb-2 mr-8 text-sm font-medium text-gray-900">Gender</label>
              <div className='mr-6 -translate-y-1'>
                <input required checked={gender === "male"} onChange={(event) => setGender(event.target.value)} className='mx-2' type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div className='mr-6 -translate-y-1'>
                <input checked={gender === "female"} onChange={(event) => setGender(event.target.value)} className='mx-2' type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
            </div>

            <div className='flex flex-row items-center'>
              <label htmlFor='dob' className="block mb-2 mr-8 text-sm font-medium text-gray-900">Date of Birth:</label>
              <input value={dob} onChange={(event) => setDob(event.target.value)} required className='-translate-y-1' name="dob" type="date" />
            </div>

            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
              <input value={password} onChange={passwordHandler} type="text" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
            </div>
            <div>
              <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 ">Confirm password</label>
              <input required value={confirmPassword} onChange={confirmPasswordHandler} type="confirm-password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
            </div>
            <div className="flex items-start">
              <div className="flex items-center h-5">
                <input required id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <Link className="font-medium text-[#FBAE3C] hover:underline" to="#">Terms and Conditions</Link></label>
              </div>
            </div>
            <button type="submit" className="w-full text-white bg-[#FBAE3C] hover:bg-[#D97706] focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create an account</button>
            <p className="text-sm font-light text-gray-500">
              Already have an account? <Link to="/login" className="font-medium text-[#FBAE3C] hover:underline">Login here</Link>
            </p>
          </form>
        </div>
      </div>

    </section>

  )
}

export default SignUp