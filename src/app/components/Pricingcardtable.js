import React from 'react'
import PricingCard from './PricingCard';

const Pricingcardtable = () => {

    console.log("Pricing card table");

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

export default Pricingcardtable