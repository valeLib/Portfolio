import { useState, useRef } from 'react';

interface ShowreelPlayerProps {
  src: string;
  poster: string;
  title?: string;
}

export function ShowreelPlayer({ src, poster, title = 'Showreel' }: ShowreelPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlayClick = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
    }
  };

  if (hasError) {
    return (
      <div className="relative aspect-video rounded-2xl overflow-hidden bg-dark-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-dark-700 flex items-center justify-center">
            <svg className="w-8 h-8 text-dark-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-dark-400">Showreel coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative aspect-video rounded-2xl overflow-hidden group">
      {/* Video */}
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        className="w-full h-full object-cover"
        preload="metadata"
        playsInline
        onEnded={handleVideoEnd}
        onError={() => setHasError(true)}
        onClick={handlePlayClick}
        aria-label={title}
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-dark-900/40 transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      />

      {/* Play Button */}
      <button
        onClick={handlePlayClick}
        className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          isPlaying ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
        aria-label={isPlaying ? 'Pause' : 'Play showreel'}
      >
        <div className="w-20 h-20 rounded-full bg-accent-500 flex items-center justify-center shadow-lg shadow-accent-500/30 hover:bg-accent-400 hover:scale-110 transition-all duration-300">
          <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </button>

      {/* Pause indicator (shows on hover when playing) */}
      {isPlaying && (
        <button
          onClick={handlePlayClick}
          className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Pause"
        >
          <div className="w-16 h-16 rounded-full bg-dark-900/60 backdrop-blur-sm flex items-center justify-center">
            <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          </div>
        </button>
      )}

      {/* Title badge */}
      <div className="absolute top-4 left-4 px-3 py-1.5 bg-dark-900/60 backdrop-blur-sm rounded-lg text-sm text-white font-medium">
        {title}
      </div>
    </div>
  );
}
