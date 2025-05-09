import React from 'react'
import Image from 'next/image';

function NotFound() {
    return (
        <main className="main d-flex align-items-center justify-content-center h-100vh">
            {/* Start Faq
		============================================= */}
            <div className="page-not-found de-padding">
                <div className="container">
                    <div className="page-not-wpr grid-2">
                        <div className="page-not-left">
                            <Image 
                                src="assets/img/vector/404.webp"
                                className="d-block text-center"
                                alt="thumb"
                            />
                        </div>
                        <div className="page-not-right d-flex align-items-center">
                            <div className="page-not-righ-ele">
                                <h2 className="headin-1">404</h2>
                                <h4 className="heading-4">Look like you're lost</h4>
                                <p className="mb-40">the page you are looking for not Found!</p>
                       
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* End Faq */}
        </main>

    )
}

export default NotFound