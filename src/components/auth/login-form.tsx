import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { CardWrapper } from "./card-wrapper"
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { useState, useTransition } from "react";
import { FormSuccess } from "../form-success";
import { FormError } from "../form-error";
import { Button } from "../ui/button";
import { signIn } from "next-auth/react";


export const LoginForm = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isLoading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      code: ""
    }
  })
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
    setLoading(true);
    startTransition(() => {
      signIn("resend", {
        email: values.email,
        redirect: false
      }).then((res) => {
        if(res?.ok && !res?.error) {
          form.reset();
          setSuccess("Email sent - check your inbox!")
        } else {
          setError("Error sending email - try again?")
        }
      }).finally(() => setLoading(false))
    })
  };
  return (
    <CardWrapper headerLabel="Welcome" showSocial>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="joe.doe@example.com"
                    disabled={isPending}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending || isLoading}>
            Submit
          </Button>
        </form>
      </Form>
    </CardWrapper>
  )
}