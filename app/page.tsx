"use client";

import { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import CustomCursor from "@/components/CustomCursor";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import AboutMe from "@/components/AboutMe";
import TechStackSection from "@/components/TechStackSection";
import WhatIBuild from "@/components/WhatIBuild";
import FeaturedWork from "@/components/FeaturedWork";
import Stats from "@/components/Stats";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setIsLoading(false), 3200);
    const t2 = setTimeout(() => setIsReady(true), 3800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <>
      <CustomCursor />

      <AnimatePresence>
        {isLoading && <Loader key="loader" />}
      </AnimatePresence>

      {isReady && (
        <div className="relative">
          <Header />
          <main>
            <Hero />
            <Marquee />
            <AboutMe />
            <TechStackSection />
            <WhatIBuild />
            <FeaturedWork />
            <Stats />
            <Contact />
          </main>
          <Footer />
        </div>
      )}
    </>
  );
}
