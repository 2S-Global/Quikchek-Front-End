import React from 'react'
import PricingCard from './PricingCard';
import Pricingcardtable from './Pricingcardtable';

function PlanPricing() {
    console.log("Hello");

    const plans = [
        {
            title: "Basic",
            price: 19,
            billing: "Monthly",
            link: "contact.html",
            features: [
                "Create Unique Websites",
                "Automate Your Busy Work",
                "Optimize All Your Efforts",
                "Centralized Teams",
                "Shareable Team Libraries",
            ],
        },
        {
            title: "Advanced",
            price: 39,
            billing: "Monthly",
            link: "contact.html",
            features: [
                "Create Unique Websites",
                "Automate Your Busy Work",
                "Optimize All Your Efforts",
                "Centralized Teams",
                "Shareable Team Libraries",
            ],
        },
        {
            title: "Premium",
            price: 49,
            billing: "Monthly",
            link: "contact.html",
            features: [
                "Create Unique Websites",
                "Automate Your Busy Work",
                "Optimize All Your Efforts",
                "Centralized Teams",
                "Shareable Team Libraries",
            ],
        },
    ];

    return (
        <div className="price-area de-padding">
            <div className="container">
                <div className="row">
                    <div className="col-lg-8 offset-lg-2">
                        <div className="site-title text-center">
                            <p className="hero-sub-title text-second">Our pricing</p>
                            <h2 className="up-title mb-30">
                                Choose the best plan <br /> for your business
                            </h2>
                            <p className="mb-0">
                                Fusce scelerisque urna ac risus finibus, non hendrerit libero
                                dictum. Sed aliquam, nibh ultricies imperdiet bibendum, tellus neque
                                molesteemauris, eu fringilla neque turpis maximus risus. Aliquam
                                lobortis urna eros.
                            </p>
                        </div>
                    </div>
                </div>
                <div className="price-wpr grid-3">

                    {plans.map((post, index) => (
                        <PricingCard
                            key={index}
                            title={post.title}
                            price={post.price}
                            billing={post.billing}
                            features={post.features}
                            link={post.link}
                        />
                    ))}


                </div>
            </div>
        </div>

    )
}

export default PlanPricing