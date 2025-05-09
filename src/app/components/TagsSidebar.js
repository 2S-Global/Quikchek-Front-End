import React from 'react'
import Link from 'next/link';

function TagsSidebar() {
    return (
        <div className="widget sidebar-tags">
            <h5 className="work-title">Tags</h5>
            <div className="tags">
                <Link href="#" className="tags-link">
                    Web Development
                </Link>
                <Link href="#" className="tags-link">
                    wordpress
                </Link>
                <Link href="#" className="tags-link">
                    Mobile Apps
                </Link>
                <Link href="#" className="tags-link">
                    Admon Pannel
                </Link>
                <Link href="#" className="tags-link">
                    HTML Css
                </Link>
                <Link href="#" className="tags-link">
                    Laravels
                </Link>
            </div>
        </div>

    )
}

export default TagsSidebar