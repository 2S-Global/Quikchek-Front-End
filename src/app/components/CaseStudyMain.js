'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import CaseStudyCard from './CaseStudyCard'

function CaseStudyMain() {

    const [caseStudies, setCaseStudies] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Case Studies useEffect is running");
        const fetchCaseStudies = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfCaseStudies');
                console.log(res);
                if (res.data.Ack === 1 && res.data.CaseStudies.length > 0) {
                    setCaseStudies(res.data.CaseStudies);
                } else {
                    setError('No Case Studies data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Case Studies Data');
            }

        };

        fetchCaseStudies();

    }, []);


    return (
        <div className="blog-area de-padding">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-12">
                        <div className="blog-page-content pr-30">
                            <div className="blog-page-wpr">
                                {caseStudies.length > 0 ? (
                                    <div className="row g-4">
                                        {caseStudies.map((post, index) => (
                                            <div className="col-md-4" key={index}>
                                                <CaseStudyCard
                                                    image={post.image}
                                                    title={post.title}
                                                    description={post.description}
                                                    pdf={post.pdf}
                                                    id={post.id}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>{error || 'Loading...'}</p>
                                )}
                            </div>

                            {/* Simple pagination placeholder */}
                            <div className="pagination mt-4">
                                <span className="page-value current">1</span>
                                <a className="page-value" href="#">2</a>
                                <a className="next page-value" href="#">
                                    <i className="ti ti-arrow-right" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseStudyMain