'use client';
import React from 'react';
import Link from 'next/link';

const TeamCard = ({ image, role, name, facebook, instagram, twitter, youtube }) => {
  return (
    <div className="team-box">
      <div className="team-pic">
        <img src={image} alt="no image" className="team-main-pic" />
        <img src="/assets/img/shape/team-shape-btm.png" className="team-shape-btm" alt="no image" />
        <i className="fal fa-plus pls"></i>
        <ul className="team-social">
          <li><Link href="#"><i className="fab fa-facebook-f"></i></Link></li>
          <li><Link href="#"><i className="fab fa-instagram"></i></Link></li>
          <li><Link href="#"><i className="fab fa-twitter"></i></Link></li>
          <li><Link href="#"><i className="fab fa-youtube"></i></Link></li>
        </ul>
      </div>
      <div className="team-desc">
        <span>{role}</span>
        <h4 className="heading-4">{name}</h4>
      </div>
    </div>
  );
};

export default TeamCard;
