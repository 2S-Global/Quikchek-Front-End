import React from 'react';
import Link from 'next/link';

const PricingCard = ({ title, price, billing, features, link }) => {
  return (
    <div className="price-box">
      <div className="price-box-content">
        <img
          src="/assets/img/shape/price-1.png"
          alt="no image"
          className="price-1"
        />
        <img
          src="/assets/img/shape/price-2.png"
          alt="no image"
          className="price-2"
        />
        <div className="price-up">
          <p>{title}</p>
          <h2 className="heading-1">
            <sup>$</sup>{price}<span>/ {billing}</span>
          </h2>
        </div>
        <ul className="price-list">
          {features.map((feature, index) => (
            <li key={index}>
              <i className="icofont-check-alt" />
              {feature}
            </li>
          ))}
        </ul>
        <div className="price-bottom">
          <Link href={link} className="price-btn">
            Get Started <i className="icofont-rounded-double-right" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PricingCard;
