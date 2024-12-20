import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import React Router components// may swtich the the react-router
import HomePage from "./pages/HomePage";
import Details from "./pages/Details";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/details/:objectID" element={<Details />} />
      </Routes>
    </div>
  );
};

export default App;
