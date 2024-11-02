'use client';
import { FormError } from '@/components/form-error';
import { FormSuccess } from '@/components/form-success';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useCurrentUser } from '@/hooks/use-current-user';
import { OrganizationSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useEffect, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from "zod";
import { Skeleton } from './ui/skeleton';
import { newOrganization } from '@/actions/new-organization';
import { useRouter } from 'next/navigation';
import paths from '@/paths';

export const OrganizationForm = () => {
  const router = useRouter();
  const session = useSession();
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();


const form = useForm<z.infer<typeof OrganizationSchema>>({
    resolver: zodResolver(OrganizationSchema),
    defaultValues: {
      name: "",
    }
  })


  useEffect(() => {
    if(user) {
      form.reset({
        name: "",
      })
    }
  }, [user])

  const onSubmit = async (values: z.infer<typeof OrganizationSchema>) => {
    startTransition(() => {
      newOrganization(values)
      .then((data) => {
        if (data?.error) {
          setError(data.error);
        }

        if (data?.success) {
          setSuccess(data.success);
          router.push(paths.organizationShow(values.name))
        }
      }).catch(() => setError('Something went wrong!'));
    })
  };

  if(session.status === "loading") {
    return (
      <div className="max-w-xl py-4 pb-5 mx-auto">
        <Skeleton className="h-8 min-w-64 min-h-32" />
      </div>
    )
  }
  return (
    <div className="max-w-xl py-4 pb-5 mx-auto">
      <Card>
        <CardTitle>
          <p className="text-2xl font-semibold text-center pt-5">Create new organization</p>
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
              <div className='space-y-4'>
                <FormField control={form.control}
                  name='name'
                  render={({field}) => (
                    <FormItem>
                      <FormLabel>Organization Name</FormLabel>
                      <FormControl>
                        <Input  placeholder='new-organization' disabled={isPending} {...field}/>
                      </FormControl>
                    </FormItem>
                  )}/>
              </div>
              <FormError message={error} />
              <FormSuccess message={success} />
              <Button type="submit" className='w-full'>Create</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
