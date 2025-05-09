import React from 'react'
import Link from 'next/link';

function ProjectCard({ image, title, description, category, id }) {


    return (


        <div className="project-img">
            <img
                src={image}
                alt="project Image"
                className="pw"
            />
            <div className="port-overlay">
                <div className="port-desc">
                    <div className="port-links">
                        <Link
                            href="/"
                            className="item popup-link port-link"
                        >
                            <i className="ti ti-fullscreen" />
                        </Link>
                    </div>
                    <div className="port-content">
                        <Link href="/">
                            <h4>{title}</h4>
                        </Link>
                        <span className="port-kk">{category}</span>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default ProjectCard