// utils/imageOptimizer.ts

/**
 * Optimizes Cloudinary URLs with automatic format, quality, and size transformations
 * @param url - Original Cloudinary URL
 * @param width - Target width in pixels (default: 400 for cards)
 * @param quality - Quality level (default: 'auto')
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryImage(
  url?: string | null,
  width: number = 400,
  quality: 'auto' | 'auto:low' | 'auto:good' = 'auto'
): string {
  if (!url) return "/placeholder.svg";
  
  // Check if it's a Cloudinary URL
  if (!url.includes('cloudinary.com')) {
    return url;
  }

  // Cloudinary URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{path}
  const uploadIndex = url.indexOf('/upload/');
  if (uploadIndex === -1) return url;

  const baseUrl = url.substring(0, uploadIndex + 8); // Include '/upload/'
  const imagePath = url.substring(uploadIndex + 8);

  // Build transformation string
  // f_auto: automatic format (WebP for supported browsers)
  // q_auto: automatic quality optimization
  // w_{width}: resize to width
  // c_limit: don't upscale, only downscale
  // dpr_auto: automatic DPR for retina displays
  const transformations = `f_auto,q_${quality},w_${width},c_limit,dpr_auto`;

  return `${baseUrl}${transformations}/${imagePath}`;
}

/**
 * Get different image sizes for responsive loading
 */
export function getResponsiveImageUrls(url?: string | null) {
  return {
    thumbnail: optimizeCloudinaryImage(url, 200, 'auto:low'),
    card: optimizeCloudinaryImage(url, 400, 'auto'),
    detail: optimizeCloudinaryImage(url, 800, 'auto:good'),
  };
}