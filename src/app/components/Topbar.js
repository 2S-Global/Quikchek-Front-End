import React from 'react'
import Link from 'next/link';

function Topbar() {
    return (
        <div className="top-bar-area bg-grad pos-rel topbar-white py-3 d-none">
            <div className="container">
                <div className="row">
                    <div className="col-xl-6 col-lg-6">
                        <div className="top-box-wrp d-flex align-items-center">
                            <div className="top-phone top-box mr-30">
                                <i className="fa-solid fa-phone" />
                                <span>+8801688005654</span>
                            </div>
                            <div className="top-email top-box">
                                <i className="fa-solid fa-envelope" />
                                <span>info@example.com</span>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-6 col-lg-6">
                        <div className="top-box-wrp d-flex align-items-center text-right">
                            <div className="top-box top-location mr-30">
                                <i className="fa-solid fa-location-dot" />
                                <span>125 street melbourne new york </span>
                            </div>
                            <div className="top-box top-login">
                                <Link href="login.html">
                                    <i className="fa-solid fa-right-to-bracket" />
                                    <span>Login</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Topbar