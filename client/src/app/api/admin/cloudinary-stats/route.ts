import { NextResponse } from 'next/server';
import { checkAuth } from '@/lib/checkAuth';

export async function GET(req: Request) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const cloud = process.env.CLOUDINARY_CLOUD_NAME;
    const key = process.env.CLOUDINARY_API_KEY;
    const secret = process.env.CLOUDINARY_API_SECRET;

    if (!cloud || !key || !secret) {
      // Return fallback stats if Cloudinary environment variables are missing
      return NextResponse.json({
        usedBytes: 8800000,
        limitBytes: 52428800,
        usedPercentage: 17.6,
        usedMb: 8.8,
        remainingMb: 41.2,
        remainingGb: 0.04,
        limitGb: 0.05,
        isFallback: true
      });
    }

    const auth = 'Basic ' + Buffer.from(key + ':' + secret).toString('base64');
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud}/usage`, {
      headers: { Authorization: auth },
      next: { revalidate: 60 } // Cache response for 60 seconds
    });

    if (!res.ok) {
      throw new Error(`Cloudinary API responded with status ${res.status}`);
    }

    const data = await res.json();
    const usedBytes = data.storage?.usage || 0;
    
    // Cloudinary Free tier default limit is 25 GB (26,843,545,600 bytes)
    const limitBytes = 25 * 1024 * 1024 * 1024; 
    
    const usedPercentage = Number(((usedBytes / limitBytes) * 100).toFixed(2));
    const usedMb = Number((usedBytes / (1024 * 1024)).toFixed(1));
    const remainingMb = Number(((limitBytes - usedBytes) / (1024 * 1024)).toFixed(1));
    const remainingGb = Number(((limitBytes - usedBytes) / (1024 * 1024 * 1024)).toFixed(1));
    const limitGb = 25;

    return NextResponse.json({
      usedBytes,
      limitBytes,
      usedPercentage,
      usedMb,
      remainingMb,
      remainingGb,
      limitGb,
      isFallback: false
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
