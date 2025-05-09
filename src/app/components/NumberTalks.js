'use client';
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Link from 'next/link';

function NumberTalks({ className = '' }) {

    const [numberTalks, setNumberTalks] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Number Talks useEffect is running");
        const fetchNumberTalks = async () => {
            try {
                const formData = new FormData();
                formData.append("field", "number_talks");

                const res = await axios.post(
                    'https://2sglobal.co/staging/service/getHomeSettings',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'multipart/form-data'
                        }
                    }
                );

                console.log(res);

                if (res.data.Ack === 1 && res.data.HomeSettings) {
                    setNumberTalks(res.data.HomeSettings);
                } else {
                    setError('No NumberTalks Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load NumberTalks Content Details');
            }

        };

        fetchNumberTalks();

    }, []);

    if (error) return <p>{error}</p>;
    if (!numberTalks) return <p>Loading...</p>;


    return (
        <div className={`counter-area ${className}`}>
            <div className="container">
                <div className="counter-wpr">
                    <div className="row">
                        <div className="col-xl-6">
                            <div className="counter-counter element-center">
                                <div className="counter-1 grid-2">
                                    <div className="counter-left element-center">
                                        <div className="fun-fact fun-fact-clr-1">
                                            <div className="counter">
                                                <div className="timer" data-to={98} data-speed={2000} />
                                                <div className="operator">%</div>
                                            </div>
                                            <span className="medium">Business Hike</span>
                                        </div>
                                    </div>
                                    <div className="counter-right">
                                        <div className="fun-fact fun-fact-clr-2 mb-30">
                                            <div className="counter">
                                                <div className="timer" data-to={788} data-speed={2000} />
                                                <div className="operator">K</div>
                                            </div>
                                            <span className="medium">Sales of our Products</span>
                                        </div>
                                        <div className="fun-fact fun-fact-clr-3">
                                            <div className="counter">
                                                <div className="timer" data-to={150} data-speed={2000} />
                                                <div className="operator">M</div>
                                            </div>
                                            <span className="medium">Happy clients</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6">
                            <div className="counter-title">

                                <div
                                    dangerouslySetInnerHTML={{ __html: numberTalks.number_talks }}
                                />

                                {/* <span className="hero-sub-title mb-20">
                                    <span className="hero-line" />
                                    Number Talks
                                </span>
                                <h2 className="heading-1 mb-30">
                                    Providing assistance <br /> since 1959
                                </h2>
                                <p>
                                    ice cream muffin I love candy canes tootsie roll brownie wafer
                                    lollipop. Dessert I love I love apple pie brownie icing. Cake
                                    candy I love dessert I love jelly apple pie bonbon toffee.
                                    Shortbread gingerbread shortbread dragée jujubes I love dessert
                                    jelly Cupcake halvah pudding candy gummi bears liquorice chocolate
                                    cake biscuit tootsie roll.
                                </p>
                                <p className="mb-30">
                                    ice cream muffin I love candy canes tootsie roll brownie wafer
                                    lollipop. Dessert I love I love apple pie brownie icing. Cake
                                    candy I love dessert I love jelly gummi bears. Macaroon jelly
                                    chocolate I love lollipop chocolate.
                                </p> */}


                                <Link
                                    href="/service"
                                    className="btn-1 btn-circle btn-md btn-black"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default NumberTalks