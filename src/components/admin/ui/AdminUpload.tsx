"use client";
import React, { useRef, useState } from 'react';
import { Camera, RefreshCw, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from './AdminToast';

interface AdminUploadProps {
  label?: string;
  value?: string;
  onChange: (url: string, publicId: string) => void;
  onRemove: () => void;
  error?: string;
}

export const AdminUpload = ({
  label,
  value,
  onChange,
  onRemove,
  error,
}: AdminUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const { toast } = useToast();

  const handleUpload = async (file: File) => {
    // Validation
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast('error', 'Invalid file type. Only JPG, JPEG, PNG, and WEBP are accepted.');
      return;
    }

    setIsUploading(true);
    setProgress(10); // Simulated initial progress

    try {
      const formData = new FormData();
      formData.append('file', file);

      // We read the token from localStorage (set during auth)
      const token = typeof window !== 'undefined' ? localStorage.getItem('admin_token') : null;

      // Simulate progress ring filling up while POST request runs
      const progressInterval = setInterval(() => {
        setProgress((prev) => (prev < 90 ? prev + 10 : prev));
      }, 200);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });

      clearInterval(progressInterval);
      setProgress(100);

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.url, data.publicId);
      toast('success', 'Image uploaded successfully!');
    } catch (err) {
      console.error(err);
      toast('error', 'Failed to upload image. Using local fallback simulation.');
      // Fail-safe fallback image
      const fallbackUrl = `https://images.unsplash.com/photo-1542038784456-1ea8e935640e?auto=format&fit=crop&q=80&w=800&mock=${Date.now()}`;
      onChange(fallbackUrl, `mock_upload_${Date.now()}`);
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 400);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUpload(e.target.files[0]);
    }
  };

  const triggerSelect = () => {
    fileInputRef.current?.click();
  };

  // SVG Progress Ring calculations
  const radius = 54;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="flex flex-col items-center gap-2 mb-6">
      {label && (
        <span className="text-[10px] font-sans font-bold tracking-wider text-[#7A5848] uppercase mb-1">
          {label}
        </span>
      )}

      {/* Upload Target Area */}
      <div 
        onClick={!isUploading ? triggerSelect : undefined}
        className={`relative w-44 h-44 rounded-full border-2 border-dashed border-[#7A5848]/30 flex flex-col items-center justify-center cursor-pointer overflow-hidden transition-all bg-[#E8DCCB]/10 hover:bg-[#E8DCCB]/30 hover:border-[#355C4A]/55 group ${
          error ? 'border-red-500' : ''
        }`}
      >
        {value && !isUploading ? (
          <>
            <img 
              src={value} 
              alt="Preview" 
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-[#2D2D2D]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
              <RefreshCw size={24} className="animate-pulse" />
            </div>
          </>
        ) : isUploading ? (
          // Circular Progress Ring
          <div className="relative w-full h-full flex items-center justify-center bg-[#F7F3EC]/80">
            <svg className="w-32 h-32 transform -rotate-90">
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-[#E8DCCB] fill-none"
                strokeWidth="6"
              />
              <circle
                cx="64"
                cy="64"
                r={radius}
                className="stroke-[#355C4A] fill-none transition-all duration-300"
                strokeWidth="6"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-sm font-sans font-bold text-[#355C4A]">{progress}%</span>
              <span className="text-[8px] uppercase tracking-wider text-[#7A5848]">Uploading</span>
            </div>
          </div>
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center p-4 text-center">
            <div className="bg-[#7A5848]/10 text-[#7A5848] p-3 rounded-full mb-2 group-hover:bg-[#355C4A]/10 group-hover:text-[#355C4A] transition-all">
              <Camera size={22} />
            </div>
            <span className="text-[10px] font-sans font-semibold tracking-wider text-[#7A5848] group-hover:text-[#355C4A]">
              Click to Upload
            </span>
            <span className="text-[8px] font-sans text-[#7A5848]/50 mt-1">
              JPG, PNG, WEBP
            </span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".jpg,.jpeg,.png,.webp"
        className="hidden"
      />

      {/* Action buttons when image exists */}
      {value && !isUploading && (
        <div className="flex gap-4 mt-2">
          <button
            type="button"
            onClick={triggerSelect}
            className="text-[9px] font-sans font-bold tracking-wider uppercase text-[#355C4A] hover:text-[#2b4c3c] flex items-center gap-1 cursor-pointer"
          >
            <RefreshCw size={10} /> Replace
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onRemove();
              toast('info', 'Image removed.');
            }}
            className="text-[9px] font-sans font-bold tracking-wider uppercase text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
          >
            <Trash2 size={10} /> Remove
          </button>
        </div>
      )}

      {error && (
        <span className="text-[10px] text-red-600 font-medium mt-1">
          {error}
        </span>
      )}
    </div>
  );
};
