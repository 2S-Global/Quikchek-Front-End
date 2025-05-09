import React from 'react'
import ContactHeader from '../components/ContactHeader';
import Breadcrumb from '../components/Breadcrumb';
import PlanPricing from '../components/PlanPricing';
import PricingCard from '../components/PricingCard';
import Pricingcardtable from '../components/Pricingcardtable';
import Footer from '../components/Footer';
import ScrollTop from '../components/ScrollTop';

function Page() {

    console.log("Hello there");

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
        <>
            <ContactHeader />
            <Breadcrumb
                title="Pricing Table"
                homeText="Home"
                currentPage="Pricing Table"
            />

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

            <Footer />
            <ScrollTop />

        </>
    )
}

export default Page