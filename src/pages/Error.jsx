// src/pages/ErrorPage.jsx

import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="error-page">
      <h1>Oops! Something went wrong.</h1>
      <p>
        We couldn't find what you were looking for, or there was an issue
        loading the page.
      </p>
      <p>
        Please try again later or go back to the <a href="/">HomePage</a>.
      </p>
    </div>
  );
};

export default Error;
