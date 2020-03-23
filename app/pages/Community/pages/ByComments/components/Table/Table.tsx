import React from 'react';
import { Link } from 'react-router-dom';
import TrLoadingSkeleton from 'pages/Community/components/TrLoadingSkeleton';
import Avatar from 'components/Avatar';
import PointsBadge from 'components/PointsBadge';

interface Props {
  loading: boolean;
  users: any[];
}

const Table = ({ loading = false, users = [] }: Props) => (
  <table className="table TopUsersTable">
    <colgroup>
      <col span={1} style={{ width: '50px' }} />
      <col span={1} style={{ width: '75%' }} />
      <col span={1} style={{ width: '20%' }} />
    </colgroup>

    <thead>
      <tr>
        <th scope="col">Rank</th>
        <th scope="col">Name</th>
        <th scope="col" style={{ textAlign: 'center' }}>
          Comments
        </th>
      </tr>
    </thead>
    {loading ? (
      <TrLoadingSkeleton />
    ) : (
      <tbody>
        {users.map((user, key: number) => (
          <tr key={key}>
            <td style={{ textAlign: 'center' }}>{key + 1}</td>
            <td>
              <Link to={`/profile/${user.apiKey}`}>
                <Avatar name={user.name} src={user.avatar} size="36px" />
                <span style={{ margin: '0 5px' }}>{user.name}</span>
                <PointsBadge points={user.points} hideWord />
              </Link>
            </td>
            <td style={{ textAlign: 'center' }}>
              <strong>{user.comments}</strong>
            </td>
          </tr>
        ))}
      </tbody>
    )}
  </table>
);

export default Table;
