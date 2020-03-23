import React from 'react';
import { css } from 'emotion';

interface Props {
  message?: string;
}

const EmptyState = ({ message }: Props) => (
  <div
    className={css`
      text-align: center;
      text-transform: uppercase;
      margin: 30px 0px;
      opacity: 0.6;
    `}
  >
    <h3>😥</h3>
    <h4>{message || 'No items yet'}</h4>
  </div>
);

export default EmptyState;
