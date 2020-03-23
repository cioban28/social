import React from 'react';
import { Link } from 'react-router-dom';
import PublisherLogo from 'components/PublisherLogo';
import { css } from 'emotion';

interface Props {
  name: string;
  comments?: number;
}

const PublisherListItem = ({ name, comments, ...props }: Props) => {
  return (
    <Link
      to={`/publisher/${name}`}
      className={`list-group-item list-group-item-action ${css`
        display: flex !important;
        align-items: center;
        p {
          margin-bottom: 0;
        }
        small {
          color: #818488;
        }
      `}`}
      {...props}
    >
      <PublisherLogo name={name} size="35px" />
      <div
        className={css`
          margin-left: 10px;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
        `}
      >
        <p>{name}</p>
        {comments && <small>{comments} comments</small>}
      </div>
    </Link>
  );
};

export default PublisherListItem;
