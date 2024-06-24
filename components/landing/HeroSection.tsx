"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PiDiscordLogo } from "react-icons/pi";

const HeroSection = () => {
  return (
    <div className="flex  items-center flex-col space-y-4">
      <h1 className="relative text-4xl  lg:text-7xl font-bold text-center leading-10">
        <span className="flex relative justify-center ">
          <span className="overflow-y-hidden h-12 md:h-20 text-center w-48 md:w-auto">
            <span className="block h-full animate-spin-words text-blue-500">
              Launch🚀
            </span>
            <span className="block h-full animate-spin-words text-yellow-500">
              Market📢
            </span>
            <span className="block h-full animate-spin-words text-green-500">
              Sell💸
            </span>
          </span>
          <span>Products </span>
        </span>
        <div className="flex justify-center my-4">
          <span>in</span>
        </div>
        <span className=" items-center justify-center curvy-underlined bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-violet-500">
          Niche Communities
        </span>
      </h1>
      <p className="md:text-2xl text-xl text-center">
        Launch & Market products were your users hangout!!
      </p>
    </div>
  );
};

export default HeroSection;
