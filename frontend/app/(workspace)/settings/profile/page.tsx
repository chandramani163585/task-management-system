'use client';

import React from 'react';
import { useAuth } from '@/lib/hooks/useAuth';
import ProfileCard from '@/components/settings/ProfileCard';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';

export default function ProfilePage() {
  const { user } = useAuth();

  if (!user) return <div className="p-8">Loading profile...</div>;

  return (
    <div className="max-w-3xl mx-auto py-8 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Profile Settings</h1>
        <Link href="/settings/profile/edit">
          <Button variant="secondary">
            Edit Profile
          </Button>
        </Link>
      </div>
      
      <ProfileCard user={user} />
      
      <div className="mt-8 pt-8 border-t border-outline-variant">
        <h3 className="text-error font-medium mb-2">Danger Zone</h3>
        <Button variant="danger" onClick={() => confirm('Are you sure?')}>
          Leave Workspace
        </Button>
      </div>
    </div>
  );
}
