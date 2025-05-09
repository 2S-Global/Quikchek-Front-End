import React from 'react'

function Testimonials({ name, designation, image, testimonial }) {
    return (
        <div className="swiper-slide">
            <div className="review-single">
                <div className="qoute-icon">
                    <img src="/assets/img/shape/quote-icon.png" alt="quote icon" />
                </div>
                <p className="review-text">{testimonial}</p>
                <div className="review-bottom">
                    <div className="review-bio">
                        <h4 className="heading-4">{name}</h4>
                        <span>{designation}</span>
                    </div>
                    <div className="review-bio-pic">
                        <img src={image} alt={name} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Testimonials