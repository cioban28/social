import React from 'react';
import withSizes from 'react-sizes';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import UserListItem from '../UserListItem';

interface Props {
  isMobile: boolean;
  title: string;
  loading: boolean;
  users: any[];
  loadMore: () => void;
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

const UsersList = ({ title, loading, users, loadMore, isMobile }: Props) => {
  return (
    <div className="card mt-0 mt-sm-4 mb-4">
      <h6 className="card-header">{title}</h6>
      <div className={isMobile ? 'list-inline d-flex justify-content-around my-3' : 'list-group list-group-flush'}>
        {/** Loading Skeleton */}
        {loading && users.length <= 0 && <ListItemsLoadingSkeleton />}
        {/** Render Publishers */}
        {users.map((user) => (
          <UserListItem user={user} key={user.id} />
        ))}
        {!isMobile &&
          loadMore &&
          users.length > 0 && (
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
          )}
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(UsersList);
