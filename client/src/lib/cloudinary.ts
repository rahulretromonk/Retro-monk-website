import { v2 as cloudinary } from 'cloudinary';

// Configure Cloudinary if not already configured elsewhere
// Using process.env here will pick up from the environment at runtime
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Deletes an image from Cloudinary using its public_id.
 * 
 * @param publicId The public ID of the Cloudinary asset.
 * @returns boolean indicating success (true if deleted or not found/ignored, false on error).
 */
export async function deleteImageFromCloudinary(publicId: string): Promise<boolean> {
  if (!publicId || publicId.includes('mock_upload') || publicId.includes('fallback_upload')) {
    // Ignore mock uploads used during development or misconfiguration
    return true; 
  }

  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    // Cloudinary returns { result: 'ok' } or { result: 'not found' }
    if (result.result === 'ok' || result.result === 'not found') {
      console.log(`Cloudinary deletion successful for ${publicId}:`, result);
      return true;
    } else {
      console.error(`Unexpected result from Cloudinary for ${publicId}:`, result);
      return false;
    }
  } catch (error) {
    console.error(`Failed to delete image from Cloudinary (publicId: ${publicId}):`, error);
    return false;
  }
}
