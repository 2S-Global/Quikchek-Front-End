import React from 'react'
import Link from 'next/link'
import './SingleProjectBody.css';

function CaseStudyDesc({ title, image, description, pdf }) {
  return (
    <div className="project-body-wrapper">
      <div className="project-card">
        <img src={image} alt={title} style={{ minHeight: '250px', maxHeight: '250px', width: '40%', objectFit: 'cover' }} />
        <div className="project-content">
          <h2 className="project-title" style={{ fontWeight: '900' }}>{title}</h2>
          <p className="project-description" dangerouslySetInnerHTML={{ __html: description }}></p>

          <Link
            href={pdf}
            download
            className="btn-1 btn-md"
            style={{
              backgroundColor: '#c40000',      // Deep red
              color: 'white',                  // White text
              fontWeight: 'bold',              // Bold font
              padding: '10px 20px',            // Medium padding
              borderRadius: '6px',             // Rounded corners
              textAlign: 'center',
              textDecoration: 'none',
              display: 'inline-block',
              padding: '2rem 5.4rem',
              width: '225px'
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Download PDF
          </Link>

        </div>
      </div>
    </div>
  )
}

export default CaseStudyDesc