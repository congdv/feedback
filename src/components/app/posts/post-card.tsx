import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { PostWithTagAndStatus } from '@/db/queries/post';
import paths from '@/paths';
import { ChevronUp } from 'lucide-react';
import { User } from 'next-auth';
import { useFormatter } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: PostWithTagAndStatus & { PostReaction: Array<{userId: string}>};
  user?: User;
}

export default function PostCard({ post, user }: PostCardProps) {
  const format = useFormatter();
  const router = useRouter();
  const [userIds, setUserIds] = useState(new Set(post.PostReaction.map(p => p.userId)))
  const [upvote, setUpvote] = useState<number>(0);
  const dateTime = new Date(post.updatedAt);
  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post?.tagId ?? '', post.id));
  };
  const navigate = handleClickPost.bind(null, post);
  const handleClickUpVote = async() => {
    if(user?.id) {
      await updateUpvote();
    }
  };
  const fetchCount = async () => {
    try {
      let url = `/api/post/upvote/${post.id}`;

      if(user?.id) {
        url += `?userId=${user?.id}`;
      }
      const response = await fetch(url, {
        headers: {
          Accept: 'application/json',
        },
        method: 'GET',

      });
      if (response) {
        const data = await response.json();
        setUpvote(data.count);
       
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUpvote = async () => {
    try {
      const response = await fetch(`/api/post/upvote/${post.id}`, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({userId: user?.id})
      });
      if (response) {
        const data = await response.json();
        setUpvote(data.count);
        if(user?.id) {
          if(userIds.has(user.id)) {
            userIds.delete(user.id);
            setUserIds(new Set(userIds));
          } else {
            userIds.add(user.id);
            setUserIds(new Set(userIds));
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchCount();
  }, [fetchCount]);
  return (
    <Card className="cursor-pointer flex flex-row">
      <div className="grow" onClick={navigate}>
        <CardHeader>
          <div className="flex gap-3">
            <span className="p-2 border rounded">{post?.tag?.slug}</span>
            <span className="p-2 border rounded">
              {post?.status?.description}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <h1 className="font-bold text-3xl">{post.title}</h1>
          <p>{post.content}</p>
        </CardContent>
        <CardFooter>
          <Avatar>
            <AvatarImage
              src={post.user.image ?? ''}
              alt={post.user.name ?? 'unknown'}
            />
            <AvatarFallback>{post.user.name}</AvatarFallback>
          </Avatar>
          <p className="text-sm ml-1.5 text-gray-400">
            <span className="font-bold">{post.user.name}</span>
            <span className="text-xs font-medium ml-1.5 text-background-accent">
              {format.relativeTime(dateTime)}
            </span>
          </p>
        </CardFooter>
      </div>
      <div
        className="min-w-36 flex justify-center items-center flex-col border-l-2"
        onClick={handleClickUpVote}
      >
        <span>
          <ChevronUp className="h-8 w-8" color={`${userIds.has(user?.id ?? "###") ? "#3730a3" : "#000"}`} />
        </span>
        <span>{upvote}</span>
      </div>
    </Card>
  );
}
