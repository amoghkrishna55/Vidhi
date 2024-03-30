import React, { PropsWithChildren } from "react";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}
const Section = ({ children, className = "" }: SectionProps) => {
  return (
    <section className={`px-6 md:px-10 lg:px-16 ${className}`}>
      {children}
    </section>
  );
};

export default Section;
