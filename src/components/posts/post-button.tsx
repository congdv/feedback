'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '../ui/dialog';
import { PostForm } from './post-form';
import type { Tag, Status } from '@prisma/client';
import { fetchListOfTag } from '@/actions/tag';
import { fetchListOfStatus } from '@/actions/status';
import { useParams } from 'next/navigation';
import { getPostById } from '@/actions/post';
import { PostWithTagStatusAndReaction } from '@/db/queries/post';

interface PostButtonProps {
  children: React.ReactNode;
  asChild?: boolean;
  organizationId: string;
}
export const PostButton = ({ children, organizationId, asChild }: PostButtonProps) => {
  const [tags, setTags] = useState<Tag[]>();
  const [status, setStatus] = useState<Status[]>();
  const [isPending, setPending] = useState<boolean>(false);
  const [post, setPost] = useState<PostWithTagStatusAndReaction |  undefined>();
  const [open, setOpen] = useState(false);
  const params = useParams()

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
  const fetchPost = async() => {
    if(!params.postId) return;
    try {
      const response = await getPostById(params.postId as string);
      setPost(response || undefined);
    } catch {
      setPost(undefined);
    }
  }
  useEffect(() => {
    setPending(true);
    fetchPost()
    .then(fetchTagList)
    .then(fetchStatusList)
    .finally(() => {
      setPending(false);
    });
  }, []);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild={asChild} disabled={isPending}>
        {children}
      </DialogTrigger>
      <DialogContent className="p-0 min-w-fit bg-transparent border-none">
        <PostForm tags={tags} status={status} post={post} organizationId={organizationId} afterSubmit={() => {setOpen(false)}}/>
      </DialogContent>
    </Dialog>
  );
};
