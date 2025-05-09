'use client';
import React from 'react';
import Link from 'next/link';
// 1. Define the reusable data array
const categories = [
  "Air Transportation",
  "Sea Transportation",
  "Warehouse",
  "Road Transportation",
  "Train Transportation",
];

// 2. Create a reusable component
function CategoryComp({ title = "Category", items = categories }) {
  return (
    <div className="widget category">
      <h5 className="work-title">{title}</h5>
      <div className="category-list">
        <ul>
          {items.map((item, index) => (
            <li key={index}>
              <Link href="#">
                <span>{item}</span>
                <i className="ti-angle-right" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CategorySidebar;
