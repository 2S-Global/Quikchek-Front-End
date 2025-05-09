'use client';
import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'

function Solve() {


    const [problemSolving, setProblemSolving] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Problem Solving useEffect is running");
        const fetchProblemSolving = async () => {
            try {
                const formData = new FormData();
                formData.append("field", "problem_solving");

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
                    setProblemSolving(res.data.HomeSettings);
                } else {
                    setError('No Problem Solving Details data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Problem Solving Content Details');
            }

        };

        fetchProblemSolving();

    }, []);

    if (error) return <p>{error}</p>;
    if (!problemSolving) return <p>Loading...</p>;

    // Now it's safe to split
    // const contentLines = problemSolving.problem_solving_content
    //     .split('\n')
    //     .filter(line => line.trim() !== '');

    // console.log(contentLines);


    return (
        <div className="solve-area pos-rel bg-black overflow-hidden de-padding">
            <span className="solve-circle" />
            <span className="solve-rang" />
            <div className="container">
                <div className="solve-wpr grid-2">
                    <div className="solve-left">
                        <div className="solve-left-pic overflow-hidden pos-rel">
                            <img
                                src={problemSolving.problem_solving_img}
                                className="solve-main-pic"
                                alt="no image"
                            />
                        </div>
                    </div>
                    <div className="solve-right solve-text-white pl-60">

                        <div
                            style={{ color: 'white' }}
                            dangerouslySetInnerHTML={{
                                __html: problemSolving.problem_solving_content
                                .replace(/<h1>/g, '<h1 class="heading-1">')
                                .replace(/<h2>/g, '<h2 class="heading-1">')
                            }}
                        />

                        {/* <span className="hero-sub-title">{contentLines[0]}</span>
                        <h2 className="heading-1">
                            {contentLines[1]}
                        </h2>
                        <p>
                            {contentLines[2]}
                        </p>
                        <div className="solve-opt-wpr">
                            <div className="solve-opt-single">
                                <div className="solve-opt-text">
                                    <h4 className="heading-4"> {contentLines[3]}</h4>
                                    <p className="mb-0">
                                        {contentLines[4]}
                                    </p>
                                </div>
                                <div className="solve-opt-icon">
                                    <i className="fal fa-arrow-up" />
                                </div>
                            </div>
                            <div className="solve-opt-single">
                                <div className="solve-opt-text">
                                    <h4 className="heading-4">{contentLines[5]}</h4>
                                    <p className="mb-0">
                                        {contentLines[6]}
                                    </p>
                                </div>
                                <div className="solve-opt-icon">
                                    <i className="fal fa-arrow-up" />
                                </div>
                            </div>
                        </div> */}



                    </div>
                </div>
            </div>
        </div>

    )
}

export default Solve