import { type FC, useEffect, useRef } from 'react';
import videojs from 'video.js';
import type Player from 'video.js/dist/types/player';
import 'video.js/dist/video-js.css';

const VideoReact: FC = (props: any) => {
  const videoRef = useRef<ElRef>(null);
  const playerRef = useRef(null);
  const { options } = props;

  useEffect(() => {
    if (!playerRef.current) {
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');

      if (videoRef.current) {
        videoRef.current.appendChild(videoElement);
      }

      // @ts-ignore
      playerRef.current = videojs(videoElement, options);
    } else {
      const player = playerRef.current as Player;

      player.autoplay(options.autoplay);
      player.src(options.sources);
    }
  }, [options, videoRef]);

  useEffect(() => {
    const player = playerRef.current! as Player;

    return () => {
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [playerRef]);

  return (
    <div data-vjs-player>
      <div ref={videoRef} />
    </div>
  );
};

export default VideoReact;
