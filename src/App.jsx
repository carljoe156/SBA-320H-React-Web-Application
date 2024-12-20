import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components// may switch  react-router
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";
import SearchResults from "./pages/Search";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:objectID" element={<Details />} />
        <Route path="/search/:searchTerm" component={SearchResults} />
      </Routes>
    </>
  );
};

export default App;
