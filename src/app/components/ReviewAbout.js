import React from 'react'

function ReviewAbout() {
    return (
        <div
            className="review-area bg de-padding hero-bg"
            style={{ backgroundImage: "url(assets/img/shape/review-map.png)" }}
        >
            <div className="container">
                <div className="review-wpr">
                    <div className="row g-5">
                        <div className="col-xl-5">
                            <div className="review-left element-center">
                                <div className="review-left-content">
                                    <h2 className="heading-2">
                                        Check out what our satisfied clients said.
                                    </h2>
                                    <div className="reveiw-slider-ico">
                                        <div className="swiper-button-next" />
                                        <div className="swiper-button-prev" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-7">
                            <div className="review-slider review-second">
                                <div className="swiper rev-sldr">
                                    <div className="swiper-wrapper">
                                        <div className="swiper-slide">
                                            <div className="review-single">
                                                <img
                                                    src="/assets/img/shape/quote-icon.png"
                                                    className="review-quote-icon"
                                                    alt="no image"
                                                />
                                                <div className="review-text">
                                                    <p>
                                                        There are many variations of passages of Lorem Ipsum
                                                        available, but the majority have suffered alteration in
                                                        some form, by injected humour, or randomised words which
                                                        don't look even slightly believable.
                                                    </p>
                                                </div>
                                                <div className="review-bottom">
                                                    <div className="review-image">
                                                        <img
                                                            src="/assets/img/pictures/user-1.png"
                                                            alt="no image"
                                                        />
                                                    </div>
                                                    <div className="review-bio">
                                                        <h4>Kylle Coleken</h4>
                                                        <span>CEO</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="review-single">
                                                <img
                                                    src="/assets/img/shape/quote-icon.png"
                                                    className="review-quote-icon"
                                                    alt="no image"
                                                />
                                                <div className="review-text">
                                                    <p>
                                                        There are many variations of passages of Lorem Ipsum
                                                        available, but the majority have suffered alteration in
                                                        some form, by injected humour, or randomised words which
                                                        don't look even slightly believable.
                                                    </p>
                                                </div>
                                                <div className="review-bottom">
                                                    <div className="review-image">
                                                        <img
                                                            src="/assets/img/pictures/user-2.png"
                                                            alt="no image"
                                                        />
                                                    </div>
                                                    <div className="review-bio">
                                                        <h4>Kyle Chohan</h4>
                                                        <span>User</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="swiper-slide">
                                            <div className="review-single">
                                                <img
                                                    src="/assets/img/shape/quote-icon.png"
                                                    className="review-quote-icon"
                                                    alt="no image"
                                                />
                                                <div className="review-text">
                                                    <p>
                                                        There are many variations of passages of Lorem Ipsum
                                                        available, but the majority have suffered alteration in
                                                        some form, by injected humour, or randomised words which
                                                        don't look even slightly believable.
                                                    </p>
                                                </div>
                                                <div className="review-bottom">
                                                    <div className="review-image">
                                                        <img
                                                            src="/assets/img/pictures/user-3.png"
                                                            alt="no image"
                                                        />
                                                    </div>
                                                    <div className="review-bio">
                                                        <h4>Shosel Shishami</h4>
                                                        <span>Businessman</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ReviewAbout