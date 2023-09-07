import React from 'react'
import Carousel from '../Carousel'

const About = () => {
  return (
    <div id="About" className='relative my-20 flex flex-col justify-center items-center'>
      {/* <svg className='absolute z-[-10]' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#FBAE3C" fill-opacity="1" d="M0,32L1440,128L1440,0L0,0Z"></path></svg> */}
      <Carousel />
    </div>
  )
}

export default About