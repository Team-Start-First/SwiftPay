import React, { _useState } from "react";
import { Routes, Route } from "react-router-dom";
import SignUp from "./components/SignUp";
import Login from "./components/Login";
import Hero from "./components/Hero";
import Card from "./components/Card"



function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Card" element={<Card />} />
      </Routes>
    </div>
  );
}

export default App;
