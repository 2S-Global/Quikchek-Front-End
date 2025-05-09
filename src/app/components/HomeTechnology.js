import React from 'react';
import styles from './HomeTechnology.module.css';

function HomeTechnology() {
    return (
        <section className={styles['tech-stack']}>
            <h2 className={styles['tech-stack-title']} style={{fontSize: '4rem'}}>Our Technology Stack</h2>

            <div className={styles['tech-icons']}>
                <div className={styles['tech-item']}>
                    <i className="fab fa-html5" />
                    <span>HTML5</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-css3-alt" />
                    <span>CSS3</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-js-square" />
                    <span>JavaScript</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-react" />
                    <span>React</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-node-js" />
                    <span>Node.js</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-php" />
                    <span>PHP</span>
                </div>
                <div className={styles['tech-item']}>
                    <i className="fab fa-python" />
                    <span>Python</span>
                </div>
            </div>
        </section>
    );
}

export default HomeTechnology;
