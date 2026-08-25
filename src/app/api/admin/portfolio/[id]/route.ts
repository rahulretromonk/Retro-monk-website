import { NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { checkAuth } from '@/lib/checkAuth';

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const body = await req.json();
    const updated = await db.updatePortfolio(id, body);
    
    if (!updated) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const isAuthed = await checkAuth(req);
    if (!isAuthed) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    
    // 1. Fetch the portfolio item to get its publicId
    const allPortfolio = await db.getPortfolio();
    const portfolioItem = allPortfolio.find((item: any) => item.id === id);

    // 2. Delete the image from Cloudinary if it has a publicId
    if (portfolioItem && portfolioItem.publicId) {
      // Import this at the top of the file dynamically or add to imports
      const { deleteImageFromCloudinary } = await import('@/lib/cloudinary');
      await deleteImageFromCloudinary(portfolioItem.publicId);
    }

    // 3. Delete from DB
    const deleted = await db.deletePortfolio(id);
    
    if (!deleted) {
      return NextResponse.json({ error: 'Portfolio item not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
