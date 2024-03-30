import Image from "next/image";
import bot_gif from "../assets/images/chat_bot.gif";
import logo from "../assets/images/apex_logo_rm_bg.png";
import credential from "../assets/images/credentials.png";
import "./globals.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-[100vw] h-[100vh] flex justify-center">
      <div className="w-[60%] h-[100%] flex justify-center items-center">
        <Image className="w-[70%] h-[90%]" src={bot_gif} alt="chat bot gif" />
      </div>
      <div className="auth-option-wrapper w-[40%] h-[100%] flex flex-col justify-center items-center">
        <Image className="w-[80%] h-[20%]" src={logo} alt="logo image" />

        <br />

        <Link
          href="/login"
          className="flex justify-center items-center w-[70%] h-[3rem] border border-slate-500 rounded-3xl gap-4 bg-white"
        >
          <Image
            src={credential}
            alt="credential logo"
            width={25}
            height={25}
          />
          <span className="font-bold">Continue with Credentials</span>
        </Link>
        <br />
      </div>
    </div>
  );
}
