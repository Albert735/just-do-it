import React from "react";
import { Button } from "../../components/ui/button";
// import localFont from "next/font/local";

// const futuraFont = localFont({
//   src: "../../fonts/Futura Condensed Extra Bold.otf",
//   preload: true,
//   variable: "--font-futura",
// });

export default function Navbar() {
  return (
    <div className="flex justify-between items-center max-w-screen-xl mx-auto p-4">
      <div>
        <h1 className={`text-3xl font-bold `}>
          Just Do It
        </h1>
      </div>
      <div className="flex gap-4">
        <Button variant={"outline"} className="rounded-full">
          log in
        </Button>
        <Button variant={"default"} className="rounded-full">
          sign up
        </Button>
      </div>
    </div>
  );
}
