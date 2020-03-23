import React from 'react';
import { css } from 'emotion';
import { getLevelFromPoints, getStylesByLevel } from './utils';

interface Props {
  points: number;
  size?: string;
}

const Level = ({ points, size = '30px' }: Props) => {
  const level = getLevelFromPoints(points);

  return (
    <div
      className={css`
        width: ${size};
        height: ${size};
        font-size: ${parseInt(size, 10) / 2.5}px;
        border: 2px solid transparent;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        ${getStylesByLevel(level)};
      `}
    >
      <span>{level}</span>
    </div>
  );
};

export default Level;
