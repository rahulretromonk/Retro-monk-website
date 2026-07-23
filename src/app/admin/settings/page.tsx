"use client";
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Key, Database, Save, Info } from 'lucide-react';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminInput } from '@/components/admin/ui/AdminInput';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import { useToast } from '@/components/admin/ui/AdminToast';

export default function SettingsAdminPage() {
  const { toast } = useToast();
  const [profileName, setProfileName] = useState('Studio Admin');
  const [profileEmail, setProfileEmail] = useState('retromonk.office@gmail.com');
  const [profileRole, setProfileRole] = useState('Chief Curator');
  
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isSavingProfile, setIsSavingProfile] = useState(false);
  const [isSavingPass, setIsSavingPass] = useState(false);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingProfile(true);
    setTimeout(() => {
      setIsSavingProfile(false);
      toast('success', 'Profile settings updated successfully (Simulated)');
    }, 600);
  };

  const handleSavePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) {
      toast('error', 'Please fill in both password fields.');
      return;
    }
    setIsSavingPass(true);
    setTimeout(() => {
      setIsSavingPass(false);
      setCurrentPassword('');
      setNewPassword('');
      toast('success', 'Administrator password updated successfully (Simulated)');
    }, 800);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      
      {/* Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <AdminCard radius="md" hoverLift={false} className="p-6 md:p-8 bg-[#F7F3EC] border border-[#7A5848]/10 h-full flex flex-col justify-between">
            <form onSubmit={handleSaveProfile} className="flex flex-col gap-4">
              <h3 className="text-lg font-serif font-black text-[#2D2D2D] tracking-wide border-b border-[#7A5848]/10 pb-4 mb-2 flex items-center gap-2">
                <User size={18} className="text-[#355C4A]" /> Profile Details
              </h3>

              <AdminInput
                label="Full Name"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                placeholder="e.g. Studio Admin"
              />

              <AdminInput
                label="Email Address"
                type="email"
                value={profileEmail}
                onChange={(e) => setProfileEmail(e.target.value)}
                placeholder="e.g. retromonk.office@gmail.com"
              />

              <AdminInput
                label="Admin Role"
                value={profileRole}
                onChange={(e) => setProfileRole(e.target.value)}
                placeholder="e.g. Chief Curator"
              />

              <AdminButton
                type="submit"
                variant="primary"
                isLoading={isSavingProfile}
                className="w-full flex items-center justify-center gap-1.5 mt-2"
              >
                <Save size={13} /> Update Profile
              </AdminButton>
            </form>
          </AdminCard>
        </motion.div>

        {/* Security Password Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.4 }}
        >
          <AdminCard radius="md" hoverLift={false} className="p-6 md:p-8 bg-[#F7F3EC] border border-[#7A5848]/10 h-full flex flex-col justify-between">
            <form onSubmit={handleSavePassword} className="flex flex-col gap-4">
              <h3 className="text-lg font-serif font-black text-[#2D2D2D] tracking-wide border-b border-[#7A5848]/10 pb-4 mb-2 flex items-center gap-2">
                <Key size={18} className="text-[#355C4A]" /> Security Gateway
              </h3>

              <AdminInput
                label="Current Password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="••••••••••••"
              />

              <AdminInput
                label="New Gateway Password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="••••••••••••"
              />

              <div className="py-2 text-[10px] text-[#7A5848]/60 italic font-sans flex items-start gap-1">
                <Info size={12} className="shrink-0 mt-0.5" />
                <span>Password resets are cached locally during the Demo session.</span>
              </div>

              <AdminButton
                type="submit"
                variant="primary"
                isLoading={isSavingPass}
                className="w-full flex items-center justify-center gap-1.5 mt-2"
              >
                <Save size={13} /> Change Password
              </AdminButton>
            </form>
          </AdminCard>
        </motion.div>

      </div>

      {/* Database Connection / Environment Variables Diagnostic */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.4 }}
      >
        <AdminCard radius="md" hoverLift={false} className="p-6 md:p-8 bg-[#F2EDE2]/60 border border-[#7A5848]/10">
          <h3 className="text-lg font-serif font-black text-[#2D2D2D] tracking-wide border-b border-[#7A5848]/10 pb-4 mb-4 flex items-center gap-2">
            <Database size={18} className="text-[#355C4A]" /> Diagnostics & Environment Variables
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs font-sans">
            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#7A5848] uppercase text-[10px] tracking-wider">Supabase Connection Settings</span>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">Supabase Service Url</span>
                <code className="text-[#355C4A] font-mono select-all">https://qrcffyxwzol...</code>
              </div>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">Publishable Key Status</span>
                <span className="text-[#355C4A] font-bold">Configured (sb_pub...)</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">Tables State</span>
                <span className="text-amber-700 font-bold">Fallback Local JSON Active</span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-bold text-[#7A5848] uppercase text-[10px] tracking-wider">Cloudinary Upload Status</span>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">Cloud Name</span>
                <code className="text-[#355C4A] font-mono">v5svoex0</code>
              </div>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">API Secret Status</span>
                <span className="text-[#355C4A] font-bold">Active / Configured</span>
              </div>
              <div className="flex justify-between py-1 border-b border-[#7A5848]/5">
                <span className="text-[#7A5848]/70">Bypass Mode Status</span>
                <span className="text-[#355C4A] font-bold">Demo Mode Permitted</span>
              </div>
            </div>
          </div>
        </AdminCard>
      </motion.div>

    </div>
  );
}
