import React from "react";
import { TypingAnimation } from "../components/magicui/typing-animation";
import { InteractiveHoverButton } from "../components/magicui/interactive-hover-button";
import { DotPattern } from "../components/magicui/dot-pattern";

export default function page() {
  return (
    <div className="text-3xl flex flex-col justify-center items-center h-screen gap-[2rem]">
      <DotPattern
        glow={true}
        className="[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
      />
      <TypingAnimation className="text-[5rem]">Just Do It</TypingAnimation>

      <InteractiveHoverButton>Start</InteractiveHoverButton>
    </div>
  );
}
