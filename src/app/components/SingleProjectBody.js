import React from 'react';
import './SingleProjectBody.css'; 

function SingleProjectBody({ title, image, description }) {
    return (
        <div className="project-body-wrapper">
            <div className="project-card">
                <img src={image} alt={title} className="project-image" />
                <div className="project-content">
                    <h2 className="project-title" style={{fontWeight: '900'}}>{title}</h2>
                    <p className="project-description">{description}</p>
                </div>
            </div>
        </div>
    );
}

export default SingleProjectBody;
