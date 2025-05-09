'use client';
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';
import HomeBlogBox from './HomeBlogBox';

function Blog() {

    const [blogPosts, setBlogPosts] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Home PageBlog Posts useEffect is running");
        const fetchblogs = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfBlogs');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Blogs.length > 0) {
                    setBlogPosts(res.data.Blogs);
                } else {
                    setError('No Blog Posts data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Blog Posts Data');
            }

        };

        fetchblogs();

    }, []);

    return (
        <div className="blog-area de-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-title text-center">
                            <p className="hero-sub-title">Blog</p>
                            <div className="site-title-shape text-center mb-4">
                                <img src="/assets/img/shape/site-title-shape.png" alt="no image" />
                            </div>
                            <h2 className="up-title mb-0">Read Latest Feed</h2>
                        </div>
                    </div>
                </div>
                <div className="blog-wpr grid-3">
                    {/* <div className="blog-box">
                        <img src="/assets/img/pictures/blog-1.jpg" alt="no image" />
                        <div className="blog-overlay">
                            <div className="blog-over-content">
                                <span className="blog-ovr-date">
                                    <i className="fal fa-calendar-week" />
                                    20 March, 2023
                                </span>
                                <a href="single.html">
                                    <h4 className="heading-4">
                                        Important companies from the wall street journal
                                    </h4>
                                </a>
                                <div className="blog-over-bio">
                                    <img src="/assets/img/pictures/user-1-s.png" alt="no image" />
                                    <span className="blog-bio-text">
                                        <b> JOHN BAUS</b>
                                    </span>
                                </div>
                                <a href="single.html" className="btn-1 btn-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="blog-box">
                        <img src="/assets/img/pictures/blog-2.jpg" alt="no image" />
                        <div className="blog-overlay">
                            <div className="blog-over-content">
                                <span className="blog-ovr-date">
                                    <i className="fal fa-calendar-week" />
                                    26 May, 2023
                                </span>
                                <a href="single.html">
                                    <h4 className="heading-4">
                                        Growing marketing agency in the heart
                                    </h4>
                                </a>
                                <div className="blog-over-bio">
                                    <img src="/assets/img/pictures/user-2-s.png" alt="no image" />
                                    <span className="blog-bio-text">
                                        <b>JOHN DOE</b>
                                    </span>
                                </div>
                                <a href="single.html" className="btn-1 btn-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="blog-box">
                        <img src="/assets/img/pictures/blog-3.jpg" alt="no image" />
                        <div className="blog-overlay">
                            <div className="blog-over-content">
                                <span className="blog-ovr-date">
                                    <i className="fal fa-calendar-week" />
                                    28 May, 2023
                                </span>
                                <a href="single.html">
                                    <h4 className="heading-4">
                                        Creating An outside focus click handler react
                                    </h4>
                                </a>
                                <div className="blog-over-bio">
                                    <img src="/assets/img/pictures/user-3-s.png" alt="no image" />
                                    <span className="blog-bio-text">
                                        <b>JOHN DOE</b>
                                    </span>
                                </div>
                                <a href="single.html" className="btn-1 btn-sm">
                                    Read More
                                </a>
                            </div>
                        </div>
                    </div> */}
                    {blogPosts.map((post, index) => (
                        <HomeBlogBox
                            key={index}
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            date={post.date}
                            id={post.id}
                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Blog