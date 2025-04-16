"use client";

import confetti from "canvas-confetti";
import { useState } from "react";

import { Button } from "@/components/ui/button";
// imported toast from sonner
import { toast } from "sonner";

export function ConfettiBoth() {
  const [complete, setComplete] = useState(false);

  const handleCompleteClick = () => {
    setComplete(true); // Mark the task as complete
    triggerConfetti(); // Trigger the confetti
  };

  const triggerConfetti = () => {
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) return;

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative">
      {/* placed toaster info here  */}
      <Button
        onClick={() => {
          handleCompleteClick();
          toast("Congratulations 🎉", {
            description: "Task completed successfully",
            action: {
              label: "Undo",
              onClick: () => console.log("Undo"),
            },
          });
        }}
        variant={complete ? "success" : "outline"}
        size="default"
        className="text-black dark:text-white text-[12px]"
      >
        {complete ? "Completed" : "Complete"}
      </Button>
    </div>
  );
}
