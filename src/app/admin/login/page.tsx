"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'framer-motion';
import { LogIn, Sparkles } from 'lucide-react';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { useToast } from '@/components/admin/ui/AdminToast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isDemoLoading, setIsDemoLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      router.push('/admin');
    }
  }, [router]);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast('error', 'Please enter both email and password.');
      return;
    }

     setIsLoading(true);
     try {
       const response = await fetch('/api/admin/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email, password })
       });
       const data = await response.json();
       if (!response.ok) {
         throw new Error(data.error || 'Authentication failed');
       }
       if (data.token) {
         localStorage.setItem('admin_token', data.token);
         toast('success', 'Welcome back! Authentication successful.');
         router.push('/admin');
       } else {
         throw new Error('Failed to retrieve session token.');
       }
     } catch (err: any) {
       console.error(err);
       toast('error', err.message || 'Authentication failed. Please verify your credentials.');
     } finally {
       setIsLoading(false);
     }
   };
 
   const handleDemoAccess = async () => {
     setIsDemoLoading(true);
     try {
       const response = await fetch('/api/admin/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ email: 'retromonk.office@gmail.com', password: 'adminpassword' })
       });
       const data = await response.json();
       if (!response.ok) throw new Error(data.error);
       localStorage.setItem('admin_token', data.token);
       toast('success', 'Logged in as administrator (Demo Mode enabled)');
       router.push('/admin');
     } catch (err: any) {
       toast('error', 'Failed to initialize demo access token.');
     } finally {
       setIsDemoLoading(false);
     }
   };

  return (
    <div className="min-h-screen bg-[#F4F0EA] flex items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Background Arch Art */}
      <div className="absolute w-[600px] h-[600px] rounded-full bg-[#E8DCCB]/25 -top-40 -left-40 pointer-events-none" />
      <div className="absolute w-[400px] h-[800px] rounded-t-full bg-[#E8DCCB]/20 -bottom-20 -right-20 pointer-events-none transform rotate-12" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-[#F7F3EC] border border-[#7A5848]/20 shadow-2xl p-8 md:p-10 relative z-10"
        style={{ borderRadius: '36px' }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <span className="text-[10px] font-sans font-black tracking-widest text-[#355C4A] uppercase bg-[#355C4A]/10 px-4 py-1.5 rounded-full">
            Darkroom Gateway
          </span>
          <h2 className="text-3xl md:text-4xl font-serif font-black text-[#7A5848] mt-4 tracking-wide leading-tight">
            Archival Studio
          </h2>
          <p className="text-xs text-[#7A5848]/70 mt-1 italic font-serif">
            Timeless details, managed with intention
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-1">
          <AdminInput
            label="Email Address"
            type="email"
            placeholder="retromonk.office@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading || isDemoLoading}
          />
          <AdminInput
            label="Password"
            type="password"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading || isDemoLoading}
          />

          <AdminButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            disabled={isDemoLoading}
            className="w-full mt-4"
          >
            <LogIn size={15} className="mr-2" /> Sign In
          </AdminButton>
        </form>

        <div className="relative my-8 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#7A5848]/15" />
          </div>
          <span className="relative bg-[#F7F3EC] px-4 text-[10px] font-bold tracking-widest text-[#7A5848]/50 uppercase">
            OR
          </span>
        </div>

        {/* Demo mode quick entrance */}
        <div className="flex flex-col items-center">
          <p className="text-[10px] text-[#7A5848]/70 text-center mb-3">
            Want to review the dashboard layout and features immediately?
          </p>
          <AdminButton
            type="button"
            variant="outline"
            onClick={handleDemoAccess}
            isLoading={isDemoLoading}
            disabled={isLoading}
            className="w-full border-[#355C4A]/40 text-[#355C4A] hover:bg-[#355C4A]/10 flex items-center justify-center gap-1.5"
          >
            <Sparkles size={14} /> Explore Demo Mode
          </AdminButton>
        </div>

      </motion.div>
    </div>
  );
}
