import React from 'react'

import Script from 'dangerous-html/react'
import PropTypes from 'prop-types'
import { useState } from "react"
import LenderDialog from "./LenderDialog";


import './hero.css'

const Hero = (props) => {
    const [openDialog, setOpenDialog] = useState(false);

  return (
   

    <div className="hero-header78">
      <div className="hero-column thq-section-max-width thq-section-padding">
        <div className="hero-content1">
          <h1 className="hero-text1 thq-heading-1">{props.heading1}</h1>
          <p className="hero-text2 thq-body-large">{props.content1}</p>
        </div>
        <div className="hero-actions">
          <button className="thq-button-filled hero-button1">
            <span className="thq-body-small">{props.action1}</span>
          </button>

          <button
            className="thq-button-outline hero-button2"
            onClick={() => setOpenDialog(true)}
          >
            <span className="thq-body-small">{props.action2}</span>
          </button>


          {/* <button className="thq-button-outline hero-button2">
            <span className="thq-body-small">{props.action2}</span>
          </button> */}
        </div>
      </div>
      <div className="hero-content2">
        <div className="hero-row-container1 thq-mask-image-horizontal thq-animated-group-container-horizontal">
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero-placeholder-image10 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero-placeholder-image11 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero-placeholder-image12 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero-placeholder-image13 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero-placeholder-image14 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image6Alt}
              src={props.image6Src}
              className="hero-placeholder-image15 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
          <div className="thq-animated-group-horizontal">
            <img
              alt={props.image1Alt}
              src={props.image1Src}
              className="hero-placeholder-image16 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image2Alt}
              src={props.image2Src}
              className="hero-placeholder-image17 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image3Alt}
              src={props.image3Src}
              className="hero-placeholder-image18 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image4Alt}
              src={props.image4Src}
              className="hero-placeholder-image19 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image5Alt}
              src={props.image5Src}
              className="hero-placeholder-image20 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt="Hero Image"
              src="https://images.unsplash.com/photo-1534312527009-56c7016453e6?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDIxfHxhYnN0cmFjdHxlbnwwfHx8fDE3MTA4NzA5MzB8MA&amp;ixlib=rb-4.0.3&amp;w=1500"
              className="hero-placeholder-image21 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
        </div>
        <div className="hero-row-container2 thq-mask-image-horizontal thq-animated-group-container-horizontal">
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero-placeholder-image22 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero-placeholder-image23 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero-placeholder-image24 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero-placeholder-image25 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero-placeholder-image26 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image12Alt}
              src={props.image12Src}
              className="hero-placeholder-image27 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
          <div className="thq-animated-group-horizontal-reverse">
            <img
              alt={props.image7Alt}
              src={props.image7Src}
              className="hero-placeholder-image28 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image8Alt}
              src={props.image8Src}
              className="hero-placeholder-image29 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image9Alt}
              src={props.image9Src}
              className="hero-placeholder-image30 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image10Alt}
              src={props.image10Src}
              className="hero-placeholder-image31 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt={props.image11Alt}
              src={props.image11Src}
              className="hero-placeholder-image32 thq-img-ratio-1-1 thq-img-scale"
            />
            <img
              alt="Hero Image"
              src="https://images.unsplash.com/photo-1568214379698-8aeb8c6c6ac8?ixid=M3w5MTMyMXwwfDF8c2VhcmNofDEyfHxncmFmaWN8ZW58MHx8fHwxNzE1Nzk0OTk5fDA&amp;ixlib=rb-4.0.3&amp;w=1500"
              className="hero-placeholder-image33 thq-img-ratio-1-1 thq-img-scale"
            />
          </div>
        </div>
      </div>
      <div>
        <div className="hero-container2">
          <Script
            html={`<style>
  @keyframes scroll-x {
    from {
      transform: translateX(0);
    }
    to {
      transform: translateX(calc(-100% - 16px));
    }
  }

  @keyframes scroll-y {
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(calc(-100% - 16px));
    }
  }
</style>
`}
          ></Script>
        </div>
      </div>
      <LenderDialog open={openDialog} onClose={() => setOpenDialog(false)} />

    </div>
  )
}

Hero.defaultProps = {
  image12Alt: 'Hero Image',
  content1:
    'RentSafe is your go-to platform for borrowing and lending items within your local community. Join us in promoting sustainability and sharing resources with trust and accountability.',
  image7Src:
    'https://images.unsplash.com/photo-1567894789171-82559d055bbd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5MXw&ixlib=rb-4.1.0&q=80&w=1080',
  image2Alt: 'Hero Image',
  image5Alt: 'Hero Image',
  image11Src:
    'https://images.unsplash.com/photo-1588856309830-caa524f54d0f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5MHw&ixlib=rb-4.1.0&q=80&w=1080',
  image8Alt: 'Hero Image',
  image11Alt: 'Hero Image',
  image9Src:
    'https://images.unsplash.com/photo-1515549832467-8783363e19b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5Mnw&ixlib=rb-4.1.0&q=80&w=1080',
  image4Src:
    'https://images.unsplash.com/photo-1708422918979-2e697b70466c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
  image12Src:
    'https://images.unsplash.com/photo-1690983323067-aabb5b097c2a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5Mnw&ixlib=rb-4.1.0&q=80&w=1080',
  image6Src:
    'https://images.unsplash.com/photo-1673135676600-998aa75870cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5MXw&ixlib=rb-4.1.0&q=80&w=1080',
  image10Src:
    'https://images.unsplash.com/photo-1682084252278-6eb6cc06e93c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
  image9Alt: 'Hero Image',
  image7Alt: 'Hero Image',
  heading1: 'Welcome to RentSafe',
  action2: 'Become a Lender',
  action1: 'Become a Borrower',
  image2Src:
    'https://images.unsplash.com/photo-1711701486568-fea4470cca98?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OXw&ixlib=rb-4.1.0&q=80&w=1080',
  image4Alt: 'Hero Image',
  image3Alt: 'Hero Image',
  image1Src:
    'https://images.unsplash.com/photo-1712730324869-a0636488df6b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5NHw&ixlib=rb-4.1.0&q=80&w=1080',
  image3Src:
    'https://images.unsplash.com/photo-1565267172527-5cad7255d962?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OHw&ixlib=rb-4.1.0&q=80&w=1080',
  image6Alt: 'Hero Image',
  image10Alt: 'Hero Image',
  image8Src:
    'https://images.unsplash.com/photo-1523828469188-8ec2b90b6490?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5Mnw&ixlib=rb-4.1.0&q=80&w=1080',
  image1Alt: 'Hero Image',
  image5Src:
    'https://images.unsplash.com/photo-1602317713318-2e04a72f2871?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg5M3w&ixlib=rb-4.1.0&q=80&w=1080',
}

Hero.propTypes = {
  image12Alt: PropTypes.string,
  content1: PropTypes.string,
  image7Src: PropTypes.string,
  image2Alt: PropTypes.string,
  image5Alt: PropTypes.string,
  image11Src: PropTypes.string,
  image8Alt: PropTypes.string,
  image11Alt: PropTypes.string,
  image9Src: PropTypes.string,
  image4Src: PropTypes.string,
  image12Src: PropTypes.string,
  image6Src: PropTypes.string,
  image10Src: PropTypes.string,
  image9Alt: PropTypes.string,
  image7Alt: PropTypes.string,
  heading1: PropTypes.string,
  action2: PropTypes.string,
  action1: PropTypes.string,
  image2Src: PropTypes.string,
  image4Alt: PropTypes.string,
  image3Alt: PropTypes.string,
  image1Src: PropTypes.string,
  image3Src: PropTypes.string,
  image6Alt: PropTypes.string,
  image10Alt: PropTypes.string,
  image8Src: PropTypes.string,
  image1Alt: PropTypes.string,
  image5Src: PropTypes.string,
}

export default Hero
