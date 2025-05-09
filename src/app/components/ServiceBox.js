import React from 'react'
import Link from 'next/link';

function ServiceBox({ icon, title, description, id }) {
    return (
        <div className="service-box-2">
            <div className="service-icon-2">
                <i className={icon}>
                    <span></span>
                </i>
            </div>
            <div className="service-desc-2">
                <Link href={`/servicedetails/${id}`}>
                    <h4 className="heading-4">{title}</h4>
                </Link>
                {/* <p className="project-description" dangerouslySetInnerHTML={{ __html: description }}></p> */}
                <p dangerouslySetInnerHTML={{ __html: description }}></p>
            </div>
        </div>
    )
}

export default ServiceBox