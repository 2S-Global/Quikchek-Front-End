'use client';
import React from 'react'
import Image from 'next/image'
import { useState, useEffect } from 'react';
import axios from 'axios';
import TeamCard from './TeamCard';

function Ourexperts() {

    const [teamData, setTeamData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        console.log("Team People useEffect is running");
        const fetchTeam = async () => {
            try {
                const res = await axios.post('https://2sglobal.co/staging/service/teamList');
                console.log(res);
                if (res.data.Ack === 1 && res.data.Team.length > 0) {
                    setTeamData(res.data.Team);
                } else {
                    setError('No Team data found');
                }
            } catch (err) {
                console.error('Axios error:', err);
                setError('Failed to load Team People Data');
            }

        };

        fetchTeam();

    }, []);


    return (
        <div className="team-area de-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-title text-center">
                            <p className="hero-sub-title">Our Experts</p>
                            <div className="site-title-shape text-center mb-4">
                                <img src="/assets/img/shape/site-title-shape.png" alt="no image" />
                            </div>
                            <h2 className="up-title mb-0">We have skilled people</h2>
                        </div>
                    </div>
                </div>
                <div className="team-wpr grid-4">
                    {teamData.map((member, index) => (
                        <TeamCard
                            key={index}
                            image={member.image}
                            role={member.designation}
                            name={member.name}

                        />
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Ourexperts