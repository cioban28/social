import React from 'react';
import sadIcon from './sad.svg';

const TableEmptyState = ({}) => (
  <div style={{ textAlign: 'center', padding: '20px' }}>
    <img src={sadIcon} alt="Sad Emoji" style={{ width: '100%', maxWidth: '100px' }} />
    <h3 style={{ marginTop: '10px', textTransform: 'uppercase' }}>We couldn't find any active users on this site.</h3>
    <div style={{ marginTop: '20px', opacity: 0.7 }}>
      <small>
        If you think it's error, please let us know: <a href="mailto:support@vuukle.com">support@vuukle.com</a>.
      </small>
    </div>
  </div>
);

export default TableEmptyState;
