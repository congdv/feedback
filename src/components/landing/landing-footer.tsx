import { Flame } from "lucide-react";

export const LandingFooter = () => {
  return (
    <footer className="text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p className="flex items-center justify-center space-x-2">
          <span>Made with </span>
          <Flame className="w-5 h-5 text-red-500 fill-red" />
          <a
            href="https://congdv.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:underline"
          >
            by Cong Dao
          </a>
        </p>
      </div>
    </footer>
  );
};
