'use client';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useCurrentUser } from '@/hooks/use-current-user';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";

export default function Settings() {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();


  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      name: user?.name || undefined,
      email: user?.email || undefined
    }
  })


  const onSubmit = async () => {
  };
  return (
    <div>
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
                          <Input {...field} placeholder='John Doe' disabled={isPending}/>
                        </FormControl>
                      </FormItem>
                    )}/>
                  <FormField control={form.control}
                    name='email'
                    render={({field}) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder='john@email.com' disabled={isPending} type='email'/>
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
    </div>
  );
}
