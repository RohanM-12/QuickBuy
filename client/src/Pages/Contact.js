import React from "react";
import Layout from "../Components/Layout/Layout";

const Contact = () => {
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <img
              src="/client/public/Images/contact-us.jpg"
              alt="Contact"
              className="img-fluid"
            />
          </div>
          <div className="col-md-8">
            <h2>Contact Information</h2>
            <div className="row">
              <div className="col-sm-6">
                <div className="info-item">
                  <span>Email:</span>
                  <a href="mailto:rohanm@gmail.com">rohanm@egmail.com</a>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="info-item">
                  <span>Mobile:</span>
                  <span>123-456-7890</span>
                </div>
              </div>
              <div className="col-sm-6">
                <div className="info-item">
                  <span>Telephone:</span>
                  <span>987-654-3210</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
