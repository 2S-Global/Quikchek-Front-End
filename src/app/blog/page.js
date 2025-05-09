'use client'
import { useState, useEffect } from 'react';
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader';
import Breadcrumb from '@/app/components/Breadcrumb';
import Blogdesc from '@/app/components/BlogDesc';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';
import axios from 'axios';

function Page() {

  const id = 5;
  // const { id } = params;
  console.log(id);

  const [blogList, setBlogList] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    console.log("Blog List useEffect is running");
    const fetchBlogList = async () => {
      try {
        const formData = new FormData();
        formData.append("page_id", id);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getPageBannerDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log(res);

        if (res.data.Ack === 1 && res.data.PageBannerDetails) {
          setBlogList(res.data.PageBannerDetails);
          console.log(blogList);
        } else {
          setError('Blog List data found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setError('Failed to load Blog List');
      }

    };

    fetchBlogList();

  }, [blogList]);

  return (
    <>
      <ContactHeader />
      {blogList && (
        <Breadcrumb
          title={blogList.banner_title}
          homeText="Home"
          currentPage={blogList.banner_title}
          img={blogList.banner_image}
        />
      )}
      <Blogdesc />
      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page