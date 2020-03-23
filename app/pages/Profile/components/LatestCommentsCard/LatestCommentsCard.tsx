import React from 'react';
import { Link } from 'react-router-dom';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import { css } from 'emotion';
import Comment from 'stores/models/Comment';
import './styles.scss';

interface Props {
  loading: boolean;
  comments: Comment[];
  showMoreLink: string;
}

const LatestCommentsCard = ({ comments, loading, showMoreLink }: Props) => {
  return (
    <div className="card">
      <div className="card-header">Latest Comments</div>
      <div className="list-group list-group-flush">
        {loading ? (
          <ListItemsLoadingSkeleton />
        ) : (
          comments.map((comment) => (
            <div
              className={`list-group-item ${css`
                p {
                  margin-bottom: 5px;
                  word-break: break-word;
                }
              `}`}
              key={comment.data.id}
            >
              <p dangerouslySetInnerHTML={{ __html: comment.data.commentText }} />
              <div
                className={css`
                  font-size: 0.9rem;
                `}
              >
                <a href={comment.data.uri}>{comment.data.host}</a>{' '}
                <span
                  className={css`
                    &:before {
                      color: #42526e;
                      content: '\\B7';
                      display: inline-block;
                      text-align: center;
                      vertical-align: middle;
                      width: 16px;
                    }
                  `}
                >
                  {comment.data.timeago}
                </span>
              </div>
            </div>
          ))
        )}
        <Link to={showMoreLink} className="list-group-item list-group-item-action" style={{ textAlign: 'center' }}>
          See all
        </Link>
      </div>
    </div>
  );
};

export default LatestCommentsCard;
