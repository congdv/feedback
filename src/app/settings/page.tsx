'use client';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

export default function Settings() {
  const { data: session, status, update } = useSession();
  const [name, setName] = useState(session?.user?.name ?? '');
  const [email, setEmail] = useState(session?.user?.email ?? '');
  if (status !== 'authenticated') {
    return null;
  }

  const onSaveChange = async () => {
    await update({ name: name, email: email });
  };
  return (
    <div>
      <div className="max-w-5xl py-4 pb-5 mx-auto">
        <Card>
          <CardTitle>
            <p className="p-5 text-2xl">Account Settings</p>
          </CardTitle>
          <CardContent>
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full max-w-sm items-center gap-1.5 mt-5">
              <Label htmlFor="email">Email</Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={onSaveChange}>Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
