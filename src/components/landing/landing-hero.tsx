"use client";
import TypewriterComponent from "typewriter-effect";
import { LoginButton } from "../auth/login-button";
import { useCurrentUser } from "@/hooks/use-current-user";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import paths from "@/paths";

export const LandingHero = () => {
  const user = useCurrentUser();
  const router = useRouter();
  const onClick = () => {
    router.push(paths.landingDashboard())
  }
  return (
    <div className="text-white font-bold py-36 text-center space-y-5">
      <div className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl space-y-5 font-extrabold">
        <h1>Empower Your Customer Support with Feedback</h1>
        <div className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          <TypewriterComponent
            options={{
              strings: [
                "Increase customer satisfaction.",
                "Streamline team workflows.",
                "Respond faster than ever",
                "Automate repetitive tasks",
                "Provide 24/7 support",
              ],
              autoStart: true,
              loop: true,
            }}
          />
        </div>
        <div>
          {user ? (
            <Button variant={"outline"} className="text-zinc-400 font-semibold" onClick={onClick}>Create your own organization</Button>
          ) : (
            <LoginButton>
              <p className="text-lg p-4 md:p-6 rounded-full font-semibold border">
                Sign up for free
              </p>
            </LoginButton>
          )}
        </div>
      </div>
      <div className="text-zinc-400 text-xs md:text-sm font-normal">
        No credit card required
      </div>
    </div>
  );
};
