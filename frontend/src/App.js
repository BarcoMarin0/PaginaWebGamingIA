import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import NewsDetail from "./pages/NewsDetail";
import AdminPanel from "./pages/AdminPanel";

function App() {
  return (
    <div className="App min-h-screen bg-black">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/news/:id" element={<NewsDetail />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;