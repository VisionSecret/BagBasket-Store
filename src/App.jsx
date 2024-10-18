import React from "react";
import HeroSection from "./components/HeroSection";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

function App() {
  // Initialize Lenis
  const lenis = new Lenis();

  // Use requestAnimationFrame to continuously update the scroll
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <>
      <HeroSection />
    </>
  );
}

export default App;
