// components/Loader.js
import React, { useEffect, useState } from "react";
import bgImage from "../assets/bgimg4.jpeg"; // Adjust path if needed

const funFacts = [
  "Warming up the serverless function. It was a bit chilly.",
  "Asking the database nicely for your data. Please wait.",
  "Looking for your data. We're sure we left it around here somewhere...",
  "Untangling the network cables. Someone must have tripped.",
  "Compressing the data. It's like digital origami.",
  "Reticulating splines... and hoping it sounds impressive enough.",
  "Fact: MongoDB doesn't use tables... because who needs structure anyway?",
  "Relational DBs: because your data *loves* being locked in a relationship.",
  "MySQL: because NoSQL sounds too rebellious.",
  "Did you index that field? No? Good luck with your full table scans.",
  "Yes, the database is slow. No, restarting your laptop won't help.",
  "PostgreSQL is great — until you mistype `DROP` with no `WHERE` clause.",
  "Sharding: because breaking things is fun when it’s intentional.",
];

const Loader = () => {
  const [factIndex, setFactIndex] = useState(() =>
    Math.floor(Math.random() * funFacts.length)
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setFactIndex((prev) => {
        let next;
        do {
          next = Math.floor(Math.random() * funFacts.length);
        } while (next === prev);
        return next;
      });
    }, 6000); // change every 6 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${bgImage})`,
        backgroundRepeat: "repeat",
        backgroundSize: "10%",
        backgroundAttachment: "fixed",
        textAlign: "center",
        padding: "40px",
      }}
    >
      <svg viewBox="0 0 100 100" width="80" height="80">
        <ellipse cx="50" cy="30" rx="35" ry="10" fill="#003366" />
        <path
          d="M15,30 Q50,60 85,30 Q50,0 15,30 Z"
          fill="none"
          stroke="#003366"
          strokeWidth="4"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 50 30"
            to="360 50 30"
            dur="2s"
            repeatCount="indefinite"
          />
        </path>
      </svg>
      <h3 style={{ color: "#003366", marginTop: "20px", maxWidth: "600px" }}>
        {funFacts[factIndex]}
      </h3>
    </div>
  );
};

export default Loader;
