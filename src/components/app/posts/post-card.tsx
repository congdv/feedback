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
import { useFormatter } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PostCardProps {
  post: PostWithTagAndStatus;
}

export default function PostCard({ post }: PostCardProps) {
  const format = useFormatter();
  const router = useRouter();
  const [upvote, setUpvote] = useState<number>(0);
  const dateTime = new Date(post.updatedAt);
  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post?.tagId ?? '', post.id));
  };
  const navigate = handleClickPost.bind(null, post);
  const handleClickUpVote = () => {};
  const fetchCount = async () => {
    try {
      const response = await fetch(`/api/post/upvote?postId=${post.id}`, {
        headers: {
          Accept: 'application/json',
          method: 'GET',
        },
      });
      if (response) {
        const data = await response.json();
        console.log('🚀 ~ fetchCount ~ data:', data);
        setUpvote(data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        className="w-36 flex justify-center items-center flex-col border-l-2"
        onClick={handleClickUpVote}
      >
        <span>
          <ChevronUp className="h-8 w-8" />
        </span>
        <span>{upvote}</span>
      </div>
    </Card>
  );
}
