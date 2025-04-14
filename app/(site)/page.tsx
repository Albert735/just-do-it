"use client";

import React from "react";
import { clsx } from "../../lib/utils";
import { TypingAnimation } from "../../components/magicui/typing-animation";
import { InteractiveHoverButton } from "../../components/magicui/interactive-hover-button";
import { DotPattern } from "../../components/magicui/dot-pattern";
// import localFont from "next/font/local";
import Link from "next/link";
import Navbar from "../../components/ui/Navbar";

// const futuraFont = localFont({
//   src: "../../fonts/FuturaPT-Medium.woff2",
//   preload: true,
//   variable: "--font-futura",
// });

export default function Page() {
  return (
    <>
      <Navbar />
      <div className=" flex flex-col justify-center items-center h-[calc(100vh-4rem)] gap-[2rem]">
        <DotPattern
          // glow={true}
          className={clsx(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <TypingAnimation className={`text-[5rem] z-10`}>
          Just Do It
        </TypingAnimation>
        <Link href="/form/logIn">
          <InteractiveHoverButton>Start</InteractiveHoverButton>
        </Link>
      </div>
    </>
  );
}
