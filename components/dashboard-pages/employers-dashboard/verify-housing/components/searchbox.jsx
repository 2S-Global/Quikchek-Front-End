import React from "react";

import "react-datepicker/dist/react-datepicker.css";

const SearchBox = () => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    alert("Form submitted successfully!");
  };

  return (
    <div className="widget-content">
      <div className="row">
        <form className="default-form" onSubmit={handleSubmit}>
          <div className="row d-flex justify-content-center align-items-center">
            <div className="form-group col-md-4 text-center">
              <input
                type="text"
                name="listing-search"
                placeholder="Name, keywords,Email or Phone Number"
                className="form-control text-center" // Center text inside input
              />
              <span
                className="icon flaticon-search-3"
                onClick={handleSubmit}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              ></span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchBox;
