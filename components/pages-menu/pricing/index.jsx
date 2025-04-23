const index = () => {
  return (
    <>
      <section className="pricing-section py-10 bg-gray-100">
        <div className="auto-container max-w-3xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-4">QuikChek Pricing</h1>
          <p className="mb-4">
            QuikChek offers flexible and dynamic pricing based on the type and
            volume of KYC verification services required.
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>
              Pricing depends on the verification type (Basic, Enhanced, etc.).
            </li>
            <li>Discounts may apply for bulk or enterprise-level requests.</li>
            <li>
              The final amount is shown before you make a payment via Razorpay.
            </li>
          </ul>
          <p className="mb-4">
            For an accurate price, please use our platform to begin the
            verification process. You'll see a detailed charge summary before
            completing your payment.
          </p>
          <p>
            For custom pricing or enterprise inquiries, feel free to contact us
            at{" "}
            <a
              href="mailto:info@geisil.com"
              className="text-blue-600 underline"
            >
              info@geisil.com
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
};

export default index;
