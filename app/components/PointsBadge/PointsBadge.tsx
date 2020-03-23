import React from 'react';
import './styles.scss';

interface Props {
  points: number;
  hideWord?: boolean;
}

const PointsBadge = ({ points = 0, hideWord = false }: Props) => {
  let bgColor = '#EBEEF2';

  if (points > 2500) {
    bgColor = '#FFD083';
  } else if (points > 1500) {
    bgColor = '#FFE8C3';
  } else if (points > 500) {
    bgColor = '#E1EDFF';
  }

  return (
    <span className="points-badge" style={{ background: bgColor, marginLeft: '3px' }}>
      {points} {hideWord ? null : points > 1 ? 'Points' : 'Point'}
    </span>
  );
};

export default PointsBadge;
