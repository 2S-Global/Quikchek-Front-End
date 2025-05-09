import React from 'react'
import Link from 'next/link'

function AssociateComCard({ image, title, description, pdf, id }) {
    return (
        <div className="card h-100 border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Image on top */}
            <div className="position-relative" style={{ height: '217px', overflow: 'hidden', padding: '25px', textAlign: 'center' }}>
                <img
                    src={image}
                    alt={title}
                    className=""
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* Card body */}
            <div className="card-body d-flex flex-column p-4">
                <h5 className="card-title fw-bold mb-3" style={{ minHeight: '20px', textAlign: 'center' }}>{title}</h5>
                {/* <Link
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
                </Link> */}

                {/* <p className="blog-text" dangerouslySetInnerHTML={{ __html: description }}>
                </p> */}

                <p className="blog-text" >{description}</p>

            </div>
        </div>
    )
}

export default AssociateComCard