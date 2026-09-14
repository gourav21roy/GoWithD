import React, { useState } from 'react';

/**
 * ============================================================================
 * LORD GANESHA IMAGE PLACEHOLDER
 * ============================================================================
 * To replace with your own Lord Ganesha image:
 * 1. Place your image file in the '/public' folder (e.g. '/public/ganeshji.png'
 *    or '/public/ganesh.jpg').
 * 2. Change `CUSTOM_GANESH_IMAGE_SRC` below to your file path, e.g.:
 *    export const CUSTOM_GANESH_IMAGE_SRC = '/ganeshji.png';
 *
 * Default placeholder: '/ganesh_placeholder.svg'
 * ============================================================================
 */
export const CUSTOM_GANESH_IMAGE_SRC = '/ganesh2.svg';

interface GaneshGraphicProps {
  className?: string;
  size?: number;
  customSrc?: string;
}

export const GaneshGraphic: React.FC<GaneshGraphicProps> = ({
  className = 'w-20 h-20 sm:w-24 sm:h-24',
  size,
  customSrc = CUSTOM_GANESH_IMAGE_SRC
}) => {
  const [imageError, setImageError] = useState(false);

  return (
    <div
      id="ganesh-placeholder-container"
      className={`relative inline-flex items-center justify-center group ${className}`}
      style={size ? { width: size, height: size } : undefined}
      title="Lord Ganesha Image Placeholder (Replace with your custom image)"
    >
      {/* Ambient Divine Golden Halo Glow */}
      <div className="absolute -inset-1.5 rounded-full bg-gradient-to-r from-[#D4AF37]/30 via-[#FFD54F]/40 to-[#D4AF37]/30 blur-md pointer-events-none" />

      {/* Decorative Ornate Circular Border */}
      <div className="relative w-full h-full rounded-full p-1 border-2 border-[#D4AF37] bg-[#1A0206]/90 shadow-[0_8px_24px_rgba(0,0,0,0.85)] flex items-center justify-center overflow-hidden">
        <img
          id="ganesh-ji-image"
          src={imageError ? '/ganesh_placeholder.svg' : customSrc}
          alt="Lord Ganesha"
          className="w-full h-full object-contain rounded-full transition-transform duration-300 group-hover:scale-105"
          onError={() => {
            if (!imageError) setImageError(true);
          }}
        />
      </div>

      <span className="sr-only">Lord Ganesha Image Placeholder</span>
    </div>
  );
};

export const GaneshPlaceholder = GaneshGraphic;
export default GaneshGraphic;
