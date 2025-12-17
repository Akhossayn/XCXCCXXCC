
import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const BackgroundVideo: React.FC = () => {
  const playerRef = useRef<any>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(25); // Start lower as requested
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Load YouTube IFrame API
    const tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('youtube-player', {
        videoId: 'Apx65i2iKyc', // The specific video ID
        playerVars: {
          autoplay: 1,
          controls: 0,
          showinfo: 0,
          modestbranding: 1,
          loop: 1,
          playlist: 'Apx65i2iKyc', // Required for looping
          fs: 0,
          cc_load_policy: 0,
          iv_load_policy: 3,
          autohide: 0,
          rel: 0,
          start: 0,
        },
        events: {
          onReady: (event: any) => {
            event.target.playVideo();
            event.target.setVolume(25); // Initial lower volume
            setIsReady(true);
          },
          onStateChange: (event: any) => {
            // Ensure it keeps playing
            if (event.data === window.YT.PlayerState.ENDED) {
               event.target.playVideo();
            }
          }
        },
      });
    };

    return () => {
       // Cleanup if needed
    };
  }, []);

  const toggleMute = () => {
    if (playerRef.current) {
      if (isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      } else {
        playerRef.current.mute();
        setIsMuted(true);
      }
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVol = parseInt(e.target.value);
    setVolume(newVol);
    if (playerRef.current) {
      playerRef.current.setVolume(newVol);
      if (newVol > 0 && isMuted) {
        playerRef.current.unMute();
        setIsMuted(false);
      }
    }
  };

  return (
    <>
      {/* Video Background Layer */}
      <div className="fixed inset-0 w-full h-full -z-50 overflow-hidden pointer-events-none bg-black">
        <div className="absolute top-1/2 left-1/2 w-[300%] h-[300%] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-40">
           <div id="youtube-player" className="w-full h-full" />
        </div>
        {/* Overlay to ensure text readability */}
        <div className="absolute inset-0 bg-zinc-950/80 backdrop-blur-[2px]" />
      </div>

      {/* Audio Controls Widget */}
      <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-1000">
        <div className="bg-zinc-900/90 border border-zinc-800 backdrop-blur-md rounded-full p-2 pl-4 flex items-center gap-3 shadow-[0_0_20px_rgba(0,0,0,0.5)] group hover:border-primary/50 transition-all">
           <div className="flex items-center gap-2">
              <div className="relative">
                 <div className={`absolute inset-0 bg-primary/20 rounded-full animate-ping ${isMuted ? 'hidden' : ''}`}></div>
                 <Music className={`w-3 h-3 ${isMuted ? 'text-zinc-500' : 'text-primary'}`} />
              </div>
              <span className="text-[10px] font-mono font-bold text-zinc-400 hidden group-hover:block whitespace-nowrap">
                  SYSTEM AUDIO
              </span>
           </div>

           {/* Volume Slider */}
           <div className="w-0 overflow-hidden group-hover:w-24 transition-all duration-300 flex items-center">
              <input 
                type="range" 
                min="0" 
                max="100" 
                value={volume} 
                onChange={handleVolumeChange}
                className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:rounded-full"
              />
           </div>

           <button 
             onClick={toggleMute}
             className="w-8 h-8 flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 rounded-full text-white transition-colors border border-zinc-700"
           >
             {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
           </button>
        </div>
      </div>
    </>
  );
};

export default BackgroundVideo;
