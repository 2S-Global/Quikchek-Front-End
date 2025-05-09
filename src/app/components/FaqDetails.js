import React from 'react'

function FaqDetails({ item, index }) {

    const headingId = `heading${index}`;
    const collapseId = `collapse${index}`;


    return (
        <div className="accordion-item">
            <h2 className="accordion-header" id={headingId}>
                <button
                    className={`accordion-button ${index !== 0 ? "collapsed" : ""}`}
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#${collapseId}`}
                    aria-expanded={index === 0 ? "true" : "false"}
                    aria-controls={collapseId}
                >
                    {item.title}
                </button>
            </h2>
            <div
                id={collapseId}
                className={`accordion-collapse collapse ${index === 0 ? "show" : ""}`}
                aria-labelledby={headingId}
                data-bs-parent="#accordionExample"
            >
                <div className="accordion-body">
                    <p className="mb-0">{item.description}</p>
                </div>
            </div>
        </div>
    )
}

export default FaqDetails