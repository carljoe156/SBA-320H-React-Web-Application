import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
// import Search from "../pages/Search";
const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState(null); // To hold the search results
  const navigate = useNavigate();

  // Handle the search submit action
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search/${searchTerm}`);
    }
  };

  return (
    <nav className="navbar">
      <h1>MET Artworks Collection</h1>

      <Link to="/" className="home-link">
        Home
      </Link>
      <Link to="/department" className="department-link">
        Departments
      </Link>
      <Link to="/about" className="about-link">
        About
      </Link>
      <Link>
        <Link to="/random-artwork" className="random-artwork-link">
          Random Artwork
        </Link>
      </Link>

      <form onSubmit={handleSearch} className="search-form">
        {/* You can either use your SearchBar component here or build custom inputs */}
        <SearchBar
          setSearchTerm={setSearchTerm}
          setSearchResults={setSearchResults}
        />
      </form>
    </nav>
  );
};

export default Navbar;
