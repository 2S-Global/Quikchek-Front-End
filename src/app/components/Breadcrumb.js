
'use client';
import React from 'react';
import Link from 'next/link';

const Breadcrumb = ({ title = 'Page Title', homeText = 'Home', currentPage = 'Current Page', img }) => {
  return (
    <div
      className="site-breadcrumb"
      // style={{ background: 'url(/assets/img/pictures/breadcrumb.jpg)' }}
      style={{ backgroundImage: `url(${img})` }}
    >
      <div className="container">
        <div className="site-breadcrumb-wpr">
          <h2 className="breadcrumb-title">{title}</h2>
          <ul className="breadcrumb-menu clearfix">
            <li>
              <Link href="/">{homeText}</Link>
            </li>
            <li className="active">{currentPage}</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Breadcrumb;
