import React from "react";
import { Link } from "react-router-dom";
const Footer=()=>{
    return(
      <div className="footer">
    <h1 className="text-center">All Right Reserved &copy; Parikshit</h1>
    <p className="text-center mt-2.3">
        <Link to="/about" className="d-block d-md-inline-block">About</Link>
        <span className="d-none d-md-inline"> | </span>
        <Link to="/contact" className="d-block d-md-inline-block">Contact</Link>
        <span className="d-none d-md-inline"> | </span>
        <Link to="/policy" className="d-block d-md-inline-block">Privacy Policy</Link>
    </p>
</div>

    );
}
export default Footer;