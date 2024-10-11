import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { PostWithTagAndStatus } from '@/db/queries/post';
import paths from '@/paths';
import { useFormatter } from 'next-intl';
import { useRouter } from 'next/navigation';
import TagShow from '../tag/tag-show';
import PostReaction from './post-reaction';

interface PostCardProps {
  post: PostWithTagAndStatus & { postReaction: Array<{userId: string}>};
}

export default function PostCard({ post}: PostCardProps) {
  const format = useFormatter();
  const router = useRouter();
  const dateTime = new Date(post.updatedAt);
  const handleClickPost = (post: PostWithTagAndStatus) => {
    router.push(paths.postShow(post.id));
  };
  const navigate = handleClickPost.bind(null, post);


  return (
    <Card className="cursor-pointer flex flex-row">
      <div className="grow" onClick={navigate}>
        <CardHeader>
          <div className="flex gap-3">
            {post.tag && <TagShow tag={post?.tag?.slug} className='bg-cyan-700 text-white'/>}
            {post.status && <TagShow tag={post?.status?.description} className='bg-pink-900 text-white'/>}
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
      <PostReaction className="min-w-36 flex justify-center items-center flex-col border-l-2" post={post}/>
    </Card>
  );
}
