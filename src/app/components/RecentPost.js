import React from 'react'
import Link from 'next/link';

function RecentPost() {
    return (
        <div className="widget recent-post">
            <h5 className="work-title">Recent Post</h5>
            <div className="recent-post-single">
                <div className="recent-post-pic">
                    <img src="/assets/img/pictures/post-1.png" alt="thumb" />
                </div>
                <div className="recent-post-bio">
                    <span>
                        <i className="icofont-ui-user" />
                        12 Feb, 2023
                    </span>
                    <Link href="single.html">
                        <h6>Learning transport is not difficult variety</h6>
                    </Link>
                </div>
            </div>
            <div className="recent-post-single">
                <div className="recent-post-pic">
                    <img src="/assets/img/pictures/post-2.png" alt="thumb" />
                </div>
                <div className="recent-post-bio">
                    <span>
                        <i className="icofont-ui-user" />
                        05 Jul, 2023
                    </span>
                    <Link href="single.html">
                        <h6>Plane transport to the variety countries transport</h6>
                    </Link>
                </div>
            </div>
            <div className="recent-post-single">
                <div className="recent-post-pic">
                    <img src="/assets/img/pictures/post-3.png" alt="thumb" />
                </div>
                <div className="recent-post-bio">
                    <span>
                        <i className="icofont-ui-user" />
                        29 Aug, 2023
                    </span>
                    <Link href="single.html">
                        <h6>Logistics planning from good to great variety</h6>
                    </Link>
                </div>
            </div>
        </div>


    )
}

export default RecentPost