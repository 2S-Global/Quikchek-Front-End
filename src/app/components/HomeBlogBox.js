import React from 'react'
import Link from 'next/link';

function HomeBlogBox({ image, title, description, date, id }) {
    return (
        <div className="blog-box">
            <img src={image} alt="no image" style={{ height: '700px', objectFit: 'cover' }}  />
            <div className="blog-overlay">
                <div className="blog-over-content">
                    <span className="blog-ovr-date">
                        <i className="fal fa-calendar-week" />
                        {date}
                    </span>
                    <Link href={`/blogdetails/${id}`}>
                        <h4 className="heading-4">
                            {title}
                        </h4>
                    </Link>
                    {/* <div className="blog-over-bio">
                        <img src={authorImage} alt="no image" />
                        <span className="blog-bio-text">
                            <b>{authorName}</b>
                        </span>
                    </div> */}
                    <Link href={`/blogdetails/${id}`} className="btn-1 btn-sm">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default HomeBlogBox