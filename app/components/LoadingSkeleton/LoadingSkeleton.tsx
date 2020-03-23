import React from 'react';
import './styles.scss';

interface Props {
  shape?: 'circle' | 'square' | 'rounded';
  style?: React.CSSProperties;
}

const LoadingSkeleton = ({ shape = 'square', ...props }: Props) => {
  return <div className={`loading-block loading-block--${shape}`} {...props} />;
};

export default LoadingSkeleton;
