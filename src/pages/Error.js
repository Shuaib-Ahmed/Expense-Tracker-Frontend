import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Footer } from "../components";

const Error = () => {
  return (
    <>
      <Navbar />
      <section className="errorPageContainer">
        <h1>404 Page Not Exist</h1>
        <Link to="/" className="linkBtn blue-btn">
          Home
        </Link>
      </section>
      <Footer />
    </>
  );
};

export default Error;
