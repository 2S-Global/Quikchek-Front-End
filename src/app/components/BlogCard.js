// components/BlogCard.jsx
import React from 'react'
import Image from 'next/image'
import Link from 'next/link';

function BlogCard({ image, title, description, date, id }) {
    return (
        <div className="blog-box blog-page-shadow">
            <div className="blog-pic">
                <img src={image} alt="Blog" />
            </div>
            <div className="blog-desc">
                <Link href={`/blogdetails/${id}`}>
                    <h2 className="heading-2">{title}</h2>
                </Link>
                <p className="blog-text" dangerouslySetInnerHTML={{ __html: description }}>
                    {/* {description}
                    <p dangerouslySetInnerHTML={{ __html: description }}></p> */}
                </p>
                <div className="blog-meta mb-30">
                    <div className="blog-admin">
                        <i className="ti-calendar" />
                        <span>{date}</span>
                    </div>
                </div>
                <div className="blog-btnb">
                    <Link href={`/blogdetails/${id}`} className="btn-1 btn-md">
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default BlogCard
