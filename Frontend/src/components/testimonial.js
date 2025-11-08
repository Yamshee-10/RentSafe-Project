import React from 'react'

import PropTypes from 'prop-types'

import './testimonial.css'

const Testimonial = (props) => {
  return (
    <div className="thq-section-padding">
      <div className="testimonial-max-width thq-section-max-width">
        <div className="testimonial-container10">
          <h2 className="thq-heading-2">{props.heading1}</h2>
          <span className="testimonial-text11 thq-body-small">
            {props.content1}
          </span>
        </div>
        <div className="thq-grid-2">
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div data-animated="true" className="thq-card testimonial-card1">
                <div className="testimonial-container12">
                  <img
                    alt={props.author1Alt}
                    src={props.author1Src}
                    className="testimonial-image1"
                  />
                  <div className="testimonial-container13">
                    <strong className="thq-body-large">
                      {props.author1Name}
                    </strong>
                    <span className="thq-body-small">
                      {props.author1Position}
                    </span>
                  </div>
                </div>
                <span className="testimonial-text14 thq-body-small">
                  {props.review1}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div data-animated="true" className="thq-card testimonial-card2">
                <div className="testimonial-container14">
                  <img
                    alt={props.author2Alt}
                    src={props.author2Src}
                    className="testimonial-image2"
                  />
                  <div className="testimonial-container15">
                    <strong className="thq-body-large">
                      {props.author2Name}
                    </strong>
                    <span className="thq-body-small">
                      {props.author2Position}
                    </span>
                  </div>
                </div>
                <span className="testimonial-text17 thq-body-small">
                  {props.review2}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div data-animated="true" className="thq-card testimonial-card3">
                <div className="testimonial-container16">
                  <img
                    alt={props.author3Alt}
                    src={props.author3Src}
                    className="testimonial-image3"
                  />
                  <div className="testimonial-container17">
                    <strong className="thq-body-large">
                      {props.author3Name}
                    </strong>
                    <span className="thq-body-small">
                      {props.author3Position}
                    </span>
                  </div>
                </div>
                <span className="testimonial-text20 thq-body-small">
                  {props.review3}
                </span>
              </div>
            </div>
          </div>
          <div className="thq-animated-card-bg-2">
            <div className="thq-animated-card-bg-1">
              <div data-animated="true" className="thq-card testimonial-card4">
                <div className="testimonial-container18">
                  <img
                    alt={props.author4Alt}
                    src={props.author4Src}
                    className="testimonial-image4"
                  />
                  <div className="testimonial-container19">
                    <strong className="thq-body-large">
                      {props.author4Name}
                    </strong>
                    <span className="thq-body-small">
                      {props.author4Position}
                    </span>
                  </div>
                </div>
                <span className="testimonial-text23 thq-body-small">
                  {props.review4}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Testimonial.defaultProps = {
  author4Position: 'Tech Enthusiast',
  review3:
    "I lent out my camera equipment on RentSafe and had a positive experience. It's nice to know that my items are being used and appreciated by others.",
  content1:
    'RentSafe has been a lifesaver for me during exam season. I was able to borrow textbooks from fellow students and save a ton of money. Highly recommend!',
  author2Name: 'Michael Smith',
  author2Src:
    'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OHw&ixlib=rb-4.1.0&q=80&w=1080',
  author1Name: 'Sarah Johnson',
  author4Alt: 'Image of David Rodriguez',
  author4Name: 'David Rodriguez',
  author1Position: 'College Student',
  review1: '5 stars',
  author3Name: 'Emily Chen',
  author1Src:
    'https://images.unsplash.com/photo-1611695434398-4f4b330623e6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OHw&ixlib=rb-4.1.0&q=80&w=1080',
  author1Alt: 'Image of Sarah Johnson',
  review4:
    'I borrowed a drone for a weekend trip through RentSafe. The process was smooth, and I felt secure knowing that the platform ensures accountability.',
  author4Src:
    'https://images.unsplash.com/photo-1634622260152-e6c16fd6ff33?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OHw&ixlib=rb-4.1.0&q=80&w=1080',
  author3Alt: 'Image of Emily Chen',
  author2Alt: 'Image of Michael Smith',
  author2Position: 'Local Resident',
  author3Position: 'Community Member',
  review2:
    'RentSafe helped me find the right tools for my DIY project without having to buy them. Great concept and easy to use platform.',
  author3Src:
    'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w5MTMyMXwwfDF8cmFuZG9tfHx8fHx8fHx8MTc1MTc2Nzg4OXw&ixlib=rb-4.1.0&q=80&w=1080',
  heading1: 'Testimonials',
}

Testimonial.propTypes = {
  author4Position: PropTypes.string,
  review3: PropTypes.string,
  content1: PropTypes.string,
  author2Name: PropTypes.string,
  author2Src: PropTypes.string,
  author1Name: PropTypes.string,
  author4Alt: PropTypes.string,
  author4Name: PropTypes.string,
  author1Position: PropTypes.string,
  review1: PropTypes.string,
  author3Name: PropTypes.string,
  author1Src: PropTypes.string,
  author1Alt: PropTypes.string,
  review4: PropTypes.string,
  author4Src: PropTypes.string,
  author3Alt: PropTypes.string,
  author2Alt: PropTypes.string,
  author2Position: PropTypes.string,
  author3Position: PropTypes.string,
  review2: PropTypes.string,
  author3Src: PropTypes.string,
  heading1: PropTypes.string,
}

export default Testimonial
