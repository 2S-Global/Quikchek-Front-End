import React from 'react'

function Singleblog({ title, image, description, date }) {
  return (
    <div className="theme-single blog-single">
      <div className="theme-pic">
        <img src={image} className="big-pic" alt="thumb" />
      </div>
      <div className="theme-info p-50">
        <div className="theme-desc">
          <div className="theme-meta">
            <div className="theme-meta-left">
              <ul>
                <li>
                  <i className="fas fa-user" />
                  {date || 'Date not available'}
                </li>
              </ul>
            </div>
          </div>
          <h2 className="heading-2">
            {title}
          </h2>
          <p
            className="mb-30"
            dangerouslySetInnerHTML={{ __html: description || "" }}
          ></p>
        </div>
      </div>
    </div>

  )
}

export default Singleblog