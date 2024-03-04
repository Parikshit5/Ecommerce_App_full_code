import React from "react";
import Layout from "./../components/Layout/Layout";

const Policy = () => {
  return (
    <Layout title={"Privacy Policy - MagnetMall"}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/contactus.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p>
            
          MagnetMall, an educational e-commerce project, prioritizes visitor privacy.
          We do not collect personal information, such as names, addresses, or contact details, 
          as this platform is for learning purposes only and not for real transactions. 
          No log files or cookies are used to track user activity. 
          We have no third-party partnerships for data collection. 
          Our project does not target children under 13, and any 
          inadvertent collection of their data will be promptly addressed. By using our site,
           visitors consent to our Privacy Policy. For questions or clarifications, 
           contact us at contact@magnetmall.com.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
