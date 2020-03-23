import React from 'react';
import { inject, observer } from 'mobx-react';
import { Link } from 'react-router-dom';
import { CommunityByPoints } from 'stores/CommunityByPoints';
import Header from 'pages/Community/components/Header';
import Avatar from 'components/Avatar';
import PointsBadge from 'components/PointsBadge';
import TrLoadingSkeleton from 'pages/Community/components/TrLoadingSkeleton';

import './styles.scss';

interface Props {
  communityByPoints: CommunityByPoints;
}

@inject('communityByPoints')
@observer
class ByPointsPage extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.communityByPoints.items.length <= 0) {
      this.props.communityByPoints.getUsers();
    }
  }

  componentWillUnmount() {
    this.props.communityByPoints.clearState();
  }

  render() {
    return (
      <div>
        <Header
          title="Leaderboard 🏆"
          description={
            <p>
              Top users in Vuukle network by <Link to="/community/levels">points</Link>
            </p>
          }
        />
        <div className="container">
          <div className="card">
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
                  <th scope="col">Points</th>
                </tr>
              </thead>
              {this.props.communityByPoints.loading ? (
                <TrLoadingSkeleton />
              ) : (
                <tbody>
                  {this.props.communityByPoints.items.map((user, key: number) => (
                    <tr key={key}>
                      <td style={{ textAlign: 'center' }}>{key + 1}</td>
                      <td>
                        <Link to={`/profile/${user.apiKey}`}>
                          <Avatar name={user.name} src={user.avatar} size="36px" />
                          <span style={{ marginLeft: '5px' }}>{user.name}</span>
                        </Link>
                      </td>
                      <td>
                        <PointsBadge points={user.points} hideWord />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default ByPointsPage;
