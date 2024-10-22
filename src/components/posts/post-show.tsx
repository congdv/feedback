import type { Post } from '@prisma/client';
import { User } from 'next-auth';
import { PostButton } from './post-button';
import { Button } from '../ui/button';
import { FilePenLine } from 'lucide-react';
interface PostShowProps {
  post: Post;
  user?: User;
}

export default async function PostShow({ post, user }: PostShowProps) {

  return (
    <div className="p-5 mb-10 border rounded">
      <div className="flex justify-between">
        <div className="min-h-[36px]">
          <h1 className="text-lg font-semibold ">{post.title}</h1>
        </div>
        {user && user.id === post.userId && (
            <PostButton asChild>
              <Button variant={"ghost"} size={"icon"}>
                <FilePenLine className="h-4 w-4" />
              </Button>
            </PostButton>
        )}
      </div>
      <p className="text-[15px] content ">{post.content}</p>
    </div>
  );
}
