'use client';
import { createComment } from '@/actions/create-comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { CommentWithAuthor } from '@/db/queries/comments';
import { Heart, Reply } from 'lucide-react';
import { User } from 'next-auth';
import { useSession } from 'next-auth/react';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

interface ReplyCreateFormProps {
  postId: string;
  currentComment: CommentWithAuthor;
  parentId?: string;
  startOpen?: boolean;
  user?: User;
}

export default function ReplyCreateForm({
  postId,
  currentComment,
  parentId,
  user,
}: ReplyCreateFormProps) {
  const { data: session } = useSession();
  const [open, setOpen] = useState<boolean>(false);
  const [upvotes, setUpvotes] = useState<number>(currentComment.commentReaction.length)
  const [reactionUsers, setReactionUsers] = useState(new Set(currentComment.commentReaction.map(p => p.userId)));
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
      setOpen(false);
    }
  }, [formState]);

  const handleUpvote = async () => {
    if(!session?.user?.id) {
      return;
    }
    try {
      const response = await fetch(`/api/comment/upvote/${currentComment.id}`, {
        headers: {
          Accept: 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({userId: session?.user?.id})
      });
      if (response) {
        const data = await response.json();
        setUpvotes(data.count);
        setReactionUsers(new Set(data.reaction.map((p: { userId: string; }) => p.userId)));
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <div className='flex items-center mr-3'>
        <Button onClick={handleUpvote} variant={"ghost"} size={"icon"}><Heart className='h-4 w-4' color={`${reactionUsers.has(session?.user?.id ?? "###") ? "#f00" : "#000"}`}/></Button>
        {upvotes > 0 && <span className='ml-2'>{upvotes} {upvotes > 1 ? "likes" : "like"}</span>}
        <Button
          variant={'ghost'}
          disabled={!!!user?.id}
          onClick={() => setOpen(!open)}
          size={"sm"}
          className='p-1 ml-2'
        >
          <Reply className="mr-2 h-4 w-4" />
          Reply
        </Button>
      </div>
      
      <div className="flex flex-col gap-2 my-5">
        {open && (
          <form ref={ref} action={action}>
            <Textarea
              name="content"
              className="h-24"
              placeholder="Write a comment"
            />
            {formState.errors._form ? (
              <div className="p-2 bg-red-200 border rounded border-red-400">
                {formState.errors._form?.join(', ')}
              </div>
            ) : null}
            <div className="flex items-center justify-end mt-5">
              <Button type="submit" variant={'outline'}>
                Reply to comment
              </Button>
            </div>
          </form>
        )}
      </div>
    </>
  );
}
