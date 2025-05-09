import React from 'react'
import Link from 'next/link';

function NumberTalks() {
  return (
    <div
      className="counter-area cnt-2 de-padding pos-rel hero-bg"
      style={{ backgroundImage: "url(/assets/img/bg/counter-bg.png)" }}
    >
      <div className="container">
        <div className="counter-wpr">
          <div className="row align-items-center">
            <div className="col-xl-4">
              <div className="counter-title">
                <span className="hero-sub-title text-white mb-20">
                  <span className="hero-line" />
                  Number Talks
                </span>
                <h2 className="heading-2 text-white mb-30">
                  Providing assistance since 1959
                </h2>
                <Link href="about.html" className="btn-5 btn-md">
                  Get Our Story
                </Link>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="counter-1 grid-3">
                <div className="fun-fact">
                  <div className="counter-icon">
                    <i>
                      <img src="/assets/img/icon/counter-1.png" alt="no image" />
                    </i>
                  </div>
                  <div className="counter">
                    <div className="timer" data-to={98} data-speed={2000} />
                    <div className="operator">%</div>
                  </div>
                  <span className="medium">Business Hike</span>
                </div>
                <div className="fun-fact">
                  <div className="counter-icon">
                    <i>
                      <img src="/assets/img/icon/counter-2.png" alt="no image" />
                    </i>
                  </div>
                  <div className="counter">
                    <div className="timer" data-to={788} data-speed={2000} />
                    <div className="operator">K</div>
                  </div>
                  <span className="medium">Sales Products</span>
                </div>
                <div className="fun-fact">
                  <div className="counter-icon">
                    <i>
                      <img src="/assets/img/icon/counter-3.png" alt="no image" />
                    </i>
                  </div>
                  <div className="counter">
                    <div className="timer" data-to={150} data-speed={2000} />
                    <div className="operator">M</div>
                  </div>
                  <span className="medium">Happy clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  )
}

export default NumberTalks