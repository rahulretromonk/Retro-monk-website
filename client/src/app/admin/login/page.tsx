"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogIn } from 'lucide-react';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { useToast } from '@/components/admin/ui/AdminToast';

export default function AdminLoginPage() {
  const router = useRouter();
  const { toast } = useToast();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const loginTime = localStorage.getItem('admin_login_time');
    
    if (token && loginTime) {
      if (Date.now() - parseInt(loginTime, 10) < 7200000) {
        router.push('/admin');
        return;
      }
    }
    
    // Clear expired or invalid session data
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_login_time');
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
          localStorage.setItem('admin_login_time', Date.now().toString());
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
            Staff portal
          </span>
          <div className="flex justify-center mt-6">
            <img 
              src="/llooggoo.png" 
              alt="Retro Monk" 
              className="h-16 md:h-20 w-auto object-contain" 
            />
          </div>
          <p className="text-xs text-[#7A5848]/70 mt-1 italic font-serif">
            Timeless details, managed with intention
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignIn} className="flex flex-col gap-1" autoComplete="off">
          <AdminInput
            label="Email Address"
            type="email"
            name="admin_email_input"
            placeholder="admin@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
            autoComplete="off"
          />
          <AdminInput
            label="Password"
            type="password"
            name="admin_password_input"
            placeholder="••••••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
            autoComplete="new-password"
          />

          <AdminButton
            type="submit"
            variant="primary"
            isLoading={isLoading}
            className="w-full mt-4"
          >
            <LogIn size={15} className="mr-2" /> Sign In
          </AdminButton>
        </form>

      </motion.div>
    </div>
  );
}
