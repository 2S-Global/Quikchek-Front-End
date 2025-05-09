'use client'
import React from 'react'
import ContactHeader from '@/app/components/ContactHeader';
import Breadcrumb from '@/app/components/Breadcrumb';
import Blogdesc from '@/app/components/BlogDesc';
import Footer from '../../components/Footer';
import ScrollTop from '../../components/ScrollTop';
import { useEffect, useState } from 'react'
import { use } from 'react'
import axios from 'axios'
import CategoryBlogBody from '@/app/components/CategoryBlogBody';

function Page({ params }) {
  const { id } = use(params)
  console.log({ id });


  const [categoryWiseBlog, setCategoryWiseBlog] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    console.log("Category Wise Blog Details useEffect is running");
    const fetchCategoryWiseBlog = async () => {
      try {
        const formData = new FormData();
        formData.append("category_id", id);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/categoryWiseBlogList',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        );

        console.log(res);

        if (res.data.Ack === 1 && res.data.categoryWiseBlogList) {
          setCategoryWiseBlog(res.data.categoryWiseBlogList);
        } else {
          setError('No CategoryWiseBlog Details data found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setError('Failed to load CategoryWiseBlog Details');
      }

    };

    fetchCategoryWiseBlog();

  }, [id]);


  // For Category Wise Blog Details Banner
  const category_blog_id = 9;

  const [categoryBlogBanner, setCategoryBlogBanner] = useState(null);
  const [categoryBlogError, setCategoryBlogError] = useState(null);

  useEffect(() => {
    // if (!id) return;
    console.log("Category Blog Banner useEffect is running");
    const fetchCategoryBlog = async () => {
      try {
        const formData = new FormData();
        formData.append("page_id", category_blog_id);

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
          setCategoryBlogBanner(res.data.PageBannerDetails);
          console.log(categoryBlogBanner);
        } else {
          setCategoryBlogError('Category Blog Banner data not found');
        }
      } catch (err) {
        console.error('Axios error:', err);
        setCategoryBlogError('Failed to load Category Blog Banner');
      }

    };

    fetchCategoryBlog();

  }, [categoryBlogBanner]);




  return (
    <>
      <ContactHeader />

      {categoryBlogBanner && (
        <Breadcrumb
          title={categoryBlogBanner.banner_title}
          homeText="Home"
          currentPage={categoryBlogBanner.banner_title}
          img={categoryBlogBanner.banner_image}
        />
      )}



      {categoryWiseBlog.length > 0 ? (
        <CategoryBlogBody blogs={categoryWiseBlog} />
      ) : error ? (
        <p style={{ color: 'red' }}>{error}</p>
      ) : (
        <p>Loading blog data...</p>
      )}

      <Footer />
      <ScrollTop />
    </>
  )
}

export default Page