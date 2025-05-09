import React from 'react'
import Link from 'next/link';

function ScrollTop() {
    return (
        <Link href="#bdy" id="scrtop" className="smooth-menu">
            <i className="ti-arrow-up" />
        </Link>
    )
}

export default ScrollTop