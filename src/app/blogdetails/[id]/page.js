'use client'
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader';
import Breadcrumb from '@/app/components/Breadcrumb';
import TotalSingleBlog from '@/app/components/TotalSingleBlog';
import Footer from '@/app/components/Footer';
import ScrollTop from '@/app/components/ScrollTop';
import { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'
import ServiceBox from '@/app/components/ServiceBox'

function Page({ params }) {
  const { id } = use(params)
  // const { id } = params;
  console.log({ id });

  const [blogDetails, setBlogDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    console.log("Blog Details useEffect is running");
    const fetchBlogDetails = async () => {
      try {
        const formData = new FormData();
        formData.append("blog_id", id);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getBlogDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log(res);

        if (res.data.Ack === 1 && res.data.BlogDetails) {
          setBlogDetails(res.data.BlogDetails);
        } else {
          setError('No Blog Details data found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setError('Failed to load Blog Details');
      }

    };

    fetchBlogDetails();

  }, [id]);


  // For Blog Details Banner
  const blog_id = 7;

  const [blogBanner, setBlogBanner] = useState(null);
  const [blogError, setBlogError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    console.log("Blog Banner useEffect is running");
    const fetchBlogBanner = async () => {
      try {
        const formData = new FormData();
        formData.append("page_id", blog_id);

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
          setBlogBanner(res.data.PageBannerDetails);
          console.log(blogBanner);
        } else {
          setBlogError('Blog Banner data not found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setBlogError('Failed to load Blog Banner');
      }

    };

    fetchBlogBanner();

  }, [blogBanner]);




  return (
    <>
      <ContactHeader />
      {blogBanner && (
        <Breadcrumb
          title={blogBanner.banner_title}
          homeText="Home"
          currentPage={blogBanner.banner_title}
          img={blogBanner.banner_image}
        />
      )}

      {blogDetails && (
        <TotalSingleBlog
          title={blogDetails.title}
          image={blogDetails.image}
          description={blogDetails.description}
          date={blogDetails.date}
        />
      )}
      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page