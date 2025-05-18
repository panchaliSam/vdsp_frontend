import { useState } from "react";

export default function ImgWithSkeleton({
  src,
  alt,
  className,
  ...props
}: React.ImgHTMLAttributes<HTMLImageElement>) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative w-full h-full">
      {!loaded && (
        <div
          className="absolute inset-0 bg-gradient-to-r from-night via-graphite to-night animate-shimmer rounded-2xl"
          aria-hidden="true"
        />
      )}
      <img
        src={src}
        alt={alt}
        className={`${className} ${!loaded ? "invisible" : ""}`}
        onLoad={() => setLoaded(true)}
        {...props}
      />
    </div>
  );
} 