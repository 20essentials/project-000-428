import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { styled } from "@acab/ecsstatic";
import { useState, useEffect } from "react";

const Global = styled.global`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    font-family: sans-serif, system-ui, -apple-system, BlinkMacSystemFont,
      "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans",
      "Helvetica Neue";
  }
  a {
    -webkit-tap-highlight-color: transparent;
  }
  html {
    scroll-behavior: smooth;
    scrollbar-width: thin;
    scrollbar-color: transparent transparent;
  }
  body {
    height: 100vh;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    place-content: center;
    overflow: hidden;
  }
  @keyframes burbujeo {
    0% {
      width: 0px;
      height: 0px;
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      width: 300px;
      height: 300px;
    }
  }
`;

const Circle = styled.article`
  position: absolute;
  width: 100px;
  height: 100px;
  transform: translate(-50%, -50%);
  background-image: url("assets/noise.avif");
  background-size: cover;
  border-radius: 50%;
  animation: burbujeo 0.5s linear forwards;
`;

function App() {
  const [circles, setCircles] = useState([]);

  const handleClick = (e) => {
    const id = Date.now();
    setCircles((prev) => [...prev, { id, x: e.pageX, y: e.pageY }]);
    setTimeout(() => {
      setCircles((prev) => prev.filter((circle) => circle.id !== id));
    }, 1000);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <>
      <Global />
      {circles.map((c) => (
        <Circle key={c.id} style={{ left: `${c.x}px`, top: `${c.y}px` }} />
      ))}
    </>
  );
}

const rootElement = document.createElement("div");
document.body.appendChild(rootElement);
createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
