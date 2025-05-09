'use client';
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';

function CategorySidebar() {

    const [categoryData, setCategoryData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Category Sidebar useEffect is running");
        const fetchCategory = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/blogCategoryList');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Blog_Categories.length > 0) {
                    setCategoryData(res.data.Blog_Categories);
                } else {
                    setError('No category data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load categories');
            }

        };

        fetchCategory();

    }, []);

    return (
        <div className="widget category">
            <h5 className="work-title">Category</h5>
            <div className="category-list">
                <ul>

                    {categoryData.length > 0 ? (
                        categoryData.map((item, index) => (
                            <li key={index}>
                                <Link href={`/categoryblog/${item.id}`}>
                                    <span>{item?.name || 'Unnamed Category'}</span>
                                    <i className="ti-angle-right" />
                                </Link>
                            </li>
                        ))
                    ) : (
                        <li><span>{error || "Loading..."}</span></li>
                    )}

                </ul>
            </div>
        </div>

    )
}

export default CategorySidebar