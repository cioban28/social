import React from 'react';
import Article from 'stores/models/Article';
import ArticleListItemsLoadingSkeleton from './components/ArticleListItemsLoadingSkeleton';
import ArticleListItem from '../ArticleListItem';

interface Props {
  articles: Article[];
  loading: boolean;
}

const ArticleList = ({ articles, loading }: Props) => {
  return (
    <div>
      {/** Loading Skeleton */}
      {loading && articles.length <= 0 && <ArticleListItemsLoadingSkeleton />}
      {/** Render tags */}
      {articles.map((article: Article, index) => (
        <ArticleListItem article={article} key={index + 1} />
      ))}
    </div>
  );
};

export default ArticleList;
