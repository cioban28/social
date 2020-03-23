import React from 'react';
import { inject, observer } from 'mobx-react';
import Spin from 'antd/lib/spin';
import Image from 'components/Image';
import { css } from 'emotion';
import { ProfileRecommends, Article } from 'stores/ProfileRecommends';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import EmptyState from 'pages/Profile/components/EmptyState';

interface Props {
  profileRecommends: ProfileRecommends;
}

const listItemStyle = css`
  display: flex !important;
  > div:last-child {
    p {
      margin: 0;
    }
    flex: 1 1 auto;
    margin-left: 10px;
  }
`;

@inject('profileRecommends')
@observer
class RecommendsPage extends React.Component<Props, {}> {
  componentDidMount() {
    if (this.props.profileRecommends.recommends.length <= 0 && !this.props.profileRecommends.loading) {
      this.props.profileRecommends.getRecommends();
    }
  }

  componentWillUnmount() {
    this.props.profileRecommends.cleanRecommends();
  }

  render() {
    const { loading, recommends } = this.props.profileRecommends;

    return (
      <div className="card">
        <div className="card-header">Latest Recommends</div>
        <div className="list-group list-group-flush">
          {recommends.length <= 0 && loading ? (
            <ListItemsLoadingSkeleton />
          ) : recommends.length > 0 ? (
            recommends.map((item: Article, key) => (
              <a href={item.url} className={`${listItemStyle} list-group-item list-group-item-action`} key={key}>
                <Image title={item.title} src={item.avatar} width="40px" height="40px" />
                <div>
                  <p>{item.title}</p>
                  <small className="text-muted">{item.comments} comments</small>
                </div>
              </a>
            ))
          ) : (
            <EmptyState message={'No recommends yet'} />
          )}

          {loading &&
            recommends.length > 0 && (
              <div className="list-group-item" style={{ textAlign: 'center' }}>
                <Spin />
              </div>
            )}

          {!loading &&
            recommends.length > 0 && (
              <a
                href="#"
                className="list-group-item list-group-item-action"
                style={{ textAlign: 'center' }}
                onClick={(e) => {
                  e.preventDefault();
                  this.props.profileRecommends.getRecommends();
                }}
              >
                Load more
              </a>
            )}
        </div>
      </div>
    );
  }
}

export default RecommendsPage;
