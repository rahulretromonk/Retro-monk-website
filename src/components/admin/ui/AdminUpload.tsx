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
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp', 'video/mp4', 'video/webm'];
    if (!allowedTypes.includes(file.type)) {
      toast('error', 'Invalid file type. Only JPG, PNG, WEBP, and MP4/WEBM videos are accepted.');
      return;
    }
    
    const isVideo = file.type.startsWith('video/');
    const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100MB
    const MAX_IMAGE_SIZE = 10 * 1024 * 1024; // 10MB

    if (isVideo && file.size > MAX_VIDEO_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      toast('error', `Video is too large (${sizeMB}MB). Maximum allowed size is 100MB.`);
      return;
    }

    if (!isVideo && file.size > MAX_IMAGE_SIZE) {
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      toast('error', `Image is too large (${sizeMB}MB). Maximum allowed size is 10MB.`);
      return;
    }

    setIsUploading(true);
    setProgress(0); // Start at 0 for real progress

    const uploadToCloudinary = (
      file: File,
      signature: string,
      timestamp: number,
      apiKey: string,
      cloudName: string,
      folder: string
    ): Promise<any> => {
      return new Promise((resolve, reject) => {
        const formData = new FormData();
    
        formData.append('file', file);
        formData.append('api_key', apiKey);
        formData.append('timestamp', timestamp.toString());
        formData.append('signature', signature);
        formData.append('folder', folder);
    
        const xhr = new XMLHttpRequest();
    
        xhr.open(
          'POST',
          `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`
        );
    
        xhr.upload.onprogress = (event) => {
          if (event.lengthComputable) {
            const percent = Math.round(
              (event.loaded / event.total) * 100
            );
            setProgress(percent);
          }
        };
    
        xhr.onload = () => {
          if (xhr.status >= 200 && xhr.status < 300) {
            resolve(JSON.parse(xhr.responseText));
          } else {
            reject(
              new Error(
                `Cloudinary upload failed: ${xhr.status}`
              )
            );
          }
        };
    
        xhr.onerror = () => {
          reject(new Error('Network error during Cloudinary upload'));
        };
    
        xhr.onabort = () => {
          reject(new Error('Upload cancelled'));
        };
    
        xhr.send(formData);
      });
    };

    try {
      const token =
        typeof window !== 'undefined'
          ? localStorage.getItem('admin_token')
          : null;

      // 1. Get signed upload parameters from our server
      const signatureResponse = await fetch(
        '/api/admin/upload-signature',
        {
          method: 'POST',
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : {},
        }
      );

      if (!signatureResponse.ok) {
        throw new Error('Failed to get Cloudinary signature');
      }

      const {
        signature,
        timestamp,
        apiKey,
        cloudName,
        folder,
      } = await signatureResponse.json();

      // 2. Upload DIRECTLY to Cloudinary
      const result = await uploadToCloudinary(
        file,
        signature,
        timestamp,
        apiKey,
        cloudName,
        folder
      );

      // 3. Cloudinary response
      onChange(
        result.secure_url,
        result.public_id
      );

      setProgress(100);

      toast(
        'success',
        isVideo
          ? 'Video uploaded successfully!'
          : 'Image uploaded successfully!'
      );
    } catch (err) {
      console.error('Upload error:', err);

      toast(
        'error',
        'Failed to upload file. Please try again.'
      );
    } finally {
      setTimeout(() => {
        setIsUploading(false);
        setProgress(0);
      }, 500);
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
            {value.toLowerCase().endsWith('.mp4') || value.toLowerCase().endsWith('.webm') ? (
              <video 
                src={value} 
                autoPlay 
                muted 
                loop 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            )}
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
              JPG, PNG, WEBP, MP4
            </span>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/*,video/mp4,video/webm"
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
