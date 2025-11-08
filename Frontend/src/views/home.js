import React from 'react'

import { Helmet } from 'react-helmet'

import Navbar from '../components/navbar'
import Hero from '../components/hero'
import Features1 from '../components/features1'
import CTA from '../components/cta'
import Features2 from '../components/features2'
import Pricing from '../components/pricing'
import Steps from '../components/steps'
import Testimonial from '../components/testimonial'
import Contact from '../components/contact'
import Footer from '../components/footer'
import './home.css'

const Home = (props) => {
  return (
    <div className="home-container">
      <Helmet>
        <title>Spotless Hungry Crocodile</title>
      </Helmet>
      <Navbar></Navbar>
      <Hero
        image8Src="https://images.unsplash.com/photo-1751833720827-b8f8138c96e0?ixid=M3w5MTMyMXwwfDF8YWxsfDE0fHx8fHx8fHwxNzUyMTA5MzA5fA&amp;ixlib=rb-4.1.0&amp;w=1500"
        image3Src="https://images.unsplash.com/photo-1751290741362-f0eea350cb61?ixid=M3w5MTMyMXwwfDF8YWxsfDN8fHx8fHx8fDE3NTIxMDkzMDl8&amp;ixlib=rb-4.1.0&amp;w=1500"
        image2Src="https://images.unsplash.com/photo-1751710953703-7e1597676e08?ixid=M3w5MTMyMXwwfDF8YWxsfDI0fHx8fHx8fHwxNzUyMTA5MzA5fA&amp;ixlib=rb-4.1.0&amp;w=1500"
        image1Src="https://images.unsplash.com/photo-1751888095240-8ea1a2bde4b7?ixid=M3w5MTMyMXwwfDF8YWxsfDQ4fHx8fHx8fHwxNzUyMTE2MDY2fA&amp;ixlib=rb-4.1.0&amp;w=1500"
        image7Src="https://images.unsplash.com/photo-1751725101829-5957007ea7bc?ixid=M3w5MTMyMXwwfDF8YWxsfDU5fHx8fHx8fHwxNzUyMTE2MDg3fA&amp;ixlib=rb-4.1.0&amp;w=1500"
      ></Hero>
      <Features1></Features1>
      <CTA></CTA>
      <Features2></Features2>
      <Pricing></Pricing>
      <Steps></Steps>
      <Testimonial></Testimonial>
      <Contact></Contact>
      <Footer></Footer>
    </div>
  )
}

export default Home
