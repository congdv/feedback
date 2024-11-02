'use client';
import { createComment } from '@/actions/create-comments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useEffect, useRef } from 'react';
import { useFormState } from 'react-dom';

interface CommentCreateFormProps {
  postId: string;
  organizationSlug: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  organizationSlug
}: CommentCreateFormProps) {
  const [formState, action] = useFormState(
    createComment.bind(null, { postId, parentId, organizationSlug }),
    { errors: {} }
  );
  const ref = useRef<HTMLFormElement | null>(null);

  useEffect(() => {
    if (formState.success) {
      ref.current?.reset();
    }
  }, [formState]);

  return (
    <div className="flex flex-col gap-2 my-5">
      <form action={action} ref={ref}>
        <Textarea
          name="content"
          className="h-24"
          placeholder="Write a comment"
        />
        {formState.errors._form ? (
          <div className="p-2 bg-red-200 border rounded border-red-400 mt-2">
            {formState.errors._form?.join(', ')}
          </div>
        ) : null}
        <div className="flex items-center justify-end mt-5">
          <Button type="submit" variant={'outline'}>
            Post comment
          </Button>
        </div>
      </form>
    </div>
  );
}
