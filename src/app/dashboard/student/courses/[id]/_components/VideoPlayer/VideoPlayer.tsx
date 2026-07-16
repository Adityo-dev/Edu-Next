/* eslint-disable no-unused-vars */
import { useEffect, useRef } from 'react';

// =============================================
// YouTube IFrame Player API TypeScript types
// =============================================
declare global {
  interface Window {
    YT: {
      Player: new (
        _elementId: string,
        _config: {
          videoId: string;
          playerVars?: Record<string, number | string>;
          events?: {
            onReady?: (event: { target: YTPlayer }) => void;
            onStateChange?: (event: { data: number; target: YTPlayer }) => void;
          };
        },
      ) => YTPlayer;
      PlayerState: {
        PLAYING: number;
        PAUSED: number;
        ENDED: number;
        BUFFERING: number;
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

interface YTPlayer {
  destroy: () => void;
  getDuration: () => number;
  getCurrentTime: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
}

// Helper to extract Youtube video ID from any YouTube URL format
export const getYouTubeID = (url: string): string | null => {
  if (!url) return null;
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?'"]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
};

// Detect if a URL is a YouTube URL (case-insensitive)
export const isYouTubeUrl = (url: string): boolean => {
  const lower = url.toLowerCase();
  return (
    lower.includes('youtube.com') || lower.includes('youtu.be') || lower.includes('youtube/embed')
  );
};

// Clean URL: extract src from iframe tags, trim whitespace
export const cleanVideoUrl = (raw: string): string => {
  let url = raw.trim();
  if (url.includes('<iframe')) {
    const srcMatch = url.match(/src=["']([^"']+)["']/);
    if (srcMatch) {
      url = srcMatch[1];
    }
  }
  return url;
};

function YouTubePlayer({
  videoId,
  onEnded,
  onReachedEnd,
}: {
  videoId: string;
  onEnded: () => void;
  onReachedEnd: () => void;
}) {
  const playerRef = useRef<YTPlayer | null>(null);
  const containerId = `yt-player-${videoId}`;
  const seekCheckRef = useRef<NodeJS.Timeout | null>(null);
  const seekFiredRef = useRef(false);

  useEffect(() => {
    const loadYTApi = () => {
      return new Promise<void>((resolve) => {
        if (window.YT && window.YT.Player) {
          resolve();
          return;
        }
        const existingScript = document.querySelector(
          'script[src="https://www.youtube.com/iframe_api"]',
        );
        if (existingScript) {
          const prevCallback = window.onYouTubeIframeAPIReady;
          window.onYouTubeIframeAPIReady = () => {
            if (prevCallback) prevCallback();
            resolve();
          };
          return;
        }
        window.onYouTubeIframeAPIReady = () => resolve();
        const script = document.createElement('script');
        script.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(script);
      });
    };

    let isMounted = true;
    seekFiredRef.current = false;

    loadYTApi().then(() => {
      if (!isMounted) return;
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }

      playerRef.current = new window.YT.Player(containerId, {
        videoId,
        playerVars: {
          autoplay: 1,
          modestbranding: 1,
          rel: 0,
        },
        events: {
          onReady: () => {
            seekCheckRef.current = setInterval(() => {
              if (!playerRef.current || seekFiredRef.current) return;
              try {
                const currentTime = playerRef.current.getCurrentTime();
                const totalDur = playerRef.current.getDuration();
                if (totalDur > 0 && currentTime / totalDur >= 0.99) {
                  console.log(
                    `[Completion] 🎯 Position at ${Math.round((currentTime / totalDur) * 100)}% — near end`,
                  );
                  seekFiredRef.current = true;
                  onReachedEnd();
                }
              } catch {
                // Ignore
              }
            }, 2000);
          },
          onStateChange: (event) => {
            if (event.data === window.YT.PlayerState.ENDED) {
              onEnded();
            }
          },
        },
      });
    });

    return () => {
      isMounted = false;
      if (seekCheckRef.current) {
        clearInterval(seekCheckRef.current);
        seekCheckRef.current = null;
      }
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [videoId, onEnded, onReachedEnd, containerId]);

  return (
    <div className="absolute inset-0 h-full w-full bg-black">
      <div id={containerId} className="h-full w-full" />
    </div>
  );
}

interface VideoPlayerProps {
  videoUrl: string;
  title: string;
  onVideoEnded: () => void;
  onReachedEnd: () => void;
}

export default function VideoPlayer({
  videoUrl,
  title,
  onVideoEnded,
  onReachedEnd,
}: VideoPlayerProps) {
  if (!videoUrl) {
    return (
      <div className="flex h-full items-center justify-center bg-black">
        <p className="text-slate-500">No video URL found for this lesson</p>
      </div>
    );
  }

  const rawUrl = cleanVideoUrl(videoUrl);
  const isYouTube = isYouTubeUrl(rawUrl);
  const youtubeId = isYouTube ? getYouTubeID(rawUrl) : null;

  if (isYouTube && youtubeId) {
    return (
      <YouTubePlayer
        key={youtubeId}
        videoId={youtubeId}
        onEnded={onVideoEnded}
        onReachedEnd={onReachedEnd}
      />
    );
  }

  return (
    <video
      key={rawUrl}
      title={title}
      className="absolute inset-0 h-full w-full bg-black"
      controls
      controlsList="nodownload"
      autoPlay
      src={rawUrl}
      onEnded={onVideoEnded}
    >
      Your browser does not support the video tag.
    </video>
  );
}
