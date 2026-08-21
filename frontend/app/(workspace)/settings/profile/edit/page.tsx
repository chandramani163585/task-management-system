'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { usersApi } from '@/lib/api/users';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import toast from 'react-hot-toast';

export default function EditProfilePage() {
  const { user, hydrate } = useAuth();
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [title, setTitle] = useState('');
  const [bio, setBio] = useState('');
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.full_name || user.name || '');
      setUsername(user.username || '');
      setTitle(user.title || '');
      setBio(user.bio || '');
      setAvatarPreview(user.avatar_url || null);
    }
  }, [user]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setAvatarPreview(url);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (selectedFile) {
        await usersApi.uploadAvatar(selectedFile);
      }
      await usersApi.updateProfile({
        name,
        username,
        title,
        bio,
      });
      await hydrate();
      toast.success('Profile updated successfully');
      router.push('/settings/profile');
    } catch (err: any) {
      toast.error(err?.message || 'Failed to update profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto w-full py-8 px-6">
      <div className="mb-8">
        <h1 className="font-headline-lg text-headline-lg font-bold text-on-surface">Edit Profile</h1>
        <p className="font-body-md text-body-md text-on-surface-variant mt-2">Update your personal information and preferences.</p>
      </div>

      <div className="bg-surface border border-outline-variant rounded-2xl p-6 md:p-8 shadow-sm">
        {/* Profile Picture Upload Section */}
        <div className="flex items-start gap-6 mb-8 pb-8 border-b border-outline-variant">
          <div 
            className="relative group cursor-pointer"
            onClick={() => fileInputRef.current?.click()}
          >
            <Avatar 
              src={avatarPreview} 
              fallback={name?.charAt(0) || username?.charAt(0) || 'U'} 
              size="xl" 
            />
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="material-symbols-outlined text-white">photo_camera</span>
            </div>
            <input 
              type="file" 
              ref={fileInputRef} 
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
            />
          </div>

          <div className="flex-1">
            <h2 className="font-headline-md text-headline-md font-semibold text-on-surface mb-1">Profile Picture</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-4">Upload a new avatar. Recommended size is 256x256px.</p>
            <Button 
              type="button" 
              variant="secondary" 
              size="sm"
              onClick={() => fileInputRef.current?.click()}
            >
              Change Picture
            </Button>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-label-md text-label-md font-semibold text-on-surface mb-2">Full Name</label>
              <Input 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="Dexter Morgan"
                required
              />
            </div>
            <div>
              <label className="block font-label-md text-label-md font-semibold text-on-surface mb-2">Username</label>
              <Input 
                value={username} 
                onChange={(e) => setUsername(e.target.value)} 
                placeholder="dexter"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-label-md text-label-md font-semibold text-on-surface mb-2">Title / Role</label>
            <Input 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Blood Splatter Analyst / Senior Engineer"
            />
          </div>

          <div>
            <label className="block font-label-md text-label-md font-semibold text-on-surface mb-2">Bio</label>
            <textarea
              className="w-full rounded-card border border-outline-variant bg-surface px-4 py-3 text-body-md text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
              rows={4}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="Tell something about yourself..."
            />
          </div>

          <div className="flex items-center justify-end gap-3 pt-6 border-t border-outline-variant">
            <Button 
              type="button" 
              variant="ghost"
              onClick={() => router.push('/settings/profile')}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              variant="primary"
              isLoading={isSaving}
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
