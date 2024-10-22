'use client';

import { useForm } from 'react-hook-form';
import { Card, CardContent, CardHeader } from '../ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import * as z from 'zod';
import { PostSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useState, useTransition } from 'react';
import { newPost, updatePost } from '@/actions/post';
import { FormError } from '../form-error';
import { FormSuccess } from '../form-success';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { SelectValue } from '@radix-ui/react-select';
import type { Tag, Status } from '@prisma/client';
import { PostWithTagStatusAndReaction } from '@/db/queries/post';

interface PostFormInterface {
  tags?: Tag[];
  status?: Status[];
  post?: PostWithTagStatusAndReaction;
  afterSubmit: () => void;
}

export const PostForm = ({ tags, status, post, afterSubmit }: PostFormInterface) => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const form = useForm<z.infer<typeof PostSchema>>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      postId: post?.id || undefined,
      title: post?.title || undefined,
      content: post?.content || undefined,
      tagId: post?.tagId || undefined,
      statusId: post?.statusId || undefined,
    },
  });
  const onSubmit = (values: z.infer<typeof PostSchema>) => {
    setError(undefined);
    setSuccess(undefined);
    if(!post) {
      startTransition(() => {
        newPost(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
          })
          .catch(() => {
            setError('Something went wrong!');
          });
      });
    } else {
      startTransition(() => {
        updatePost(values)
          .then((data) => {
            if (data?.error) {
              form.reset();
              setError(data.error);
            }
            afterSubmit();
          })

          .catch(() => {
            setError('Something went wrong!');
          });
      });
    }
   
  };

  return (
    <Card className="min-w-[400px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">New Post</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Write title of your request"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Textarea
                        {...field}
                        placeholder="Write your description"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {tags && tags.length > 0 && (
                <FormField
                  control={form.control}
                  name="tagId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tag</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a tag" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {tags.map((tag) => {
                            return (
                              <SelectItem key={tag.id} value={tag.id}>
                                {tag.description}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
              {status && status.length > 0 && (
                <FormField
                  control={form.control}
                  name="statusId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <Select
                        disabled={isPending}
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {status.map((tag) => {
                            return (
                              <SelectItem key={tag.id} value={tag.id}>
                                {tag.description}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
            <FormError message={error} />
            <FormSuccess message={success} />
            <Button type="submit" disabled={isPending} size={'lg'}>
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
