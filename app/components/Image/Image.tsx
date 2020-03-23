import React from 'react';
import placeholder from './placeholder.png';
import * as s from './image.module.scss';

interface Props {
  src: string;
  title: string;
  width?: string;
  height?: string;
}

const Image = ({ src, title, width = '50px', height = '50px' }: Props) => {
  let image = src;
  if (!src || src === '404' || src === 'undefined') {
    image = placeholder;
  }

  const itemStyles: React.CSSProperties = { backgroundImage: `url(${image})` };
  itemStyles.width = width;
  itemStyles.height = height;

  return <div className={s.imageBg} style={itemStyles} title={title || ''} />;
};

export default Image;
