"use client";

import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { LoginForm } from "./login-form";

interface LoginButtonProps{
  children: React.ReactNode;
  asChild?: boolean
}

export const LoginButton = ({children, asChild}: LoginButtonProps) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent asChild={asChild} className="p-0 w-auto bg-transparent border-none">
        <LoginForm/>
      </DialogContent>
    </Dialog>
  )
}
