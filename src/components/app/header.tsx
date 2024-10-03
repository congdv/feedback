import HeaderAuth from "./header-auth";
import Link from "next/link";

export default async function Header() {
 
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white">
      <div className="max-w-5xl py-4 pb-0 mx-auto">
        <div className="flex h-16 justify-between items-center px-4 m-auto">
          <Link href="/" className="font-bold">Feedback</Link>
          <HeaderAuth/>
        </div>
      </div>
      
    </header>
    
  )
}