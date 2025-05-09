'use client';
import React from 'react'
import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';
import Link from 'next/link';
// import Isotope from 'isotope-layout';
import imagesLoaded from 'imagesloaded';
// import dynamic from 'next/dynamic';

// Dynamically import Isotope without SSR
// const Isotope = dynamic(() => import('isotope-layout'), { ssr: false });
let Isotope = null;

function Work() {

    const isotope = useRef(null);
    const grid = useRef(null);

    const [projectCategory, setProjectCategory] = useState([]);
    const [projects, setProjects] = useState([]);
    const [allProjects, setAllProjects] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState('*');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Only run on client
        if (typeof window !== 'undefined') {
            Isotope = require('isotope-layout');
        }
    }, []);



    // useEffect(() => {
    //     if (grid.current && Isotope) {
    //         // Initialize Isotope
    //         isotope.current = new Isotope(grid.current, {
    //             itemSelector: '.filter-item',
    //             layoutMode: 'masonry',
    //         });

    //         // Wait for images to load
    //         imagesLoaded(grid.current, function () {
    //             isotope.current.layout();
    //         });
    //     }
    // }, [projects]);


    // useEffect(() => {
    //     if (grid.current && projects.length > 0) {
    //         // Wait for the DOM to render updated project cards
    //         const timeout = setTimeout(() => {
    //             imagesLoaded(grid.current, () => {
    //                 if (!isotope.current) {
    //                     isotope.current = new Isotope(grid.current, {
    //                         itemSelector: '.filter-item',
    //                         layoutMode: 'masonry',
    //                     });
    //                 } else {
    //                     isotope.current.reloadItems();
    //                     isotope.current.arrange(); // Refresh layout
    //                 }
    //             });
    //         }, 100); // slight delay ensures DOM has rendered

    //         return () => clearTimeout(timeout); // Cleanup on rerun
    //     }
    // }, [projects]);


    useEffect(() => {
        console.log("Project Category useEffect is running");
        const fetchProjectCategory = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/projectCategoryList');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Project_Categories) {
                    setProjectCategory(res.data.Project_Categories);
                } else {
                    setError('Project Category data found');
                }

            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Project Category Data');
            }

        };

        fetchProjectCategory();

    }, []);

    // Function to fetch projects for a selected category
    const fetchProjectsByCategory = async (categoryId) => {
        try {
            const formData = new FormData();
            formData.append("category_id", categoryId);

            const res = await axios.post(
                'https://2sglobal.co/staging/service/categoryWiseProjectList',
                formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );

            console.log(res);

            if (res.data.Ack === 1 && res.data.categoryWiseProjectList) {
                setProjects(res.data.categoryWiseProjectList);
            } else {
                setProjects([]);
                setError('No Projects found for this category');
            }
        } catch (err) {
            console.error('Axios error:', err);
            setError('Failed to load Projects');
        }
    };


    // Fetch all projects initially
    useEffect(() => {
        const fetchAllProjects = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfProjects');
                if (res.data.Ack === 1 && res.data.Projects) {
                    setProjects(res.data.Projects); // Display all projects initially
                    setAllProjects(res.data.Projects);
                } else {
                    setError('No projects found');
                }
            } catch (err) {
                setError('Failed to load Projects');
            }
        };

        fetchAllProjects();
    }, []);

    useEffect(() => {
        if (grid.current && projects.length > 0) {
            // Wait until images are loaded
            imagesLoaded(grid.current, () => {
                if (!isotope.current) {
                    isotope.current = new Isotope(grid.current, {
                        itemSelector: '.filter-item',
                        layoutMode: 'masonry',
                    });
                } else {
                    isotope.current.reloadItems();
                    isotope.current.arrange();
                }
            });
        }
    }, [projects]); // Trigger every time projects change



    // Button click handler
    const handleCategoryClick = (categoryId) => {
        setActiveCategoryId(categoryId);
        if (categoryId === '*') {
            setProjects([]);
            setProjects(allProjects); // Reset to show all if needed
        } else {
            fetchProjectsByCategory(categoryId);
        }
    };

    return (
        <div className="project-area pos-rel de-padding">
            <div className="container">
                <div className="row mb-60 align-items-center">
                    <div className="col-xl-5 col-lg-4">
                        <div className="site-title mb-0">
                            <span className="hero-sub-title mb-20">Latest Project</span>
                            <h2 className="heading-1 mb-0">
                                Explore recent <br /> projects
                            </h2>
                        </div>
                    </div>
                    <div className="col-xl-7 col-lg-8">
                        <div className="sec-btn-area text-right">
                            <div className="filter-menu-style-1 filter-menu-active">
                                <button
                                    className={activeCategoryId === '*' ? 'active' : ''}
                                    onClick={() => handleCategoryClick('*')}
                                    data-filter="*"
                                >
                                    All
                                </button>



                                {projectCategory.map((project) => (
                                    <button
                                        key={project.id}
                                        onClick={() => handleCategoryClick(project.id)}
                                        className={activeCategoryId === project.id ? 'active' : ''}
                                        data-filter={`.cat-${project.id}`}
                                    >
                                        {project.name}
                                    </button>
                                ))}

                                {/* <button data-filter=".cat-1">Business</button>
                                <button data-filter=".cat-2">Consult</button>
                                <button data-filter=".cat-3">Design</button> */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container">
                <div className="row g-5 filter-active project-page magnific-mix-gallery" ref={grid}>




                    {projects.map((post, index) => (
                        <div
                            key={index}
                            className={`col-md-12 col-lg-4  filter-item cat-${post.id} ${post.category_ids?.map(catId => `cat-${catId}`).join(' ')}`}
                        >
                            <div className="project-card image-scale-hover">
                                <div className="project-img">
                                    <img
                                        src={post.image}   // Make sure `post.image` is the correct API field
                                        alt="project Image"
                                        className="pw"
                                    />
                                    <div className="port-overlay">
                                        <div className="port-desc">
                                            <div className="port-links">
                                                <Link
                                                    href={post.image}
                                                    className="item popup-link port-link"
                                                >
                                                    <i className="ti ti-fullscreen" />
                                                </Link>
                                            </div>
                                            <div className="port-content">
                                                <Link href={`/projectsingle/${post.id}`}>
                                                    <h4>{post.title}</h4>
                                                </Link>
                                                <span className="port-kk">
                                                    {post.category_names?.join(', ')}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}





                    {/* <div className={`col-md-12 col-lg-4 col-xxl-auto filter-item cat-${id}`}>
                        <div className="project-card image-scale-hover">
                        {projects.map((post, index) => (
                        <ProjectCard
                            key={index}
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            id={post.id}
                        />
                    ))}
                        </div>
                    </div> */}




                    {/* {projects.map((post, index) => (
                        <ProjectCard
                            key={index}
                            image={post.image}
                            title={post.title}
                            description={post.description}
                            category={post.category}
                            id={post.id}
                        />
                    ))} */}


                    {/* <div className="col-md-12 col-lg-4 col-xxl-auto filter-item cat-2 cat-3">
                        <div className="project-card image-scale-hover">
                            <div className="project-img">
                                <img
                                    src="/assets/img/pictures/w-1.jpg"
                                    alt="project Image"
                                    className="pw"
                                />
                                <div className="port-overlay">
                                    <div className="port-desc">
                                        <div className="port-links">
                                            <a
                                                href="assets/img/pictures/w-1.jpg"
                                                className="item popup-link port-link"
                                            >
                                                <i className="ti ti-fullscreen" />
                                            </a>
                                        </div>
                                        <div className="port-content">
                                            <a href="project-single.html">
                                                <h4>Business Consult</h4>
                                            </a>
                                            <span className="port-kk">Business, Financial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 col-xxl-auto filter-item cat-1 cat-2 cat-3">
                        <div className="project-card image-scale-hover">
                            <div className="project-img">
                                <img
                                    src="/assets/img/pictures/w-5.jpg"
                                    alt="project Image"
                                    className="pw"
                                />
                                <div className="port-overlay">
                                    <div className="port-desc">
                                        <div className="port-links">
                                            <a
                                                href="assets/img/pictures/w-5.jpg"
                                                className="item popup-link port-link"
                                            >
                                                <i className="ti ti-fullscreen" />
                                            </a>
                                        </div>
                                        <div className="port-content">
                                            <a href="project-single.html">
                                                <h4>Business Consult</h4>
                                            </a>
                                            <span className="port-kk">Business, Financial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 col-xxl-auto filter-item cat-1">
                        <div className="project-card image-scale-hover">
                            <div className="project-img">
                                <img
                                    src="/assets/img/pictures/w-3.jpg"
                                    alt="project Image"
                                    className="pw"
                                />
                                <div className="port-overlay">
                                    <div className="port-desc">
                                        <div className="port-links">
                                            <a
                                                href="assets/img/pictures/w-3.jpg"
                                                className="item popup-link port-link"
                                            >
                                                <i className="ti ti-fullscreen" />
                                            </a>
                                        </div>
                                        <div className="port-content">
                                            <a href="project-single.html">
                                                <h4>Business Consult</h4>
                                            </a>
                                            <span className="port-kk">Business, Financial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 col-xxl-auto filter-item cat-2">
                        <div className="project-card image-scale-hover">
                            <div className="project-img">
                                <img
                                    src="/assets/img/pictures/w-2.jpg"
                                    alt="project Image"
                                    className="pw"
                                />
                                <div className="port-overlay">
                                    <div className="port-desc">
                                        <div className="port-links">
                                            <a
                                                href="assets/img/pictures/w-2.jpg"
                                                className="item popup-link port-link"
                                            >
                                                <i className="ti ti-fullscreen" />
                                            </a>
                                        </div>
                                        <div className="port-content">
                                            <a href="project-single.html">
                                                <h4>Business Consult</h4>
                                            </a>
                                            <span className="port-kk">Business, Financial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-12 col-lg-4 col-xxl-auto filter-item cat-3">
                        <div className="project-card image-scale-hover">
                            <div className="project-img">
                                <img
                                    src="/assets/img/pictures/w-4.jpg"
                                    alt="project Image"
                                    className="pw"
                                />
                                <div className="port-overlay">
                                    <div className="port-desc">
                                        <div className="port-links">
                                            <a
                                                href="assets/img/pictures/w-4.jpg"
                                                className="item popup-link port-link"
                                            >
                                                <i className="ti ti-fullscreen" />
                                            </a>
                                        </div>
                                        <div className="port-content">
                                            <a href="project-single.html">
                                                <h4>Business Consult</h4>
                                            </a>
                                            <span className="port-kk">Business, Financial</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div> */}
                </div>
            </div>
        </div>

    )
}

export default Work