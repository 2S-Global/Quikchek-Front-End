'use client'
import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Link from 'next/link'
import CaseStudyCard from './CaseStudyCard'
import AssociateComCard from './AssociateComCard'

function AssociateComDetails() {

    const [associateCom, setAssociateCom] = useState([]);
    const [associateComError, setAssociateComError] = useState(null);

    useEffect(() => {
        console.log("Associate Companies useEffect is running");
        const fetchAssociateCom = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/listOfAssociateCompanies');
                console.log(res);
                if (res.data.Ack === 1 && res.data.AssociateCompanies.length > 0) {
                    setAssociateCom(res.data.AssociateCompanies);
                } else {
                    setError('No Associate Companies data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Associate Companies Data');
            }

        };

        fetchAssociateCom();

    }, []);

    return (
        <div className="blog-area de-padding">
            <div className="container">
                <div className="row g-5">
                    <div className="col-xl-12">
                        <div className="blog-page-content pr-30">
                            <div className="blog-page-wpr">
                                {associateCom.length > 0 ? (
                                    <div className="row g-4">
                                        {associateCom.map((post, index) => (
                                            <div className="col-md-6" key={index}>
                                                <AssociateComCard
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
                                    <p>{associateComError || 'Loading...'}</p>
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

export default AssociateComDetails