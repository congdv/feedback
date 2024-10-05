'use client';

import { createPost, updatePost } from '@/actions/create-post';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CirclePlus, FilePenLine } from 'lucide-react';
import { useFormState } from 'react-dom';
import type { Tag, Status, Post } from '@prisma/client';
import { useState } from 'react';

interface FeedbackCreateFormProps {
  tagId: string;
  statusId: string;
  tags: Tag[];
  status: Status[];
  post: Post | null;
}

export default function FeedbackCreateForm({
  post,
  tagId,
  statusId,
  status,
  tags,
}: FeedbackCreateFormProps) {
  const [selectedTag, setTag] = useState<string>(tagId);
  const [selectedStatus, setStatus] = useState<string>(statusId);
  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [content, setContent] = useState<string>(post?.content ?? '');
  const [formState, action] = useFormState(
    createPost.bind(null, selectedTag, statusId),
    {
      errors: {},
    }
  );

  const [, updateAction] = useFormState(
    updatePost.bind(null, post?.id ?? '', selectedTag, selectedStatus),
    {
      errors: {},
    }
  );

  return (
    <Dialog>
      <DialogTrigger asChild>
        {post ? (
          <Button variant={'ghost'}>
            <FilePenLine height="20px" width="20px" />
          </Button>
        ) : (
          <Button variant="default" className="ml-5">
            <CirclePlus className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        )}
      </DialogTrigger>
      <DialogContent>
        <form action={post ? updateAction : action}>
          <DialogHeader>
            <DialogTitle>
              <span className="p-2 border rounded">Feedback</span>
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-2 my-5">
            <Input
              name="title"
              value={title}
              placeholder="Title of your post"
              onChange={(e) => setTitle(e.target.value)}
            />
            <Textarea
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="h-48"
              placeholder="Post descriptions..."
            />
          </div>
          {formState.errors._form ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {formState.errors._form?.join(', ')}
            </div>
          ) : null}
          <div className="flex flex-row gap-2 my-2">
            {tags.map((tag, index) => {
              return (
                <Button
                  type="button"
                  key={index}
                  variant={tag.id === selectedTag ? 'default' : 'outline'}
                  onClick={() => setTag(tag.id)}
                >
                  {tag.slug}
                </Button>
              );
            })}
          </div>

          {post && (
            <div className="flex flex-row gap-2 my-2">
              {status.map((st, index) => {
                return (
                  <Button
                    type="button"
                    key={index}
                    variant={st.id === selectedStatus ? 'default' : 'outline'}
                    onClick={() => setStatus(st.id)}
                  >
                    {st.description}
                  </Button>
                );
              })}
            </div>
          )}

          <DialogFooter>
            {post ? (
              <DialogClose asChild>
                <Button type="submit" variant="default">
                  Save changes
                </Button>
              </DialogClose>
            ) : (
              <Button type="submit" variant="default">
                Submit Post
              </Button>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
