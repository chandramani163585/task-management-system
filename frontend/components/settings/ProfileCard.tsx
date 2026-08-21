import React from 'react';
import { User } from '@/lib/types';
import { Avatar } from '@/components/ui/Avatar';

interface ProfileCardProps {
  user: User;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  return (
    <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 flex flex-col items-center text-center">
      <div className="mb-6 relative">
        <Avatar src={user.avatar_url} fallback={(user.name || user.full_name || user.username || 'U').charAt(0).toUpperCase()} size="xl" />
      </div>
      <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-1">
        {user.name || user.full_name || 'No Name'}
      </h2>
      <p className="font-body-md text-body-md text-on-surface-variant mb-4">
        {user.title || 'No Title'}
      </p>
      
      <div className="w-full h-px bg-outline-variant mb-6"></div>
      
      <div className="w-full flex flex-col gap-4 text-left">
        <div>
          <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Email Address</span>
          <span className="font-body-md text-body-md text-on-surface">{user.email}</span>
        </div>
        <div>
          <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Username</span>
          <span className="font-body-md text-body-md text-on-surface">@{user.username}</span>
        </div>
        {user.bio && (
          <div>
            <span className="font-label-sm text-label-sm text-on-surface-variant block mb-1">Bio</span>
            <span className="font-body-md text-body-md text-on-surface">{user.bio}</span>
          </div>
        )}
      </div>
    </div>
  );
}
