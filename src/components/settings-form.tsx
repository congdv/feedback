'use client';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { Skeleton } from './ui/skeleton';
import { settings } from '@/actions/settings';

export const SettingsForm = () => {
  const session = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();


  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || ""
    }
  })


  useEffect(() => {
    if(user) {
      form.reset({
        name: user?.name || "",
        email: user?.email || ""
      })
    }
  }, [user])

  const onSubmit = async (values: z.infer<typeof SettingsSchema>) => {
    startTransition(() => {
      settings(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          session.update();
          setSuccess(data.success);
        }
      }).catch(() => setError('Something went wrong!'));
    })
  };

  if(session.status === "loading") {
    return (
      <div className="max-w-5xl py-4 pb-5 mx-auto">
        <Skeleton className="h-8 min-w-64 min-h-32" />
      </div>
    )
  }
  return (
    <div className="max-w-5xl py-4 pb-5 mx-auto">
      <Card>
        <CardTitle>
          <p className="text-2xl font-semibold text-center pt-5">Settings</p>
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <FormField control={form.control}
                  name='name'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input  placeholder='John Doe' disabled={isPending} {...field}/>
                      </FormControl>
                    </FormItem>
                  )}/>
                <FormField control={form.control}
                  name='email'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input  placeholder='john@email.com' disabled={true} type='email' {...field}/>
                      </FormControl>
                    </FormItem>
                  )}/>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit">Save</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
