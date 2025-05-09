import React from 'react'
import Link from 'next/link'


function CaseStudyCard({ image, title, description, pdf, id }) {
    return (
        <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Image on top */}
            <div className="position-relative">
                <img
                    src={image}
                    alt={title}
                    className="w-100"
                    style={{ height: '220px', objectFit: 'cover' }}
                />
            </div>

            {/* Card body */}
            <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold mb-3" style={{minHeight:'50px'}}>{title}</h5>
                <Link
                    href={`/casestudydetails/${id}`}
                    className="btn"
                    style={{
                        backgroundColor: '#c40000',     
                        color: 'white',                 
                        fontWeight: 'bold',             
                        padding: '10px 24px',           
                        borderRadius: '6px',            
                        textAlign: 'center',
                        textDecoration: 'none',
                        display: 'inline-block',
                        alignSelf: 'flex-start'         
                    }}
                >
                    View Details
                </Link>

            </div>
        </div>
    )
}

export default CaseStudyCard