import { useRef, useState } from "preact/hooks";

interface Props {
  image: string;
  video?: string;
  alt?: string;
  class?: string;
}

export default function HoverVideoIsland({
  image,
  video,
  alt = "",
  class: className = "",
}: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (video && videoRef.current) {
      setIsHovered(true);
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (video && videoRef.current) {
      setIsHovered(false);
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <div
      class={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image */}
      <img
        src={image}
        alt={alt}
        class="w-full h-full object-cover"
        style={{
          opacity: isHovered && video ? 0 : 1,
          transition: "opacity 0.3s ease",
        }}
        loading="lazy"
      />

      {/* Video */}
      {video && (
        <video
          ref={videoRef}
          src={video}
          class="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          loop
          muted
          playsInline
          preload="metadata"
        />
      )}
    </div>
  );
}
