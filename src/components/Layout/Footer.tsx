"use client"
import React from "react";
import Image from "next/image";
import Link from "next/link";
import Logo from "/public/Logo.webp";
import { SocialIcon } from "react-social-icons";
import { Typography } from "@material-tailwind/react";

function Footer() {
  return (
    <>
    <div className="flex justify-around items-center py-6 px-8 bg-slate-400 border-b-[1px] border-black">
      <div className="justify-evenly items-center py-6 mr-8">
        <Link href={"/"}>
          <Image src={Logo} alt="logo" className="w-40" />
        </Link>
        <p className="text-lg pt-8">
          Small, artisan label that offers a<br></br>thoughtfully curated
          collection of high<br></br>quality everyday essentials made.
        </p>
        <div className="flex items-center gap-x-8 mt-8">
          <SocialIcon url="www.twitter.com" />
          <SocialIcon url="https://www.linkedin.com/in/toqeer-abid-98935123a/" />
          <SocialIcon url="https://www.facebook.com/toqeer.anker?mibextid=ZbWKwL" />
        </div>
      </div>
      <div className="gap-x-8 text-lg">
        <h2 className="font-bold ">Company</h2>
        <h3 className="font-normal pt-4">About</h3>
        <h3 className="pt-4">Terms of Use</h3>
        <h3 className="pt-4">Privacy policy</h3>
        <h3 className="pt-4">How it Works</h3>
      </div>
      <div className="gap-x-8 text-lg">
        <h2 className="font-bold ">Support</h2>
        <h3 className="font-normal pt-4">Support Career</h3>
        <h3 className="pt-4">24h Service</h3>
        <h3 className="pt-4 mb-9">Quick Chat</h3>
      </div>
      <div className="gap-x-8 text-lg">
        <h2 className="font-bold">Contact</h2>
        <h3 className="font-normal pt-4">WhatsApp</h3>
        <h3 className="pt-4">Social</h3>
        <h3 className="pt-4 mb-9">Support 24h</h3>
      </div>
    </div>
    <div className="bg-slate-400">
    <Typography
          variant="small"
          className=" text-center font-bold text-blue-gray-900 md:mb-0 pt-2 mb-2"
        >
          &copy; {currentYear} <a href="https://www.purelogics.net/">PureLogics</a>. All 
          Rights Reserved.
        </Typography>
    </div>
    </>
  );
}
const currentYear = new Date().getFullYear();

export default Footer;