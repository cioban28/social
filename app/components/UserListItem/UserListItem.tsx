import React from 'react';
import { Link } from 'react-router-dom';
import Avatar from 'components/Avatar';
import PointsBadge from 'components/PointsBadge';
import { css } from 'emotion';

interface Props {
  user: {
    id: number;
    name: string;
    avatar: string;
    points: number;
  };
}

const UserListItem = ({ user, ...props }: Props) => {
  return (
    <Link
      to={`/users/${user.id}`}
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
      <Avatar name={user.name} src={user.avatar} size="35px" />
      <div
        className={css`
          margin-left: 10px;
          display: flex;
          flex-grow: 1;
        `}
      >
        <p style={{ marginRight: '5px' }}>{user.name}</p>
        <PointsBadge points={user.points} hideWord />
      </div>
    </Link>
  );
};

export default UserListItem;
