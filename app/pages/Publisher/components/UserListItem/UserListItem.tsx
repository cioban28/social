import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';
import withSizes from 'react-sizes';
import PointsBadge from 'components/PointsBadge';
import { css } from 'emotion';

interface Props {
  isMobile: boolean;
  user: {
    apiKey: string;
    name: string;
    avatar: string;
    points: number;
    commentsAmount: number;
  };
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

const UserListItem = ({ user, isMobile, ...props }: Props) => {
  return isMobile ? (
    <Link to={`/profile/${user.apiKey}`} className="list-inline-item list-inline-item-action text-center" {...props}>
      <Avatar name={user.name} src={user.avatar} size="35px" />
      <p className="mb-0 mb-sm-0 mt-2 mt-sm-2">
        <PointsBadge points={user.points} hideWord />
      </p>
    </Link>
  ) : (
    <Link
      to={`/profile/${user.apiKey}`}
      className={`list-group-item list-group-item-action ${css`
        display: flex !important;
        align-items: center;
        p {
          margin-bottom: -1px;
        }
      `}`}
      {...props}
    >
      <Avatar name={user.name} src={user.avatar} size="35px" />
      <div
        className={css`
          margin-left: 10px;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
        `}
      >
        <p style={{ marginRight: '5px' }}>
          <span>{user.name}</span>
          <PointsBadge points={user.points} hideWord />
        </p>
        <small>{user.commentsAmount} comments this week</small>
      </div>
    </Link>
  );
};

export default withSizes(mapSizesToProps)(UserListItem);
