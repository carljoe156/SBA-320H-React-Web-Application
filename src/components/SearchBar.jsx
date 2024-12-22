import React, { useState } from "react";

// Accept setSearchTerm from parent (Navbar) to set search term in Navbar
const SearchBar = ({ setSearchTerm, setSearchResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const metapiUrl = `https://collectionapi.metmuseum.org/public/collection/v1/search?q=${value}&hasImages=true`;

    // Fetch data from API and log the result to the console
    fetch(metapiUrl)
      .then((response) => response.json())
      .then((json) => {
        const searchResults = json.results((object) => ({
          title: object.title,
          artist: object.artistDisplayName,
          objectID: object.objectID,
          imageUrl: object.primaryImage ? object.primaryImage.url : "",
        }));
        console.log("Search results: ", searchResults);
        // if (!response.ok) {
        //   throw new Error("Network response was not ok");
        // }
        // return response.json();
      });
    //   .then((json) => console.log(json));

    //   .catch((error) => {
    //     console.error("Fetch error: ", error); // Handle errors
    //     setSearchResults(json); // Update the parent state with the search results
    //   })
    //   .catch((error) => {
    //     console.error("Fetch error: ", error); // Handle errors
    //   });
  };

  const handleChange = (value) => {
    setInput(value);
    setSearchTerm(value); // Set the search term in Navbar

    if (value.trim() !== "") {
      fetchData(value); // Fetch data if input is not empty
    }
  };

  return (
    <div className="input-wrapper">
      <input
        placeholder="Search for artworks..."
        value={input}
        onChange={(e) => handleChange(e.target.value)} // Update input and search term
      />
    </div>
  );
};

export default SearchBar;
