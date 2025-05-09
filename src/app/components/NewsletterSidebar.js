import React from 'react'

function NewsletterSidebar() {
    return (
        <div
            className="widget subs bg-overlay hero-bg"
            style={{ backgroundImage: "url(/assets/img/pictures/w-5.jpg)" }}
        >
            <h5 className="work-title">Newsletter</h5>
            <p className="subs-title">
                Give lady of they such they sure it. Me contained explained my education.
            </p>
            <div className="subs-sub">
                <div className="ipp">
                    <input type="text" placeholder="Enter Your Email" />
                </div>
                <button type="submit">Subscribe</button>
            </div>
        </div>

    )
}

export default NewsletterSidebar