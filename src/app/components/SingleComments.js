import React from 'react'
import Link from 'next/link';

function SingleComments() {
    return (
        <div className="single-comments-section blg-single">
            <h4 className="single-content-title">Comments</h4>
            <div className="single-commentor">
                <ul>
                    <li>
                        <div className="single-commentor-user">
                            <img src="/assets/img/pictures/user-1.png" alt="thumb" />
                            <div className="single-commentor-user-bio">
                                <div className="single-commentor-user-bio-head">
                                    <h5> Andrew R. Huskey </h5>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt utx gh labore et dolor magna ali Ut enim
                                    ad minim veniam, quis nostrud exercitation .
                                </p>
                                <Link href="#" className="share d-block">
                                    Reply
                                    <i className="icofont-reply px-2" />
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="single-commentor-user de-bpd">
                            <img src="/assets/img/pictures/user-3.png" alt="thumb" />
                            <div className="single-commentor-user-bio">
                                <div className="single-commentor-user-bio-head">
                                    <h5>George A. Liu</h5>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt utx gh labore et dolor magna ali Ut enim
                                    ad minim veniam
                                </p>
                                <Link href="#" className="share d-block">
                                    Reply
                                    <i className="icofont-reply px-2" />
                                </Link>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className="single-commentor-user">
                            <img src="/assets/img/pictures/user-2.png" alt="thumb" />
                            <div className="single-commentor-user-bio">
                                <div className="single-commentor-user-bio-head">
                                    <h5> Martha M. Muth </h5>
                                </div>
                                <p>
                                    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                                    eiusmod tempor incididunt utx gh labore et dolor magna ali Ut enim
                                    ad minim veniam, quis nostrud exercitation .
                                </p>
                                <Link href="#" className="share d-block">
                                    Reply
                                    <i className="icofont-reply px-2" />
                                </Link>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
            <div className="single-comments-section-form mt-30">
                <h4 className="single-content-title">Leave a Reply</h4>
                <form>
                    <div className="row g-5">
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="text"
                                    className="form-control input-style-2"
                                    placeholder="Your Name*"
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <input
                                    type="email"
                                    className="form-control input-style-2"
                                    placeholder="Your Email*"
                                />
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className="form-group">
                                <textarea
                                    className="form-control input-style-2"
                                    rows={5}
                                    placeholder="Your Comment*"
                                    defaultValue={""}
                                />
                            </div>
                            <button type="submit" className="btn-1 btn-md mt-30">
                                Submit
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    )
}

export default SingleComments