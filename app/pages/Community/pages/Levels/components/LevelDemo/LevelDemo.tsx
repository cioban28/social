import React from 'react';
import { css } from 'emotion';
import Level from 'components/Level';
import { getLevelFromPoints } from 'components/Level/utils';

interface Props {
  points: number;
}

const LevelDemo = ({ points }: Props) => {
  const level = getLevelFromPoints(points);
  let levelDescription = '';

  switch (level) {
    case 1:
      levelDescription = '0 - 100 points';
      break;
    case 2:
      levelDescription = '101 - 500 points';
      break;
    case 3:
      levelDescription = '501 - 1000 points';
      break;
    case 4:
      levelDescription = '1001 - 2500 points';
      break;
    case 5:
      levelDescription = '2500+ points';
      break;
    default:
      levelDescription = '0 - 100 points';
      break;
  }

  return (
    <div
      className={css({
        display: 'flex',
        'align-items': 'center',
        margin: '10px',
        flex: '1 1 100%',
        '@media (min-width: 1200px)': {
          flex: '0 1 45%',
        },
      })}
    >
      <Level points={points} size="55px" />
      <div
        className={css`
          display: flex;
          flex-direction: column;
          margin-left: 5px;
        `}
      >
        <small>Level {level}</small>
        <span>{levelDescription}</span>
      </div>
    </div>
  );
};

export default LevelDemo;
