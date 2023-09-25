import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import OtpInput from 'react-otp-input';
import { OTP_LENGTH, COMPANY_NAME, OTP_TIME } from '../constants/constants';

export default function App() {
  document.title = COMPANY_NAME.toString() + " | OTP Verification";

  const [otp, setOtp] = useState('');
  const [minutes, setMinutes] = useState(OTP_TIME.MINUTE);
  const [seconds, setSeconds] = useState(OTP_TIME.SECOND);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
    // eslint-disable-next-line
  }, [seconds]);

  function handleResetOTP() {
    setMinutes(OTP_TIME.MINUTE);
    setSeconds(OTP_TIME.SECOND);
  }

  return (
    <div className='h-screen bg-[#FBAE3C] flex flex-col items-center'>

      <div className='h-[60px] w-full bg-white flex flex-row justify-center items-center'>
        <Link className="flex flex-row justify-center items-center space-x-4" to="/">
          <img src="assets/logo.png" alt="logo" className='h-[40px] md:h-[50px]' />
          <h1 className='font-semibold font-sans text-3xl text-[#FE9100]'>{COMPANY_NAME}</h1>
        </Link>
      </div>

      <div className='flex flex-col justify-center items-center m-auto -translate-y-2'>
        <div className='flex flex-col justify-center items-center mb-10'>
          <img src="assets/verified.png" alt="verify-img" className='h-[80px] md:h-auto mb-8' />
          <h1 className='font-semibold font-sans  md:text-5xl text-white'>Enter OTP Code</h1>
        </div>

        <OtpInput
          containerStyle="flex flex-row justify-center items-center"
          inputStyle={{
            border: "1px solid #FBAE3C",
            borderRadius: "8px",
            width: "4vw",
            minWidth: "3rem",
            height: "4vw",
            minHeight: "3rem",
            fontSize: "2rem",
            color: "#FBAE3C",
            fontWeight: "400",
            caretColor: "black",
            margin: '1px'
          }}
          renderSeparator={<span className="w-[2vw]"></span>}
          value={otp}
          onChange={setOtp}
          numInputs={OTP_LENGTH}
          renderInput={(props) => <input {...props} />}
          inputType="tel"
        />

        <p className='m-2 mt-5 text-sm text-white'><span className='mr-5 md:mr-10'>Time Remaining : {minutes} min {seconds} sec</span><button className='underline' onClick={handleResetOTP}>Resend OTP</button></p>


        <button className='py-2 px-4 md:py-3 md:px-5 bg-white text-lg md:text-2xl font-semibold text-[#FE9100] border rounded-md mt-10'>Verify OTP</button>


      </div>

    </div>


  );
}