'use client';
import React from 'react'
import BlogCard from './BlogCard';
import Image from 'next/image';
import CategorySidebar from './CategorySidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import CategoryBlogCard from './CategoryBlogCard';
import Link from 'next/link';
function CategoryBlogBody({ blogs }) {


    return (
        <div className="blog-area de-padding">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-8">
                        <div className="blog-page-content pr-30">
                            <div className="blog-page-wpr">

                                
                                {blogs && blogs.length > 0 ? (
                                    blogs.map((blog, index) => (
                                        <BlogCard
                                            key={index}
                                            image={blog.image}
                                            title={blog.title}
                                            description={blog.description}
                                            date={blog.date}
                                            id={blog.id}
                                        />
                                    ))
                                ) : (
                                    <p>No blog posts available.</p>
                                )}


                            </div>
                            <div className="pagination">
                                <span className="page-value current">1</span>
                                <a className="page-value" href="#">
                                    2
                                </a>
                                <a className="next page-value" href="#">
                                    <i className="ti ti-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4">
                        <aside className="sidebar">
                            {/* Category */}

                            <CategorySidebar />

                            {/* Recent Post */}
                            <div className="widget recent-post">
                                <h5 className="work-title">Recent Post</h5>
                                <div className="recent-post-single">
                                    <div className="recent-post-pic">
                                        <Image src="/assets/img/pictures/post-1.png" alt="thumb" width={80} height={80} />
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
                                        <Image src="/assets/img/pictures/post-2.png" alt="thumb" width={80} height={80} />
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
                                        <Image src="/assets/img/pictures/post-3.png" alt="thumb" width={80} height={80} />
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
                        </aside>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default CategoryBlogBody