import React from "react";
import Layout from "../components/Layout/Layout";

const About = () => {
  return (
    <Layout title={'About us - MagnetMall'}>
      <div className="row contactus ">
        <div className="col-md-6 ">
          <img
            src="/images/about.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="col-md-4">
          <p className="text-justify mt-2 p-3">
          Welcome to MagnetMall, where shopping knows no boundaries! Discover a world of endless possibilities 
          with our curated selection of high-quality products. From fashion to technology and beyond, we're your 
          one-stop destination for all your needs. With a focus on innovation and customer satisfaction, we strive 
          to exceed your expectations at every turn. Join our global community of savvy shoppers and experience 
          the convenience of online shopping like never before. Thank you for choosing GLOBALMART as your preferred 
          shopping destination. Happy shopping from the MagnetMall team!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;