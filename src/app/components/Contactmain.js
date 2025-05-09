'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image'; // Import Next.js Image component
import axios from 'axios';
import Breadcrumb from './Breadcrumb';
import ActualOfficeAddress from './ActualOfficeAddress';
import styles from './OfficeLocationCard.module.css';
import Radiostyles from './RadioButtonDesign.module.css';
import Chromestyles from './ChromeStyles.module.css';
// import MapComponent from './Map';

import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('./Map').then(mod => mod.default), { ssr: false });


function Contactmain() {
  const contactId = 6; // Hardcoded page ID for banner
  const [contactDetails, setContactDetails] = useState(null);
  const [contactBanner, setContactBanner] = useState(null);
  const [contactDetailsError, setContactDetailsError] = useState(null);
  const [contactBannerError, setContactBannerError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState('usa'); // Default to 'usa'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const countries = [
    { code: 'india', label: 'India', flag: '/country/flag-india.png' },
    { code: 'usa', label: 'USA', flag: '/country/united-states.png' },
    { code: 'uk', label: 'UK', flag: '/country/united-kingdom.png' },
    { code: 'uae', label: 'UAE', flag: '/country/united-arab-emirates.png' },
    { code: 'hongkong', label: 'Hong Kong', flag: '/country/hong-kong.png' },
    { code: 'bangladesh', label: 'Bangladesh', flag: '/country/flag-bangladesh.png' },
  ];

  // Fetch contact details
  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const formData = new FormData();
        formData.append('contact_details', 'location');

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getContactDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (res.data.Ack === 1 && res.data.ContactDetails.length > 0) {
          setContactDetails(res.data.ContactDetails[0]);
        } else {
          setContactDetailsError('No contact details found');
        }
      } catch (err) {
        console.error('Contact Details Axios error:', err);
        setContactDetailsError('Failed to load contact details');
      }
    };

    fetchContactDetails();
  }, []);

  // Fetch contact banner
  useEffect(() => {
    const fetchContactBannerList = async () => {
      try {
        const formData = new FormData();
        formData.append('page_id', contactId);

        const res = await axios.post(
          'https://2sglobal.co/staging/service/getPageBannerDetails',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );

        if (res.data.Ack === 1 && res.data.PageBannerDetails) {
          setContactBanner(res.data.PageBannerDetails);
        } else {
          setContactBannerError('No banner details found');
        }
      } catch (err) {
        console.error('Contact Banner Axios error:', err);
        setContactBannerError('Failed to load banner details');
      }
    };

    fetchContactBannerList();
  }, []);

  // Handle country selection
  const handleCountrySelect = (code) => {
    setSelectedCountry(code);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError('');

    // Basic form validation
    if (!name.trim()) {
      setFormError('Full name is required');
      setIsSubmitting(false);
      return;
    }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setFormError('A valid email is required');
      setIsSubmitting(false);
      return;
    }
    if (!message.trim()) {
      setFormError('Message is required');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('full_name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    formData.append('country', selectedCountry);

    try {
      const res = await axios.post(
        'https://2sglobal.co/staging/service/contactMessages',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      // ✅ Check if res.data is a string and parse if needed
      const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

      console.log('Response data:', data); // To verify

      if (data.Ack == '1') {
        alert('Message sent successfully!');
        setName('');
        setEmail('');
        setPhone('');
        setMessage('');
        setSelectedCountry('usa');
      } else {
        alert(data.msg || 'Submission failed.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong: ' + (error.response?.data?.msg || error.message));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="main">


      {/* <div
        className="map-section"
        style={{
          // backgroundImage: `url(${img})`, // Your background image
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '50px',
        }}
      >
        <div className="g-map-area">
          <div className="g-map--wrapper text-center">
            <iframe
              src="https://www.google.com/maps/embed?pb=..."
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div> */}




      {/* <div
        className="site-breadcrumb"
        // style={{ background: 'url(/assets/img/pictures/breadcrumb.jpg)' }}
        style={{ backgroundImage: `url(${img})` }}
      >
        <div className="container">
          <div className="site-breadcrumb-wpr">
            <h2 className="breadcrumb-title">{title}</h2>
            <ul className="breadcrumb-menu clearfix">
              <li>
                <Link href="/">{homeText}</Link>
              </li>
              <li className="active">{currentPage}</li>
            </ul>
          </div>
        </div>
      </div> */}



      {/* <div className="g-map-area">
        <div className="g-map--wrapper text-center">
        <iframe src="https://maps.google.com/maps?q=971+US+Highway+202N+STE+N+Branchburg+NJ+08876+%E2%8B%AE+27%2C+Old+Gloucester+Street%2C+London+WC1N+3AX%2C+United+Kingdom+%E2%8B%AE+Business+Centre%2C+Sharjah+Publishing+City+Free+Zone%2C+Sharjah%2C+UAE+%E2%8B%AE+108%2C+Webel+IT+Park+%28Phase-II%29%2C++DH+Block%2C+Action+Area+1D%2C+New+Town%2C+Kolkata-700160+%E2%8B%AE+RM+1504%2C+15%2FF+Kwong+Fat+Comm+Building+582-588+Canton+Road+Yau+Ma+Tei+KLN+Hong+Kong+%E2%8B%AE+111%2C+Noya+Paltan%2C+6th+Floor%2C+Paltan%2C+Dhaka-1000&output=embed" style={{width:"600", height:"400px", border:0}} loading="lazy" />
        </div>
      </div> */}


      

      <div style={{ paddingTop: '80px' }}>
        <MapComponent />
        {/* other content */}
      </div>



      {/* Breadcrumb Start */}

      {/* {contactBanner ? (
        <Breadcrumb
          title={contactBanner.banner_title}
          homeText="Home"
          currentPage={contactBanner.banner_title}
          img={contactBanner.banner_image}
        />
      ) : (
        contactBannerError && <p className="text-danger text-center">{contactBannerError}</p>
      )} */}

      {/* Breadcrumb End */}






      {/* Contact Section */}
      <div className="contact-area de-padding">
        <div className="container">
          <div className="contact-wpr">
            <div className="row g-5">
              <div className="col-xl-4">
                <div className="contact-sdebar">
                  <div className="contact-up-title mb-60">
                    <h2 className="heading-1">Get in Touch</h2>
                    <p className="mb-0">
                      Lorem ipsum is simply free text available dolor sit amet, consectetur notted
                      adipisicing.
                    </p>
                  </div>
                  <div className="addr-home">
                    <div className="addr-box">
                      <div className="addr-box-single">
                        <div className="addr-icon">
                          <i className="icofont-google-map" />
                        </div>
                        <div className="addr-desc">
                          <h5>Location</h5>
                          {contactDetails ? (
                            <p className="mb-0">{contactDetails.location}</p>
                          ) : (
                            <p className="mb-0">{contactDetailsError || 'Loading location data...'}</p>
                          )}
                        </div>
                      </div>
                      <div className="addr-box-single">
                        <div className="addr-icon">
                          <i className="icofont-phone" />
                        </div>
                        <div className="addr-desc">
                          <h5>Make a Call</h5>
                          {contactDetails ? (
                            <p className="mb-0">{contactDetails.phone}</p>
                          ) : (
                            <p className="mb-0">{contactDetailsError || 'Loading phone data...'}</p>
                          )}
                        </div>
                      </div>
                      <div className="addr-box-single">
                        <div className="addr-icon">
                          <i className="icofont-email" />
                        </div>
                        <div className="addr-desc">
                          <h5>Our Email</h5>
                          {contactDetails ? (
                            <p className="mb-0">{contactDetails.email}</p>
                          ) : (
                            <p className="mb-0">{contactDetailsError || 'Loading email data...'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-xl-8">
                <div className="contact-page">
                  {isSubmitting ? (
                    <p>Sending your message...</p>
                  ) : (
                    <form onSubmit={handleSubmit} className="contact-cnt">
                      <div className="contact-form-title mb-30">
                        <h2 className="heading-1">Send us a message</h2>
                        <p className="mb-0">
                          Integer at lorem eget diam facilisis lacinia ac id massage
                        </p>
                      </div>
                      {formError && <p className="text-danger">{formError}</p>}

                      {/* Country Selection */}
                      <div className="row">
                        <div className="col-xl-12">
                          <div className={Chromestyles.wrapper}>
                            <div className={Chromestyles['scale-down']}>
                              <div className={Chromestyles['radio-buttons']}>
                                {countries.map((country) => (
                                  <label
                                    key={country.code}
                                    className={Chromestyles['custom-radio']}
                                  >
                                    <input
                                      type="radio"
                                      name="country"
                                      checked={selectedCountry === country.code}
                                      onChange={() => handleCountrySelect(country.code)}
                                    />
                                    <div className={Chromestyles['radio-btn']}>
                                      <div className={Chromestyles.content}>
                                        <div className={Chromestyles['profile-img']}>
                                          <Image
                                            src={country.flag}
                                            alt={country.label}
                                            width={40} // Specify width
                                            height={40} // Specify height
                                            quality={75}
                                          />
                                        </div>
                                        <h2>{country.label}</h2>
                                        <span className={Chromestyles.skill} style={{ fontSize: '12px', color: 'black' }}>{country.code}</span>
                                        <span className={Chromestyles['check-icon']}>
                                          <span className={Chromestyles.icon} />
                                        </span>
                                      </div>
                                    </div>
                                  </label>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Form Fields */}
                      <div className="row">
                        <div className="col-xl-6">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control input-style-2"
                              id="name"
                              name="name"
                              placeholder="Your Full Name*"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                              required
                            />
                            <span className="alert alert-error" />
                          </div>
                          <div className="form-group">
                            <input
                              type="email"
                              className="form-control input-style-2"
                              id="email"
                              name="email"
                              placeholder="Your Email Address*"
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              required
                            />
                            <span className="alert alert-error" />
                          </div>
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control input-style-2"
                              id="phone"
                              name="phone"
                              placeholder="Phone Number"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                            <span className="alert alert-error" />
                          </div>
                        </div>
                        <div className="col-xl-6">
                          <div className="form-group">
                            <textarea
                              className="form-control input-style-2"
                              id="message"
                              name="message"
                              placeholder="Your Message..."
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              required
                            />
                            <div className="alert-notification">
                              <div id="message" className="alert-msg" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Submit Button */}
                      <div className="sub-btn">
                        <div className="contact-sub-btn">
                          <button
                            type="submit"
                            name="submit"
                            id="submit"
                            className="btn-submit"
                            disabled={isSubmitting}
                          >
                            Send Message
                            <i className="fas fa-chevron-right" />
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Office Address Section */}
      <ActualOfficeAddress />
    </main>
  );
}

export default Contactmain;