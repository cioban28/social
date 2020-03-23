import React from 'react';
import withSizes from 'react-sizes';
import { Link } from 'react-router-dom';
import PublisherLogo from 'components/PublisherLogo';
import Article from 'stores/models/Article';
import ImageCover from 'components/ImageCover';
import ShareButton from 'components/ShareButton';
import ArticleAvatat from 'components/ArticleAvatar';
import './styles.scss';

interface Props {
  article: Article;
  isMobile: boolean;
}
const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

const ArticleListItem = ({ article, isMobile }: Props) => {
  const { title, url, image, publisher, timeago, shares, recommends, comments, reactions } = article.data;
  return (
    <div className="card mb-4">
      {isMobile && <ImageCover imageUrl={image} />}
      <div className="card-body">
        <div className="row">
          <div className="col-sm-12 col-md-8 order-last order-md-first">
            <a className="text-dark" target="_blank" href={url}>
              <h5 className="card-title">{title}</h5>
            </a>
            <Link className="text-muted small" to={`/publisher/${publisher}`}>
              <PublisherLogo name={publisher} size="25px" />
              <span className="ml-2">{publisher}</span>
            </Link>
            <span className="mx-1 text-black-50 text-bold">&middot;</span>
            <span className="text-black-50 small">{timeago}</span>
          </div>
          {!isMobile && (
            <div className="col-sm-12 col-md-4 order-first order-md-last h-25">
              <ArticleAvatat title={title} image={image} />
            </div>
          )}
        </div>
        <div className="row px-3 mt-3 text-muted">
          <ul className="list-inline mb-0">
            <li className="list-inline-item">
              <span className="small">Recommends</span>
              <span className="badge badge-pill badge-light ml-1">{recommends}</span>
            </li>
            <span className="d-none d-sm-inline mr-2 text-black-50 text-bold">&middot;</span>
            <li className="list-inline-item">
              <ShareButton shares={shares} article={{ title, url }} />
            </li>
            <span className="d-none d-sm-inline mr-2 text-black-50 text-bold">&middot;</span>
            <li className="list-inline-item small">
              <a className="link-to text-muted" target="_blank" href={`${url}#vuukle-comments`}>
                {comments} Comments
              </a>
            </li>
            <span className="d-none d-sm-inline mr-2 text-black-50 text-bold">&middot;</span>
            <li className="list-inline-item small">
              <a className="link-to text-muted" target="_blank" href={`${url}#vuukle-emote`}>
                {reactions} Reactions
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default withSizes(mapSizesToProps)(ArticleListItem);
