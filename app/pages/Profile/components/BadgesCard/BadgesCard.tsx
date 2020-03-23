import React from 'react';
import Card from 'antd/lib/card';
import './styles.scss';

const BadgesCard = () => {
  return (
    <Card
      title={
        <div className="BadgesCard-header">
          <span>Badges</span>
          <span className="comming-soon-badge">Comming soon</span>
        </div>
      }
      className="BadgesCard"
    >
      <div className="BadgesCard-wrapper">
        <div className="badge-placeholder" />
        <div className="badge-placeholder badge-placeholder-2" />
        <div className="badge-placeholder badge-placeholder-3" />
      </div>
    </Card>
  );
};

export default BadgesCard;
