'use client';
import { Button } from '@/components/ui/button';
import { ThumbsDown, ThumbsUp } from 'lucide-react';
import { useState } from 'react';
import type { Reaction } from '@prisma/client';

interface CommentReactionProps {
  commentId: string;
  likeCount: number;
  dislikeCount: number;
  currentUserReact: { reaction: string } | null;
  reactToComment: (commentId: string, type: Reaction) => void;
}

export default function CommentReaction({
  commentId,
  likeCount = 0,
  dislikeCount = 0,
  reactToComment,
  currentUserReact,
}: CommentReactionProps) {
  const [like, setLikes] = useState(likeCount);
  const [dislike, setDislikes] = useState(dislikeCount);
  const [reaction, setReaction] = useState(currentUserReact?.reaction);

  const handleLike = () => {
    setLikes(like + 1);
    reactToComment(commentId, 'LIKE');
    setReaction('LIKE');
  };

  const handleDislike = () => {
    setDislikes(dislike + 1);
    reactToComment(commentId, 'DISLIKE');
    setReaction('DISLIKE');
  };

  console.log('like and dislike', like, dislike);

  return (
    <>
      <Button
        variant={'ghost'}
        onClick={handleLike}
        disabled={reaction === 'LIKE'}
      >
        <ThumbsUp
          color={`${reaction === 'LIKE' ? 'red' : 'black'}`}
          className="h-4 w-4"
        />
      </Button>
      <span>{like - dislike}</span>
      <Button
        variant={'ghost'}
        onClick={handleDislike}
        disabled={reaction === 'DISLIKE'}
      >
        <ThumbsDown
          color={`${reaction === 'DISLIKE' ? 'red' : 'black'}`}
          className="mr-2 h-4 w-4"
        />
      </Button>
    </>
  );
}
