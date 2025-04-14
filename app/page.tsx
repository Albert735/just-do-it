import React from "react";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";

export default function page() {
  return (
    <div className="text-3xl flex flex-col justify-center items-center h-screen gap-[2rem]">
      <TypingAnimation className="text-6xl">Just Do It</TypingAnimation>

      <InteractiveHoverButton>Start</InteractiveHoverButton>
    </div>
  );
}
