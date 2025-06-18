import { getVideoUrl, getOptimizedImageUrl } from '@/lib/utils';
import styles from '@/lib/components/HomePage/HomePage.module.scss';
import { useEffect, useRef, useState } from 'react';

function VideoPlayer({ lang }: any) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);
  const baseName = lang !== 'ru' ? 'moscow' : 'turkey';

  const videoSrc = getVideoUrl(`assets/videos/${baseName}.webm`);
  const videoSrcFallback = getVideoUrl(`assets/videos/${baseName}.mp4`);
  const videoMobileSrc = getVideoUrl(`assets/videos/${baseName}_mobile.webm`);
  const videoMobileSrcFallback = getVideoUrl(`assets/videos/${baseName}_mobile.mp4`);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.load();
    }
  }, [videoSrc, videoSrcFallback, videoMobileSrc, videoMobileSrcFallback]);

  return (
    <>
      {!isVideoReady && (
        <picture>
          <source
            srcSet={getOptimizedImageUrl(`assets/images/homePage/video-skeleton-${lang}.jpg`).webp}
            type="image/webp"
          />
          <img
            src={getOptimizedImageUrl(`assets/images/homePage/video-skeleton-${lang}.jpg`).original}
            alt="view of turkey"
            fetchPriority="high"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          />
        </picture>
      )}
      <video
        ref={videoRef}
        className={styles.video}
        loop
        autoPlay
        muted
        preload="auto"
        height={680}
        width={1600}
        style={{ objectFit: 'cover', opacity: isVideoReady ? 1 : 0 }}
        playsInline
        controls={false}
        onCanPlay={() => setIsVideoReady(true)}
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
