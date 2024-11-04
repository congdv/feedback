"use client";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "next-auth";

export const UserAvatar = ({user}: {user: User | undefined}) => {

  return (
    <Avatar className="h-8 w-8">
      <AvatarImage src={user?.image as string}/>
      <AvatarFallback>
        {user?.name?.trim().split(" ")[0]?.charAt(0)}
        {user?.name?.trim().split(" ")[1]?.charAt(0)}
      </AvatarFallback>
    </Avatar>
  )
}