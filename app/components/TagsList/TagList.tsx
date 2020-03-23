import React from 'react';
import ListItemsLoadingSkeleton from 'components/ListItemsLoadingSkeleton';
import TagListItem from '../TagListItem';

export interface Tag {
  name: string;
  comments: number;
}

interface Props {
  title?: string;
  tags: Tag[];
  loading: boolean;
}

const TagsList = ({ title, tags, loading }: Props) => {
  return (
    <div className="card my-4">
      {/* Title */}
      {title && <div className="card-header">{title}</div>}
      <div className="list-group list-group-flush">
        {/** Loading Skeleton */}
        {loading && tags.length <= 0 && <ListItemsLoadingSkeleton />}
        {/** Render tags */}
        {tags.map((tag: Tag) => <TagListItem name={tag.name} comments={tag.comments} key={tag.name} />)}
      </div>
    </div>
  );
};

export default TagsList;
