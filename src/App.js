import React from "react";
import "./App.css";
import Home from "../src/components/Home";
import Navbar from "../src/components/Navbar";
import About from "../src/components/About";
import Signup from "../src/components/Signup1";
import Login from "../src/components/Login1";
import NoteState from "../src/context/NoteState";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <NoteState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Router>
      </NoteState>
    </div>
  );
}

export default App;
