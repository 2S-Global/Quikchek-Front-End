'use client';
import React from 'react'
import BlogCard from './BlogCard';
import Image from 'next/image';
import CategorySidebar from './CategorySidebar';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
function Blogdesc() {

  const [blogPosts, setBlogPosts] = useState([]);
  const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Blog Posts useEffect is running");
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
        <div className="row g-5">
          <div className="col-xl-8">
            <div className="blog-page-content pr-30">
              <div className="blog-page-wpr">
                {blogPosts.map((post, index) => (
                  <BlogCard
                    key={index}
                    image={post.image}
                    title={post.title}
                    description ={post.short_desc}
                    date={post.date}
                    id={post.id}
                  />
                ))}
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

export default Blogdesc