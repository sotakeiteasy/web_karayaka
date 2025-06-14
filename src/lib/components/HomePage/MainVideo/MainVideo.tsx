import { getImageUrl } from '@/lib/utils';
import styles from '@/lib/components/Home/index.module.scss';
import { useEffect, useRef } from 'react';

function VideoPlayer({ lang }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSrc = lang !== 'ru' ? getImageUrl('/videos/moscow.webm') : getImageUrl('/videos/new.webm');
  const videoSrcFallback = lang !== 'ru' ? getImageUrl('/videos/moscow.mp4') : getImageUrl('/videos/new.mp4');

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc]);

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
      <source src={videoSrc} type="video/webm" />
      <source src={videoSrcFallback} type="video/mp4" />
    </video>
  );
}

export default VideoPlayer;
