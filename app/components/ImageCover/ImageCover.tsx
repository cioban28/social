import React from 'react';
import PublisherCover from 'static/publisherBackground.svg';

interface Props {
  imageUrl?: string;
  height?: string;
}
const ImageCover = ({ imageUrl = PublisherCover, height = '100px', ...props }: Props) => {
  return (
    <div
      style={{
        display: 'inline-block',
        height,
        width: '100%',
        overflow: 'hidden',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
        backgroundImage: `url(${imageUrl})`,
      }}
      {...props}
    />
  );
};

export default ImageCover;
