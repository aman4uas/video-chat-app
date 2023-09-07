import React, { useEffect } from 'react'
import FloatingObj from './FloatingObj';

const Hero = () => {
  useEffect(() => {

  }, []);
  return (
    <div className='pt-[55px] h-full flex flex-row items-center justify-evenly'>
      <div className='ml-[5vw] relative flex justify-center items-center '>
        <FloatingObj />
        <div className='absolute translate-x-[-20px]'>
          <h1 className='text-4xl font-bold'>VIDEO&nbsp;CALL<br />APPLICATION</h1>
          <h2 className='mt-3 text-lg italic font-medium inter'>Keep communication with friends..</h2>
        </div>
      </div>
      <div>
        <img src="assets/hero-img-1.svg" alt="img-hero" className='h-[calc(100vh-55px-15vh)]' />
      </div>
      {/* <svg className='absolute bottom-0 z-[-10]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FBAE3C" fill-opacity="1" d="M0,256L120,261.3C240,267,480,277,720,261.3C960,245,1200,203,1320,181.3L1440,160L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg> */}
      {/* <svg className='absolute bottom-0 z-[-10]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FBAE3C" fill-opacity="1" d="M0,224L120,213.3C240,203,480,181,720,165.3C960,149,1200,139,1320,133.3L1440,128L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg> */}
      {/* <svg className='absolute bottom-0 z-[-10]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FBAE3C" fill-opacity="1" d="M0,288L120,261.3C240,235,480,181,720,170.7C960,160,1200,192,1320,208L1440,224L1440,320L1320,320C1200,320,960,320,720,320C480,320,240,320,120,320L0,320Z"></path></svg> */}
      <svg className='absolute bottom-0 z-[-10]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FBAE3C" fill-opacity="1" d="M0,64L48,96C96,128,192,192,288,218.7C384,245,480,235,576,234.7C672,235,768,245,864,245.3C960,245,1056,235,1152,202.7C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
    </div>
  )
}

export default Hero