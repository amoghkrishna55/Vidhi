"use client";
import React from "react";
import Section from "../section";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
import Image from "next/image";

const Navbar = () => {
  return (
    <header className=" md:px-10 lg:px-16 w-full flex px-10 items-center h-24 backdrop-blur-lg border-b">
      <div className="mr-10">
        <Link href="/" className="text-brand/yellow font-bold text-4xl">
          VIDHI
        </Link>
      </div>

      <div className="hidden lg:block">
        <ul className="flex gap-10">
          <li className="hover:text-brand/yellow">
            <Link href={"/lawyers"}>Popular_Lawyers</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-end   ">
        <ModeToggle />
        <Button className="bg-yellow-400 mx-2 text-black">
          <Link href={"/chat"}>Get Started</Link>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
