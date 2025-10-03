import { useEffect, useRef, useState } from "preact/hooks";

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
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);

  useEffect(() => {
    const vid = videoRef.current;
    if (vid && video) {
      const handleLoadedData = () => {
        console.log("Video loaded successfully");
        setIsLoaded(true);
      };
      const handleError = (e: Event) => {
        console.error("Video load error:", e, vid.error);
      };

      vid.addEventListener("loadeddata", handleLoadedData);
      vid.addEventListener("error", handleError);

      // Force load
      vid.load();

      return () => {
        vid.removeEventListener("loadeddata", handleLoadedData);
        vid.removeEventListener("error", handleError);
      };
    }
  }, [video]);

  const handleMouseEnter = () => {
    if (video && videoRef.current) {
      setIsHovered(true);
      const vid = videoRef.current;
      console.log("Attempting to play video:", {
        src: vid.src,
        readyState: vid.readyState,
        networkState: vid.networkState,
        paused: vid.paused,
      });

      // Cancel any pending pause/play
      if (playPromiseRef.current) {
        playPromiseRef.current.catch(() => {});
      }

      playPromiseRef.current = vid.play();
      playPromiseRef.current
        .then(() => console.log("Video playing successfully"))
        .catch((err) => console.error("Play failed:", err));
    }
  };

  const handleMouseLeave = () => {
    if (video && videoRef.current) {
      setIsHovered(false);
      const vid = videoRef.current;

      // Wait a bit for play promise to settle
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            vid.pause();
            vid.currentTime = 0;
          })
          .catch(() => {
            // If play was rejected, just reset
            vid.currentTime = 0;
          });
      } else {
        vid.pause();
        vid.currentTime = 0;
      }
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
          class="absolute inset-0 w-full h-full object-cover"
          style={{
            opacity: isHovered ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
          loop
          muted
          playsInline
          preload="auto"
        >
          <source src={video} type="video/mp4; codecs=avc1.42E01E,mp4a.40.2" />
          <source src={video} type="video/mp4" />
        </video>
      )}
    </div>
  );
}
