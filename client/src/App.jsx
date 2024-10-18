import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Analysis from "./pages/Analysis";
import GetData from "./pages/GetData";
import { NavBar } from "./components/NavBar";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/getdata" element={<GetData />} />
        <Route path="/analyse" element={<Analysis />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
