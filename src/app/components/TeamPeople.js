'use client';
import React from 'react'
import TeamCard from './TeamCard';
import { useState, useEffect } from 'react';
import axios from 'axios';


function TeamPeople() {

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


    // const teamData = [
    //     {
    //         image: 'assets/img/vector/team-1.png',
    //         role: 'FOUNDER',
    //         name: 'Harry Abraham',
    //     },
    //     {
    //         image: 'assets/img/vector/team-2.png',
    //         role: 'CEO',
    //         name: 'Munir Anchor',
    //     },
    //     {
    //         image: 'assets/img/vector/team-3.png',
    //         role: 'CONSULTANT',
    //         name: 'Robert Johnson',
    //     },
    //     {
    //         image: 'assets/img/vector/team-4.png',
    //         role: 'MARKETER',
    //         name: 'Jenelia Orkid',
    //     },
    // ];



    return (
        <div className="team-area de-padding">
            <div className="container">
                <div className="team-wpr grid-4">

                    {teamData.map((member, index) => (
                        <TeamCard
                            key={index}
                            image={member.image}
                            role={member.designation}
                            name={member.name}

                        />
                        // <TeamCard key={index} {...member} />
                    ))}

                </div>
            </div>
        </div>

    )
}

export default TeamPeople