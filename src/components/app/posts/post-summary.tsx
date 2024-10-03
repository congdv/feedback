'use client'
import { Avatar } from "@/components/ui/avatar";
import DBClient from "@/db";
import { AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useFormatter } from "next-intl";
import type { Tag, Status } from "@prisma/client";
import { User } from "next-auth";
import { PostWithTagAndStatus } from "@/db/queries/post";

interface PostSummaryProps {
  post: PostWithTagAndStatus
}

export default function PostSummary({post}: PostSummaryProps) {

  const format = useFormatter();


  return (
    <div className="grid items-center grid-cols-5 p-4 gap-y-4">
      <div className="col-span-2">
        <span className="font-medium">Status</span>
      </div>
      <div className="col-span-3">
        <span>{post.status?.description}</span>
      </div>
      <div className="col-span-2">
        <span className="font-medium">Tags</span>
      </div>
      <div className="col-span-3">
        <span>{post.tag?.slug}</span>
      </div>
      <div className="col-span-2">
        <span className="font-medium">Date</span>
      </div>
      <div className="col-span-3">
        <span>{format.relativeTime(new Date(post.createdAt))}</span>
      </div>
      <div className="col-span-2">
        <span className="font-medium">Last updated</span>
      </div>
      <div className="col-span-3">
        <span>{format.relativeTime(new Date(post.updatedAt))}</span>
      </div>
      <div className="col-span-2">
        <span className="font-medium">Author</span>
      </div>
      <div className="col-span-3">
        <div className="flex items-center">
          <Avatar>
            <AvatarImage src={post.user?.image ?? ""} alt={post.user?.name ?? "unknown"} />
            <AvatarFallback>{post.user?.name}</AvatarFallback>
          </Avatar>
          <p className="text-sm ml-1.5 text-gray-400">
            <span className="font-bold">{post.user?.name}</span>
          </p>
        </div>
        
      </div>
    </div>
  )
}