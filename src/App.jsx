import React, { useState } from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Link,
  useNavigate,
} from "react-router-dom";
import UploadForm from "./components/UploadForm";
import Gallery from "./components/Gallery";
import PhotoDetails from "./components/PhotoDetails";

const App = () => {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-100 p-4">
        <nav className="mb-4">
          <Link to="/" className="text-blue-500 mr-4">
            Upload
          </Link>
          <Link to="/gallery" className="text-blue-500">
            Gallery
          </Link>
        </nav>

        <Routes>
          <Route path="/" element={<UploadForm  />} />
          <Route path="/gallery" element={<Gallery  />} />
          <Route path="/photo/:id" element={<PhotoDetails  />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
