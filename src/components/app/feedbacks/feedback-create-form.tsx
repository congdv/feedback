'use client';

import { createNewPost, updatePost } from '@/actions/create-post';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DialogTitle } from '@radix-ui/react-dialog';
import { CirclePlus, FilePenLine, Loader2 } from 'lucide-react';
import type { Tag, Status, Post } from '@prisma/client';
import { useState } from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select';

interface FeedbackCreateFormProps {
  tags: Tag[];
  status: Status[];
  post: Post | null;
}

interface ErrorType {
  title?: string[];
  content?: string[];
}

export default function FeedbackCreateForm({
  post,
  status,
  tags,
}: FeedbackCreateFormProps) {
  const [selectedTag, setTag] = useState<string|undefined>(post?.tagId ?? undefined);
  const [selectedStatus, setStatus] = useState<string|undefined>(post?.statusId ?? undefined);
  const [title, setTitle] = useState<string>(post?.title ?? '');
  const [errors, setErrors] = useState<ErrorType|null>(null);
  const [content, setContent] = useState<string>(post?.content ?? '');
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);


  const handleSubmitPost = async() => {

    setLoading(true);
    const result = await createNewPost(title, content, selectedTag, selectedStatus ?? status[0].id);
    setLoading(false);
    if(result) {
      setErrors(result.errors);
      return;
    }

    setOpen(false);
  }

  const handleSavePostChange = async() => {
    setLoading(true);
    const result = await updatePost(title, content, post?.id, selectedTag, selectedStatus);
    setLoading(false);
    if(result) {
      setErrors(result.errors);
      return;
    }

    
    setOpen(false);
  }

  const handleOnTagChange = (value: string) => {
    setTag(value)
  }

  const handleOnStatusChange = (value: string) => {
    setStatus(value);
  }

  const onOpenDialog = () => {
    setOpen(true);
    setErrors(null);
    setLoading(false);
    setTitle(post?.title ?? "");
    setContent(post?.content ?? "");
    setTag(post?.tagId ?? undefined);
    setStatus(post?.statusId ?? undefined);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen} >
        {post ? (
          <Button variant={'ghost'} onClick={onOpenDialog}>
            <FilePenLine height="20px" width="20px" />
          </Button>
        ) : (
          <Button variant="default" onClick={onOpenDialog} className="ml-5">
            <CirclePlus className="mr-2 h-4 w-4" />
            Submit Feedback
          </Button>
        )}
      <DialogContent>
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
          {errors?.title ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {errors.title?.join(', ')}
            </div>
          ) : null}
          {errors?.content ? (
            <div className="rounded p-2 bg-red-200 border border-red-400">
              {errors.content?.join(', ')}
            </div>
          ) : null}
          <div className='flex justify-between'>
            <div>
              <Select onValueChange={handleOnTagChange} defaultValue={selectedTag}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select a tag" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Tags</SelectLabel>
                    {
                      tags.map((tag) => {
                        return (
                          <SelectItem key={tag.id} value={tag.id}>{tag.slug}</SelectItem>
                        )
                      })
                    }
                  
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {(
              <div className='invisible'>
                <Select onValueChange={handleOnStatusChange} defaultValue={selectedStatus}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select a status"/>
                  </SelectTrigger>
                  <SelectContent className='mt-5'>
                    <SelectGroup>
                      <SelectLabel>Tags</SelectLabel>
                      {
                        status.map((st) => {
                          return (
                            <SelectItem key={st.id} value={st.id}>{st.description}</SelectItem>
                          )
                        })
                      }
                    
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          

          <DialogFooter>
            {post ? (
              <Button onClick={handleSavePostChange} variant="default" className='mt-5' disabled={loading} >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save changes
              </Button>
            ) : (
              <Button onClick={handleSubmitPost} variant="default" className='mt-5' disabled={loading} >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Post
              </Button>
            )}
          </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
