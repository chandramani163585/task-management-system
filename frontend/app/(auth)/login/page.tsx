'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/hooks/useAuth';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, loginAsGuest, isLoading, error } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      router.push('/tasks');
    } catch (err) {
      // Error handled by hook/toast
    }
  };

  const handleGuestLogin = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await loginAsGuest();
      router.push('/tasks');
    } catch (err) {
      // Error handled by hook/toast
    }
  };

  return (
    <div className="w-full max-w-[400px] flex flex-col items-center">
      {/* Brand Logo Area */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-8 h-8 bg-inverse-surface rounded flex items-center justify-center">
          <span className="material-symbols-outlined text-inverse-on-surface" style={{ fontSize: '20px', fontVariationSettings: "'FILL' 1" }}>change_history</span>
        </div>
        <span className="font-headline-md text-on-surface tracking-tight">Pyramid</span>
      </div>

      {/* Main Card */}
      <div className="w-full bg-surface border border-outline-variant rounded-[1.5rem] p-8 md:p-10 shadow-sm relative overflow-hidden">
        {/* Header Text */}
        <div className="text-center mb-6">
          <h1 className="font-headline-lg text-on-surface mb-2">Let's get back on track</h1>
          <p className="font-body-md text-on-surface-variant">Enter your email below to login to your account.</p>
        </div>

        {error && <div className="mb-4 text-error text-sm text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input 
            type="email" 
            placeholder="Email address" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <Button type="submit" className="w-full mt-2" isLoading={isLoading}>
            Login
          </Button>
          
          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-outline-variant"></div>
            <span className="flex-shrink-0 mx-4 text-on-surface-variant text-sm">or</span>
            <div className="flex-grow border-t border-outline-variant"></div>
          </div>

          <button 
            type="button" 
            className="w-full bg-surface hover:bg-surface-variant border border-outline-variant text-on-surface font-label-md py-3.5 px-4 rounded-xl transition-colors duration-200 flex items-center justify-center gap-3"
            disabled={isLoading}
          >
            <svg height="18" viewBox="0 0 24 24" width="18" xmlns="http://www.w3.org/2000/svg">
              <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                <path d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" fill="#4285F4"></path>
                <path d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" fill="#34A853"></path>
                <path d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" fill="#FBBC05"></path>
                <path d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" fill="#EA4335"></path>
              </g>
            </svg>
            Login with Google
          </button>
          
          <button 
            type="button" 
            onClick={handleGuestLogin}
            disabled={isLoading}
            className="w-full text-center mt-2 text-on-surface-variant hover:text-primary transition-colors text-sm disabled:opacity-50"
          >
            Continue as Guest
          </button>
        </form>
      </div>

      {/* Footer Links */}
      <div className="mt-6 text-center max-w-[280px]">
        <p className="font-label-sm text-on-surface-variant leading-relaxed opacity-80">
          By clicking continue, you agree to our <a href="#" className="text-on-surface underline hover:text-primary transition-colors">Terms of Service</a> and <a href="#" className="text-on-surface underline hover:text-primary transition-colors">Privacy Policy</a>
        </p>
      </div>
    </div>
  );
}
