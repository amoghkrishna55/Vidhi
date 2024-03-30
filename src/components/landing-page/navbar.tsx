"use client";
import React from "react";
import Section from "../section";
// import { NAV_LINKS } from "@/constants";
import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";
// import { useSupabaseUser } from "../providers/supabase-user-provider";
import Image from "next/image";

const Navbar = () => {
  // const { user } = useSupabaseUser();
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
            <Link href={"/join-environments"}>Popular_Lawyers</Link>
          </li>
        </ul>
      </div>

      <div className="flex flex-1 items-center justify-end   ">
        <ModeToggle />
        <Button className="bg-yellow-400 mx-2 text-black">
          <Link href={"/dashboard"}>Get Started</Link>
        </Button>
        {/* {user ? (
          <Link
            href={"/profile"}
            className=" flex mx-3 items-center justify-center cursor-pointer shadow-2xl rounded-full bg-yellow-200 "
          >
            <Image
              src="/boardApe.png"
              alt="profile"
              width={30}
              height={30}
              className="rounded-full w-full h-full"
            />
          </Link>
        ) : (
          <Link href={"/login"}>
            <Button className="mx-4 right-0 cursor-pointer relative shadow-2xl w-[80px] bg-yellow-200 shadow-zinc-900 dark:shadow-white  p-px text-xs font-semibold leading-6  text-black inline-block">
              <span>Login</span>
            </Button>
          </Link>
        )} */}
      </div>
    </header>
  );
};

export default Navbar;
