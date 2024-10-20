'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { PostForm } from './post-form';
import type { Tag, Status } from '@prisma/client';
import { fetchListOfTag } from '@/actions/tag';
import { fetchListOfStatus } from '@/actions/status';

interface PostButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
}
export const PostButton = ({ children, asChild }: PostButtonProps) => {
  const [tags, setTags] = useState<Tag[]>();
  const [status, setStatus] = useState<Status[]>();
  const [isPending, setPending] = useState<boolean>(false);

  const fetchTagList = async () => {
    try {
      const response = await fetchListOfTag();
      setTags(response);
    } catch {
      setTags([]);
    }
  };
  const fetchStatusList = async () => {
    try {
      const response = await fetchListOfStatus();
      setStatus(response);
    } catch {
      setStatus([]);
    }
  };
  useEffect(() => {
    setPending(true);
    fetchTagList()
      .then(() => {
        return fetchStatusList();
      })
      .finally(() => {
        setPending(false);
      });
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild={asChild} disabled={isPending}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 min-w-fit bg-transparent border-none">
        <PostForm tags={tags} status={status} />
      </DialogContent>
    </Dialog>
  );
};
