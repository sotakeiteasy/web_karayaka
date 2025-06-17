import React from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  height?: string;
  width?: string;
  marginTop?: string;
  marginBottom?: string;
  borderRadius?: string;
  className?: string;
  [key: string]: any;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  height = '0px',
  width = '100%',
  marginTop = '0px',
  marginBottom = '0px',
  borderRadius = '10px',
  className = '',
  ...props
}) => {
  return (
    <div
      className={`${styles.skeleton} ${className}`}
      style={{
        height,
        width,
        marginTop,
        marginBottom,
        borderRadius,
      }}
      {...props}
    />
  );
};
