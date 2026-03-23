import { useState } from "react";
import PostItem from "./PostItem";

function App() {
  const [showPost, setShowPost] = useState(false);

  const items = [
    { name: "Used Chair", location: "Ulsan" },
    { name: "Textbook", location: "Campus" },
    { name: "Kitchen Items", location: "Dorm" }
  ];

  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      
      {/* Homepage */}
      <h1>Free Sewaa</h1>
      <p>
        A community donation and resource-sharing platform that connects donors
        with people who need useful items.
      </p>

      {/* Buttons */}
      <div style={{ marginBottom:
