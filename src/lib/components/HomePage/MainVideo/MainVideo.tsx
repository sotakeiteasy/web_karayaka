import { getImageUrl } from '@/lib/utils';
import styles from '@/lib/components/HomePage/index.module.scss';
import { useEffect, useRef } from 'react';

function VideoPlayer({ lang }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const baseName = lang !== 'ru' ? 'moscow' : 'turkey';

  const videoSrc = getImageUrl(`/videos/${baseName}.webm`);
  const videoSrcFallback = getImageUrl(`/videos/${baseName}.mp4`);
  const videoMobileSrc = getImageUrl(`/videos/${baseName}_mobile.webm`);
  const videoMobileSrcFallback = getImageUrl(`/videos/${baseName}_mobile.mp4`);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc, videoSrcFallback, videoMobileSrc, videoMobileSrcFallback]);

  return (
    <video
      ref={videoRef}
      className={styles.video}
      loop
      autoPlay
      muted
      preload="auto"
      height={680}
      width={1600}
      style={{ objectFit: 'cover' }}
      playsInline
      controls={false}
    >
      <source src={videoMobileSrc} type="video/webm" media="(max-width: 480px)" />
      <source src={videoMobileSrcFallback} type="video/mp4" media="(max-width: 480px)" />
      <source src={videoSrc} type="video/webm" />
      <source src={videoSrcFallback} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
