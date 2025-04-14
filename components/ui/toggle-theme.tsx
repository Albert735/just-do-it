"use client";

// import { Button } from "./Button";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FiSun, FiMoon } from "react-icons/fi";

export default function ToggleTheme() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant={"outline"}
      className="rounded-full"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      <FiMoon className="absolute h-10 w-10 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <FiSun className="absolute h-10 w-10 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </Button>
  );
}
