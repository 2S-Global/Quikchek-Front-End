import React from 'react'
import styles from './OfficeLocationCard.module.css';
import Link from 'next/link';

function TestingDummy({ imageSrc, country, addressLines }) {
    return (
        <div className="service-box-2" style={{paddingTop: '8px'}}>
            <div className="">
                <div className={styles.imageWrapper}>
                    <img src={imageSrc} alt="" className={styles.image} />
                </div>
            </div>
            <div className="service-desc-2">
                <Link href="">
                    <h4 className="heading-4">{country}</h4>
                </Link>
                <p>{addressLines}</p>
            </div>
        </div>
    )
}

export default TestingDummy