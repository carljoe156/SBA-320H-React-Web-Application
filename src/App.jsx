import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components// may switch  react-router
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
// import { SearchBar } from "./components/SearchBar"; // Import SearchBar component// may switch to custom hook
import Details from "./pages/Details";
import DepartmentPage from "./pages/DepartmentPage";
import RandomArtworkPage from "./pages/RandomArtworkPage";
import About from "./pages/About";
import Error from "./pages/Error";
import Footer from "./components/Footer";
import "@fontsource/roboto-condensed";
// import SearchBar from "./pages/SearchBar";
import "./App.css";

const App = () => {
  return (
    <>
      <NavBar />
      {/* <Search /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:objectID" element={<Details />} />
        {/* <Route path="/search/:searchTerm" element={<Search />} />   W.I.P this is the route leading us the the search term      */}
        <Route path="/department" element={<DepartmentPage />} />
        {/* <Route path="/department/:departmentId" component={DepartmentPage} /> */}
        <Route path="/about" element={<About />} />
        <Route path="/random-artwork" element={<RandomArtworkPage />} />
        <Route path="*" element={<Error />} />
        <Route path="/contact" element={<About />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
