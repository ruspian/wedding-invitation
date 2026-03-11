import React, { useEffect, useRef } from "react";
import { MUSIC_URL } from "../constants";

const MusicPlayer: React.FC = () => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const handlePlay = () => {
      if (audioRef.current) {
        // Paksa volume maksimal dan pastikan tidak mute
        audioRef.current.muted = false;
        audioRef.current.volume = 1.0;

        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise.catch((error) => {
            console.error("Gagal putar musik:", error);
            // Jika gagal, coba lagi saat user pertama kali klik apa saja di layar
            const retry = () => {
              audioRef.current?.play();
              window.removeEventListener("click", retry);
            };
            window.addEventListener("click", retry);
          });
        }
      }
    };

    window.addEventListener("play-wedding-music", handlePlay);
    return () => window.removeEventListener("play-wedding-music", handlePlay);
  }, []);

  return (
    <audio
      ref={audioRef}
      src={MUSIC_URL}
      loop
      preload="auto"
      className="hidden"
    />
  );
};

export default MusicPlayer;
