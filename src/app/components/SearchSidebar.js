import React from 'react'

function SearchSidebar() {
    return (
        <div className="widget search">
            <h5 className="work-title">Search</h5>
            <form className="search-form">
                <input type="text" className="input-style-2" placeholder="Search" />
                <button className="btn-sub">
                    <i className="icofont-search" />
                </button>
            </form>
        </div>

    )
}

export default SearchSidebar