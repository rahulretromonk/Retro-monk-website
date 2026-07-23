"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Layers, 
  Database, 
  MessageSquare, 
  Inbox,
  TrendingUp,
  Clock,
  CheckCircle,
  Calendar
} from 'lucide-react';
import { AdminCard } from '@/components/admin/ui/AdminCard';
import { AdminSkeleton } from '@/components/admin/ui/AdminSkeleton';
import { AdminButton } from '@/components/admin/ui/AdminButton';
import Link from 'next/link';

interface DashboardStats {
  totalPhotos: number;
  categoriesCount: number;
  storageUsed: number; // in MB
  testimonialsCount: number;
  pendingInquiries: number;
  recentInquiries: any[];
  cloudinaryRemaining: string;
  cloudinaryPercentage: number;
  cloudinaryDesc: string;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('admin_token');
        const headers: HeadersInit = token ? { Authorization: `Bearer ${token}` } : {};

        // Fetch data in parallel
        const [portRes, testRes, inqRes, cloudRes] = await Promise.all([
          fetch('/api/admin/portfolio', { headers }),
          fetch('/api/admin/testimonials', { headers }),
          fetch('/api/admin/inquiries', { headers }),
          fetch('/api/admin/cloudinary-stats', { headers }),
        ]);

        const portfolios = portRes.ok ? await portRes.json() : [];
        const testimonials = testRes.ok ? await testRes.json() : [];
        const inquiries = inqRes.ok ? await inqRes.json() : [];
        
        let cloudinaryRemaining = '25.0 GB';
        let cloudinaryPercentage = 0;
        let cloudinaryDesc = 'Remaining of 25 GB limit';

        if (cloudRes.ok) {
          const cloudData = await cloudRes.json();
          if (cloudData.isFallback) {
            // Fallback calculation (mock limit)
            const totalPhotos = portfolios.length;
            const storageUsed = Number((totalPhotos * 1.25).toFixed(1)); 
            const remainingMb = Number((50 - storageUsed).toFixed(1));
            cloudinaryRemaining = `${remainingMb} MB`;
            cloudinaryPercentage = Math.min((storageUsed / 50) * 100, 100);
            cloudinaryDesc = '50 MB Studio limit';
          } else {
            cloudinaryRemaining = `${cloudData.remainingGb} GB`;
            cloudinaryPercentage = cloudData.usedPercentage;
            cloudinaryDesc = `Remaining of ${cloudData.limitGb} GB limit`;
          }
        } else {
          // Fallback if API is unavailable
          const totalPhotos = portfolios.length;
          const storageUsed = Number((totalPhotos * 1.25).toFixed(1)); 
          const remainingMb = Number((50 - storageUsed).toFixed(1));
          cloudinaryRemaining = `${remainingMb} MB`;
          cloudinaryPercentage = Math.min((storageUsed / 50) * 100, 100);
          cloudinaryDesc = '50 MB Studio limit';
        }

        // Calculate metrics
        const totalPhotos = portfolios.length;
        
        const uniqueCategories = new Set(portfolios.map((p: any) => p.category));
        const categoriesCount = uniqueCategories.size || 0;
        
        // Simulating 1.2MB per photo
        const storageUsed = Number((totalPhotos * 1.25).toFixed(1)); 

        const testimonialsCount = testimonials.length;
        const pendingInquiries = inquiries.filter((i: any) => i.status === 'pending').length;

        setStats({
          totalPhotos,
          categoriesCount,
          storageUsed,
          testimonialsCount,
          pendingInquiries,
          recentInquiries: inquiries.slice(0, 3),
          cloudinaryRemaining,
          cloudinaryPercentage,
          cloudinaryDesc
        });
      } catch (err) {
        console.error("Failed to load dashboard metrics:", err);
      } finally {
        setIsLoading(false);
      }
    }

    loadStats();
  }, []);

  // SVG Progress Ring Circle calculations
  const renderProgressRing = (percentage: number, colorClass: string) => {
    const radius = 18;
    const circumference = 2 * Math.PI * radius;
    const safePercent = isNaN(percentage) || typeof percentage !== 'number' ? 0 : percentage;
    const strokeDashoffset = circumference - (Math.min(safePercent, 100) / 100) * circumference;

    return (
      <svg className="w-10 h-10 transform -rotate-90">
        <circle
          cx="20"
          cy="20"
          r={radius}
          className="stroke-[#E8DCCB] fill-none"
          strokeWidth="3.5"
        />
        <circle
          cx="20"
          cy="20"
          r={radius}
          className={`fill-none transition-all duration-500 ${colorClass}`}
          strokeWidth="3.5"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </svg>
    );
  };

  if (isLoading || !stats) {
    return <AdminSkeleton type="analytics" />;
  }

  // Analytics widget card configurations
  const cards = [
    {
      label: 'Total Photos',
      value: stats.totalPhotos,
      icon: Camera,
      percent: Math.min(stats.totalPhotos * 3, 100),
      color: 'stroke-[#355C4A]',
      desc: 'Active curated works',
    },
    {
      label: 'Categories',
      value: stats.categoriesCount,
      icon: Layers,
      percent: Math.min(stats.categoriesCount * 14, 100),
      color: 'stroke-[#7A5848]',
      desc: 'Active portfolios',
    },
    {
      label: 'Storage Remaining',
      value: stats.cloudinaryRemaining,
      icon: Database,
      percent: stats.cloudinaryPercentage,
      color: 'stroke-[#355C4A]',
      desc: stats.cloudinaryDesc,
    },
    {
      label: 'Testimonials',
      value: stats.testimonialsCount,
      icon: MessageSquare,
      percent: Math.min(stats.testimonialsCount * 20, 100),
      color: 'stroke-[#7A5848]',
      desc: 'Client review notes',
    },
    {
      label: 'Pending Inquiries',
      value: stats.pendingInquiries,
      icon: Inbox,
      percent: stats.pendingInquiries > 0 ? 75 : 0,
      color: 'stroke-red-500',
      desc: 'Awaiting responses',
    },
  ];

  return (
    <div className="w-full">
      
      {/* Overview Analytics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
        {cards.map((card, index) => {
          const Icon = card.icon;
          return (
            <motion.div
              key={card.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05, duration: 0.4 }}
            >
              <AdminCard 
                radius="sm" 
                hoverLift={true} 
                className="bg-[#F7F3EC] border border-[#7A5848]/10 p-6 flex flex-col justify-between h-38 relative overflow-hidden"
              >
                {/* Icon Header */}
                <div className="flex justify-between items-start">
                  <div className="w-9 h-9 rounded-full bg-[#E8DCCB]/40 flex items-center justify-center text-[#7A5848] shrink-0 border border-[#7A5848]/5">
                    <Icon size={16} />
                  </div>
                  {renderProgressRing(card.percent, card.color)}
                </div>

                {/* Typography Values */}
                <div className="mt-4">
                  <h3 className="text-2xl md:text-3xl font-serif font-black text-[#2D2D2D] leading-none tracking-wide">
                    {card.value}
                  </h3>
                  <p className="text-[10px] font-sans font-bold uppercase tracking-wider text-[#7A5848] mt-2">
                    {card.label}
                  </p>
                  <p className="text-[9px] font-sans text-[#7A5848]/50 mt-0.5">
                    {card.desc}
                  </p>
                </div>
              </AdminCard>
            </motion.div>
          );
        })}
      </div>

      {/* Main Bottom Section: Recent Inquiries Inbox details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Inquiries Panel */}
        <div className="lg:col-span-2">
          <AdminCard radius="md" hoverLift={false} className="p-6 md:p-8 bg-[#F7F3EC] border border-[#7A5848]/10">
            <div className="flex justify-between items-center mb-6 border-b border-[#7A5848]/10 pb-4">
              <h3 className="text-lg md:text-xl font-serif font-black text-[#2D2D2D] tracking-wide flex items-center gap-2">
                <Clock size={18} className="text-[#355C4A]" /> Recent Booking Inquiries
              </h3>
              <Link href="/admin/inquiries">
                <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#355C4A] hover:text-[#2b4c3c] transition-colors">
                  View Inbox &rarr;
                </span>
              </Link>
            </div>

            {stats.recentInquiries.length === 0 ? (
              <div className="py-8 text-center text-xs font-sans text-[#7A5848]/60 italic">
                No recent booking inquiries available.
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                {stats.recentInquiries.map((inq: any) => (
                  <div 
                    key={inq.id}
                    className="flex items-center justify-between p-4 rounded-[20px] bg-[#FAF8F5] border border-[#7A5848]/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-[#355C4A]/10 text-[#355C4A] flex items-center justify-center font-bold text-xs">
                        {inq.clientName.substring(0, 2).toUpperCase()}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-xs font-sans font-bold text-[#2D2D2D]">{inq.clientName}</span>
                        <span className="text-[9px] font-sans text-[#7A5848]/70 mt-0.5">{inq.eventType} Package</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-[9px] font-sans text-[#7A5848]/50 hidden sm:inline">
                        {new Date(inq.submittedDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      {inq.status === 'responded' ? (
                        <span className="bg-[#355C4A]/15 text-[#355C4A] border border-[#355C4A]/20 text-[8px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          Responded
                        </span>
                      ) : inq.status === 'reviewed' ? (
                        <span className="bg-[#7A5848]/15 text-[#7A5848] border border-[#7A5848]/20 text-[8px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full">
                          Reviewed
                        </span>
                      ) : (
                        <span className="bg-red-500/10 text-red-600 border border-red-500/15 text-[8px] font-sans font-bold uppercase tracking-widest px-2.5 py-1 rounded-full animate-pulse">
                          Pending
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </AdminCard>
        </div>

        {/* Quick Tips & Status Widget */}
        <div className="lg:col-span-1 flex flex-col gap-6">
          <AdminCard radius="md" hoverLift={false} className="p-6 md:p-8 bg-[#F2EDE2]/60 border border-[#7A5848]/10 h-full flex flex-col justify-between">
            <div>
              <h3 className="text-lg font-serif font-black text-[#2D2D2D] tracking-wide border-b border-[#7A5848]/10 pb-4 mb-4 uppercase text-[11px] tracking-widest text-[#7A5848]">
                Darkroom Assistant
              </h3>
              
              <ul className="flex flex-col gap-4 font-sans text-xs text-[#7A5848] leading-relaxed">
                <li className="flex gap-2.5 items-start">
                  <CheckCircle size={14} className="text-[#355C4A] shrink-0 mt-0.5" />
                  <span>Your images are automatically compressed and formatted dynamically (JPG/PNG/WEBP).</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle size={14} className="text-[#355C4A] shrink-0 mt-0.5" />
                  <span>Opt for high-resolution vertical uploads for portraits and horizontal crops for headers.</span>
                </li>
                <li className="flex gap-2.5 items-start">
                  <CheckCircle size={14} className="text-[#355C4A] shrink-0 mt-0.5" />
                  <span>The dashboard fallback system caches offline items locally when Supabase databases are empty.</span>
                </li>
              </ul>
            </div>

            <div className="mt-8 border-t border-[#7A5848]/10 pt-4 flex justify-between items-center text-[10px] font-sans text-[#7A5848]/60 font-bold uppercase">
              <span>Database Connection</span>
              <span className="flex items-center gap-1.5 text-[#355C4A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#355C4A]" /> Fallback Cache Active
              </span>
            </div>
          </AdminCard>
        </div>

      </div>

    </div>
  );
}
