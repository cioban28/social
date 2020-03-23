import React from 'react';
import { Link } from 'react-router-dom';
import Card from 'antd/lib/card';
import Image from 'components/Image';
import './styles.scss';
import { Article } from 'stores/ProfileRecommends';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import EmptyState from 'pages/Profile/components/EmptyState';

interface Props {
  loading: boolean;
  recommends: Article[];
  showMoreLink: string;
}

const LatestRecommendsCard = ({ recommends, loading, showMoreLink }: Props) => {
  return (
    <Card title="Latest Recommends" className="LatestRecommendsCard">
      <div className="list-group list-group-flush">
        {loading ? (
          <ListItemsLoadingSkeleton />
        ) : recommends.length > 0 ? (
          recommends.slice(0, 5).map((item: Article, key) => (
            <a href={item.url} className="LatestRecommendsCard-item list-group-item list-group-item-action" key={key}>
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
        {recommends.length > 0 && (
          <Link to={showMoreLink} className="list-group-item list-group-item-action" style={{ textAlign: 'center' }}>
            See all
          </Link>
        )}
      </div>
    </Card>
  );
};

export default LatestRecommendsCard;
