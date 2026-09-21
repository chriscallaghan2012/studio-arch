import React, { useEffect, useState } from 'react';

interface SmartImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  /** Local fallback used if the primary source fails to load. */
  fallbackSrc?: string;
}

/**
 * <img> wrapper that transparently swaps to a local fallback (default:
 * /images/hero-01.jpg) whenever the primary source fails to load — so a
 * broken or expired image URL can never show a broken-image glyph site-wide.
 */
export const SmartImage: React.FC<SmartImageProps> = ({
  src,
  fallbackSrc = '/images/hero-01.jpg',
  alt = '',
  ...rest
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={currentSrc}
      alt={alt}
      onError={() => {
        // Swap to the fallback once — guards against a loop if the fallback itself 404s.
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
};