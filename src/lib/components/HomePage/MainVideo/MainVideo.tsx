import { getVideoUrl } from '@/lib/utils';
import styles from '@/lib/components/HomePage/HomePage.module.scss';
import { useEffect, useRef, useState } from 'react';

function VideoPlayer({ lang, poster }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const baseName = lang !== 'ru' ? 'moscow' : 'turkey';

  const videoSrc = getVideoUrl(`assets/videos/${baseName}.webm`);
  const videoSrcFallback = getVideoUrl(`assets/videos/${baseName}.mp4`);
  const videoMobileSrc =
    baseName === 'moscow'
      ? getVideoUrl(`assets/videos/${baseName}_mobile.webm`)
      : getVideoUrl(`assets/videos/${baseName}_mobile.mp4`);
  const videoMobileSrcFallback = getVideoUrl(`assets/videos/${baseName}_mobile.mp4`);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc, videoSrcFallback, videoMobileSrc, videoMobileSrcFallback]);

  return (
    <>
      <video
        ref={videoRef}
        className={styles.video}
        loop
        autoPlay
        muted
        preload="none"
        height={680}
        width={1600}
        style={{ objectFit: 'cover' }}
        playsInline
        controls={false}
        poster={poster}
      >
        <source src={videoMobileSrc} type="video/webm" media="(max-width: 480px)" />
        <source src={videoMobileSrcFallback} type="video/mp4" media="(max-width: 480px)" />
        <source src={videoSrc} type="video/webm" />
        <source src={videoSrcFallback} type="video/mp4" />
      </video>
    </>
  );
}

export default VideoPlayer;
