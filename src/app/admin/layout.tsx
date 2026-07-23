"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, 
  Camera, 
  ClipboardList, 
  MessageSquare, 
  HelpCircle, 
  Inbox, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  Sun,
  Moon,
  Search,
  User
} from 'lucide-react';
import { ToastProvider, useToast } from '@/components/admin/ui/AdminToast';

// Sidebar Nav Items definitions
const NAV_ITEMS = [
  { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
  { label: 'Portfolio', path: '/admin/portfolio', icon: Camera },
  { label: 'Services', path: '/admin/services', icon: ClipboardList },
  { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
  { label: 'FAQ', path: '/admin/faq', icon: HelpCircle },
  { label: 'Inquiries', path: '/admin/inquiries', icon: Inbox },
];

function AdminLayoutContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const [profileName, setProfileName] = useState('Rahul');
  const [profileRole, setProfileRole] = useState('Chief Curator');

  // 1. Auth check & profile loading
  useEffect(() => {
    setIsMounted(true);
    const token = localStorage.getItem('admin_token');
    
    let isTokenValid = false;
    if (token) {
      try {
        const parts = token.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
          const now = Math.floor(Date.now() / 1000);
          if (payload.exp && now < payload.exp) {
            isTokenValid = true;
          }
        }
      } catch (err) {
        console.error("Layout validation error:", err);
      }
    }

    if (!isTokenValid && !pathname.endsWith('/admin/login') && pathname.startsWith('/admin')) {
      localStorage.removeItem('admin_token');
      router.push('/admin/login');
    }

    // Load admin profile settings
    const loadProfile = () => {
      const name = localStorage.getItem('admin_profile_name') || 'Rahul';
      const role = localStorage.getItem('admin_profile_role') || 'Chief Curator';
      setProfileName(name);
      setProfileRole(role);
    };

    loadProfile();
    window.addEventListener('admin-profile-update', loadProfile);
    return () => {
      window.removeEventListener('admin-profile-update', loadProfile);
    };
  }, [pathname, router]);

  if (!isMounted) {
    return (
      <div className="min-h-screen bg-[#F7F3EC] flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-[#355C4A] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // If we are on the login page, render child component directly (bypass layout)
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    router.push('/admin/login');
  };

  const getPageTitle = () => {
    const item = NAV_ITEMS.find(i => i.path === pathname) || { label: 'Admin Panel' };
    if (pathname === '/admin/settings') return 'Settings';
    return item.label;
  };

  const getPageSubtitle = () => {
    switch (pathname) {
      case '/admin':
        return 'Overview & statistics of your digital darkroom';
      case '/admin/portfolio':
        return 'Manage and curate your featured photographic collection';
      case '/admin/services':
        return 'Customize your service packages and rates';
      case '/admin/testimonials':
        return 'Manage client reviews and feedback';
      case '/admin/faq':
        return 'Update frequently asked questions';
      case '/admin/inquiries':
        return 'Respond to client inquiries and bookings';
      case '/admin/settings':
        return 'Configure your admin profile settings';
      default:
        return 'Photography Portfolio Administration';
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF6EE] text-[#2D2D2D] flex flex-col md:flex-row relative">
      
      {/* Desktop & Tablet Curved Sidebar */}
      <aside 
        className={`fixed md:sticky top-0 left-0 bottom-0 z-30 w-72 bg-[#F2EDE2] border-r border-[#7A5848]/10 p-6 flex flex-col justify-between transition-transform duration-300 ease-in-out md:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ borderTopRightRadius: '32px', borderBottomRightRadius: '32px' }}
      >
        <div className="flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex items-center justify-between">
            <Link href="/" className="flex flex-col">
              <span className="text-xl font-serif font-black tracking-wide text-[#7A5848]">
                Archival Studio
              </span>
              <span className="text-[10px] font-sans font-bold tracking-widest text-[#355C4A] uppercase">
                Studio Admin
              </span>
            </Link>
            <button 
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center border border-[#7A5848]/20 text-[#7A5848] hover:bg-[#E8DCCB]/40 cursor-pointer"
            >
              <X size={14} />
            </button>
          </div>

          {/* Admin Info Profile */}
          <div className="flex items-center gap-3 bg-[#E8DCCB]/30 p-3 rounded-[20px] border border-[#7A5848]/5 select-none">
            <div className="w-10 h-10 rounded-full overflow-hidden bg-[#7A5848]/20 flex items-center justify-center text-[#7A5848] font-bold text-sm">
              {profileName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'R'}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-xs font-sans font-bold text-[#2D2D2D] truncate max-w-[140px]" title={profileName}>{profileName}</span>
              <span className="text-[9px] font-sans text-[#7A5848]/70 truncate max-w-[140px]" title={profileRole}>{profileRole}</span>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.path;
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={`flex items-center gap-3.5 px-5 py-3.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 ${
                    isActive
                      ? 'bg-[#355C4A] text-[#FAF6EE] shadow-md'
                      : 'bg-transparent text-[#7A5848] border border-[#7A5848]/10 hover:bg-[#E8DCCB]/25 hover:border-[#7A5848]/35'
                  }`}
                  style={{ borderRadius: '9999px' }}
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer (Settings / Logout) */}
        <div className="flex flex-col gap-2.5 pt-6 border-t border-[#7A5848]/10">
          <Link
            href="/admin/settings"
            className={`flex items-center gap-3.5 px-5 py-3.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase transition-all duration-300 ${
              pathname === '/admin/settings'
                ? 'bg-[#355C4A] text-[#FAF6EE] shadow-md'
                : 'bg-transparent text-[#7A5848] border border-[#7A5848]/10 hover:bg-[#E8DCCB]/25'
            }`}
          >
            <Settings size={16} />
            <span>Settings</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex items-center gap-3.5 px-5 py-3.5 rounded-full text-xs font-sans font-bold tracking-wider uppercase text-[#7A5848] border border-[#7A5848]/10 hover:bg-red-500/10 hover:text-red-700 transition-all cursor-pointer text-left"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 p-6 md:p-10">
        
        {/* Floating Top Header */}
        <header 
          className="bg-[#FAF6EE]/80 backdrop-blur-md border border-[#7A5848]/10 shadow-sm p-4 md:px-8 md:py-5 flex items-center justify-between gap-4 mb-10"
          style={{ borderRadius: '24px' }}
        >
          {/* Header Left (Title / Subtitle) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="md:hidden w-10 h-10 rounded-full flex items-center justify-center bg-[#F2EDE2] border border-[#7A5848]/10 text-[#7A5848] cursor-pointer"
            >
              <Menu size={16} />
            </button>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-serif font-black text-[#2D2D2D] tracking-wide leading-tight">
                {getPageTitle()}
              </h1>
              <span className="text-[10px] md:text-xs text-[#7A5848]/70 font-sans mt-0.5 hidden sm:inline">
                {getPageSubtitle()}
              </span>
            </div>
          </div>

          {/* Header Right Icons in Circular Containers */}
          <div className="flex items-center gap-2.5">
            {/* Search */}
            <div className="relative hidden lg:block">
              <input
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Quick search..."
                className="w-48 bg-[#F2EDE2] border border-[#7A5848]/10 rounded-full pl-9 pr-4 py-2 text-[11px] text-[#2D2D2D] focus:outline-none focus:border-[#355C4A]"
              />
              <Search size={12} className="absolute left-3.5 top-3 text-[#7A5848]/55" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setNotificationsOpen(!notificationsOpen)}
                className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F2EDE2] border border-[#7A5848]/10 text-[#7A5848] hover:bg-[#E8DCCB]/40 cursor-pointer relative"
              >
                <Bell size={15} />
                <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#355C4A]" />
              </button>
              
              {notificationsOpen && (
                <div 
                  className="absolute right-0 mt-2.5 w-64 bg-[#F7F3EC] border border-[#7A5848]/20 shadow-xl p-4 z-40 text-xs font-sans"
                  style={{ borderRadius: '20px' }}
                >
                  <p className="font-bold text-[#355C4A] border-b border-[#7A5848]/10 pb-2 mb-2 uppercase tracking-wider">
                    Notifications
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="pb-1.5 border-b border-[#7A5848]/5">
                      <p className="font-semibold">New Inquiry received!</p>
                      <p className="text-[10px] text-[#7A5848]/70 mt-0.5">Eleanor Vance requested Wedding coverage.</p>
                    </div>
                    <div>
                      <p className="font-semibold">System Alert</p>
                      <p className="text-[10px] text-[#7A5848]/70 mt-0.5">Supabase tables are offline. Falling back to local storage.</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Theme Toggle */}
            <button 
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#F2EDE2] border border-[#7A5848]/10 text-[#7A5848] hover:bg-[#E8DCCB]/40 cursor-pointer"
            >
              {isDarkMode ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            {/* Profile Avatar */}
            <Link 
              href="/admin/settings"
              className="w-10 h-10 rounded-full flex items-center justify-center bg-[#355C4A] text-[#FAF6EE] font-bold text-[10px] tracking-wider hover:scale-105 transition-transform select-none uppercase"
            >
              {profileName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'R'}
            </Link>
          </div>
        </header>

        {/* Main scrollable page workspace */}
        <main className="flex-1 min-h-0">
          {children}
        </main>
      </div>

      {/* Mobile Bottom Navigation (only visible under md breakpoint) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#F2EDE2] border-t border-[#7A5848]/15 px-4 py-2.5 flex justify-around items-center rounded-t-[24px] shadow-lg">
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;
          return (
            <Link
              key={item.path}
              href={item.path}
              className={`flex flex-col items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                isActive 
                  ? 'bg-[#355C4A] text-[#FAF6EE]' 
                  : 'text-[#7A5848]'
              }`}
            >
              <Icon size={16} />
              <span className="text-[8px] mt-0.5 font-bold uppercase tracking-widest leading-none">
                {item.label.substring(0, 4)}
              </span>
            </Link>
          );
        })}
      </nav>
      
    </div>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <AdminLayoutContent>{children}</AdminLayoutContent>
    </ToastProvider>
  );
}
