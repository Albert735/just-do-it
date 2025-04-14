"use client";

import React from "react";
import { clsx } from "../lib/utils";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import { DotPattern } from "../components/magicui/dot-pattern";
import localFont from "next/font/local";

const futuraFont = localFont({
  src: "../assets/fonts/Futura Condensed Extra Bold.otf",
  variable: "--font-inter",
});

export default function page() {
  return (
    <div className="text-3xl flex flex-col justify-center items-center h-screen gap-[2rem]">
      <DotPattern
        // glow={true}
        className={clsx(
          "[mask-image:radial-gradient(400px_circle_at_center,white,transparent)]"
        )}
      />
      <TypingAnimation className={`text-[5rem] z-10  ${futuraFont.className}`}>
        Just Do It
      </TypingAnimation>

      <InteractiveHoverButton>Start</InteractiveHoverButton>
    </div>
  );
}
