'use client';
import { createComment } from '@/actions/create-comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Reply } from 'lucide-react';
import { User } from 'next-auth';
import { useEffect, useRef, useState } from 'react';
import { useFormState } from 'react-dom';

interface ReplyCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
  user?: User;
}

export default function ReplyCreateForm({
  postId,
  parentId,
  user,
}: ReplyCreateFormProps) {
  const [open, setOpen] = useState<boolean>(false);
  const ref = useRef<HTMLFormElement | null>(null);
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId }),
    { errors: {} }
  );
  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
    }
  }, [formState]);
  return (
    <>
      <Button
        variant={'ghost'}
        disabled={!!!user?.id}
        onClick={() => setOpen(!open)}
      >
        <Reply className="mr-2 h-4 w-4" />
        Reply
      </Button>
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
