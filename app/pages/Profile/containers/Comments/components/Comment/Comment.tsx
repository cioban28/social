import React from 'react';
import { observer } from 'mobx-react';
import { ProfileDetails } from 'stores/PublicProfile';
import Spin from 'antd/lib/spin';
import { css } from 'emotion';
import { Comment } from 'stores/models/Comment';
import Avatar from 'components/Avatar';
import './styles.scss';

interface Props {
  comment: Comment;
  profileDetails: ProfileDetails;
  /** Determinates if user is owner of the comment */
  isOwner?: boolean;
  handleCommentDelete: (comment: Comment) => void;
}


const CommentItem = ({ comment, profileDetails, isOwner, handleCommentDelete, ...props }: Props) => {
  console.log('updated???? comment:', comment);
  return (
    <div className="card Comment" {...props}>
      {comment.loading && (
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
          `}
        >
          <div
            className={css`
              display: block;
              width: 100%;
              height: 100%;
              position: absolute;
              background: black;
              opacity: 0.2;
              text-align: center;
              background: black;
              border-radius: 2px;
            `}
          />
          <Spin />
        </div>
      )}
      <div className="card-body">
        <div className="Comment-header">
          <h3>{comment.data.title}</h3>
          <ul className="Comment-details">
            <li>{comment.data.comments} Comments</li>
            <li>
              Discussion on{' '}
              <a href={`${comment.data.uri}`} target="_blank" rel="nofollow">
                {comment.data.host}
              </a>
            </li>
          </ul>
        </div>
        <div className="Comment-content">
          <div>
            <Avatar name={profileDetails.name} src={profileDetails.avatar} size="32px" />
          </div>
          <div>
            <ul className="Comment-details">
              <li>
                <a href="#">{profileDetails.name}</a>
              </li>
              <li>
                <span>{comment.data.timeago}</span>
              </li>
            </ul>
            <p>{comment.data.commentText}</p>
            <div style={{ marginTop: '10px' }}>
              <ul className="Comment-details">
                {isOwner && (
                  <li>
                    <a
                      href="#"
                      onClick={(e) => {
                        e.preventDefault();
                        handleCommentDelete(comment);
                      }}
                    >
                      Delete
                    </a>
                  </li>
                )}
                <li>
                  <a href={comment.data.uri} target="_blank" rel="nofollow">
                    View in discussion
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default observer(CommentItem);
