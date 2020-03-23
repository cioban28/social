import React from 'react';
import { Link } from 'react-router-dom';
import { Publisher } from 'stores/Explore';
import './styles.scss';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import PublisherListItem from 'components/PublisherListItem';

interface Props {
  title?: string;
  publishers: Publisher[];
  loading: boolean;
  loadMore?: () => void;
}

const Publishers = ({ title, publishers, loading, loadMore }: Props) => {
  return (
    <div className="card">
      {/* Title */}
      {title && <div className="card-header">{title}</div>}
      <div className="list-group list-group-flush">
        {/** Loading Skeleton */}
        {loading && publishers.length <= 0 && <ListItemsLoadingSkeleton />}
        {/** Render Publishers */}
        {publishers.map((publisher: Publisher) => (
          <PublisherListItem name={publisher.name} comments={publisher.comments} key={publisher.name} />
        ))}
        {/** Load more */}
        {publishers.length > 0 &&
          (loadMore ? (
            <a
              href="#"
              className="list-group-item list-group-item-action"
              style={{ textAlign: 'center' }}
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.preventDefault();
                if (loading) {
                  return;
                }
                return loadMore();
              }}
            >
              {loading ? 'Loading...' : 'Load More'}
            </a>
          ) : (
            <Link className="list-group-item list-group-item-action text-center" to="/explore">
              See all
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Publishers;
