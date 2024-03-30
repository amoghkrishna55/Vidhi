import Hero from "@/components/landing-page/hero";
import Navbar from "@/components/landing-page/navbar";
import Section from "@/components/section";
import React from "react";

const Main = () => {
  return (
    <div className="relative">
      <Section>
        <Navbar/>
        <Hero />
      </Section>
    </div>
  );
};

export default Main;
