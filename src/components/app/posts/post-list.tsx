'use client'
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { PostWithTagAndStatus } from "@/db/queries/post";
import paths from "@/paths";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { useFormatter } from 'next-intl';
import Link from "next/link";

interface PostListProps {
  posts: PostWithTagAndStatus[]
}

export default function PostList({posts}: PostListProps) {

  const renderPost = (post: PostWithTagAndStatus, index: number) => {
    const format = useFormatter();

    const dateTime = new Date(post.updatedAt);
    return <Card key={index}>
      <CardHeader>
        <div className="flex gap-3">
          <span className="p-2 border rounded">{post?.tag?.slug}</span>
          <span className="p-2 border rounded">{post?.status?.description}</span>

        </div>
      </CardHeader>
      <CardContent>
        <Link href={paths.postShow(post?.tagId ?? "", post.id)}><h1 className="font-bold text-3xl">{post.title}</h1></Link>
        <p>{post.content}</p>
      </CardContent>
      <CardFooter>
        <Avatar>
          <AvatarImage src={post.user.image ?? ""} alt={post.user.name ?? "unknown"} />
          <AvatarFallback>{post.user.name}</AvatarFallback>
        </Avatar>
        <p className="text-sm ml-1.5 text-gray-400">
          <span className="font-bold">{post.user.name}</span>
          <span className="text-xs font-medium ml-1.5 text-background-accent">{format.relativeTime(dateTime)}</span>
        </p>
      </CardFooter>
    </Card>
  }
    return <div className="mt-10 flex flex-col gap-3">
      {
        posts.map(renderPost)
      }
    </div>
} 