import React from 'react';
import { css } from 'emotion';
import Header from 'pages/Community/components/Header';
import Footer from 'components/Footer';
import LevelDemo from './components/LevelDemo';

const pointsReward = [
  { action: 'Comment Post', reward: 5 },
  { action: 'Article Recommend', reward: 4 },
  { action: 'Article share', reward: 3 },
  { action: 'Vote inside Reaction widget', reward: 3 },
  { action: 'Upvote comment', reward: 1 },
  { action: 'Approved comment report', reward: 2 },
  { action: 'Received upvote', reward: 1 },
  { action: 'Other', reward: 1 },
];

class Levels extends React.Component {
  render() {
    return (
      <div>
        <Header
          title="Levels and points"
          // tslint:disable-next-line
          description="All you need to know about how do we measure users activity and what you can get as a reward of being active and polite in our community 🎁"
        />
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-lg-6">
              <div className="card" style={{ marginBottom: '20px' }}>
                <div className="card-header">All levels</div>
                <div className="card-body">
                  <p>
                    Besides earning points, you receive a user level for being active and helpful in our community.
                    Levels appear on profile pages.
                  </p>
                  <div
                    className={css`
                      display: flex;
                      justify-content: center;
                      flex-wrap: wrap;
                    `}
                  >
                    <LevelDemo points={100} />
                    <LevelDemo points={400} />
                    <LevelDemo points={700} />
                    <LevelDemo points={2200} />
                    <LevelDemo points={2600} />
                  </div>
                </div>
              </div>
              <div className="card" id="points-card">
                <div className="card-header">Points</div>
                <div className="card-body">
                  <p>
                    Points can give you a higher level, custom badge colors so others will see your value inside
                    conversations.
                  </p>
                  <p>
                    You can earn points by doing different actions. Check table below to know how many points you can
                    earn.
                  </p>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Action</th>
                        <th scope="col" style={{ textAlign: 'center' }}>
                          Points Reward
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointsReward.map((item, num) => (
                        <tr key={num}>
                          <td>{item.action}</td>
                          <td style={{ textAlign: 'center' }}>{item.reward}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default Levels;
