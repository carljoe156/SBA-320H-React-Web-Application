import React from "react";
// import { Route, Routes } from "react-router";
import "../App.css";

const About = () => {
  return (
    <>
      <div className="about-page">
        <h1>Welcome to the Met Virtual Collection</h1>
        <p>
          This project has been a passion project of mine for a while, it's a
          ongoing creative process, as for now I hope you enjoy!.
        </p>
        <img
          src="../metropolitan-museum-of-art-new-york-city.webp"
          alt="The Metropolitan Museum of Art"
          style={{ width: "85%", height: "70vh" }}
        />
      </div>
      <section className="location-met">
        <p>
          The Met Fifth Avenue 1000 Fifth Avenue New York, NY 10028 <br />
          Phone: 212-535-7710 The Met Cloisters 99 Margaret Corbin Drive Fort
          Tryon Park New York, NY 10040 Phone: 212-923-3700
        </p>
      </section>
    </>
  );
};

export default About;
