import React from 'react';
import { Link } from 'react-router-dom';
import * as trendingIcon from 'static/trending.svg';
import { css } from 'emotion';

interface Props {
  name: string;
  comments: number;
}

const TagListItem = ({ name, comments, ...props }: Props) => {
  return (
    <Link
      to={`/publishers/${name}`}
      className={`list-group-item list-group-item-action ${css`
        border: none;
        display: flex !important;
        align-items: center;
        p {
          margin-bottom: 0;
        }
      `}`}
      {...props}
    >
      <img src={trendingIcon} width={20} height={20} />
      <div
        className={css`
          margin-left: 10px;
          display: flex;
          flex-grow: 1;
          flex-direction: column;
        `}
      >
        <p>#{name}</p>
        <small>{comments} comments</small>
      </div>
    </Link>
  );
};

export default TagListItem;
