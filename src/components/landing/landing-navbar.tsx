"use client";
import { cn } from "@/lib/utils";
import { Montserrat } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";

const font = Montserrat({
  weight: "600",
  subsets: ["latin"],
});

export const LandingNavbar = () => {
  return (
    <nav className="p-4 bg-transparent flex items-center justify-between">
      <Link href={"/"} className="flex items-center">
        <h1 className={cn("text-2xl font-bold text-white", font.className)}>
          Feedback
        </h1>
      </Link>
      <div className="flex items-center gap-x-2">
        <Link href={"/organization/demo"}>
          <Button variant={"outline"} className="rounded-full">
            Demo
          </Button>
        </Link>
      </div>
    </nav>
  );
};
