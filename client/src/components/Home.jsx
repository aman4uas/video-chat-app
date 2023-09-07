import React from 'react'
import Navbar from './UI/Navbar'
import Hero from './UI/Home/Hero'
import Footer from './UI/Home/Footer'
import About from './UI/Home/About'
import Contact from './UI/Home/Contact'

const Home = () => {
  return (
    <div className='relative h-screen'>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />
    </div>
  )
}

export default Home