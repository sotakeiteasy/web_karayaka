import React from 'react';
import styles from './ContainerWrapper.module.scss';

interface ContainerProps {
  children: React.ReactNode;
  width: 'standard' | 'standardPlus' | 'large' | string;
  withMarginBottom?: boolean;
}

export const ContainerWrapper = ({ children, width, withMarginBottom = false }: ContainerProps) => {
  const widthMap = {
    standard: '900px',
    standardPlus: '1000px',
    large: '1200px',
  };

  const finalWidth = widthMap[width as keyof typeof widthMap] || width;
  const containerClass = withMarginBottom ? `${styles.container} ${styles.withMarginBottom}` : styles.container;

  return (
    <div className={containerClass} style={{ '--max-width': finalWidth } as React.CSSProperties}>
      {children}
    </div>
  );
};
