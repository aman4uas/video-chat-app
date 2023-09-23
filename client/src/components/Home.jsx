import React from 'react'
import Navbar from './UI/Navbar'
import Hero from './UI/Home/Hero'
import Footer from './UI/Home/Footer'
import About from './UI/Home/About'
import Contact from './UI/Home/Contact'

const Home = () => {
  let count = 0;
  console.log(count++);
    return (
    <div className='relative h-screen'>
      <h1> {count}</h1>
      <Navbar />
      <Hero />
      <About />
      <Contact />
      <Footer />

    </div>
  )
}

export default Home