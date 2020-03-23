import React from 'react';
import withSizes from 'react-sizes';
import ImageCover from 'components/ImageCover';
import PublisherLogo from 'components/PublisherLogo';
import PublisherCardLoadingSkeleton from '../PublisherCardLoadingSkeleton';

import { convertLongNumber } from 'utils';

// import Publisher from 'stores/models/Publisher';

interface Props {
  isMobile: boolean;
  publisher: any;
  loading: boolean;
}

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 768,
});

const PublisherCard = ({ publisher, loading, isMobile }: Props) => {
  return (
    <div>
      {loading && !publisher && <PublisherCardLoadingSkeleton />}
      {publisher && (
        <div className="card">
          <ImageCover imageUrl={publisher.data.coverImage} height="100px" />
          <div className="text-center d-inline-block" style={{ marginTop: '-36px' }}>
            <PublisherLogo name={publisher.data.host} size="72px" />
          </div>
          <div className="card-body">
            <h4 className="card-title text-center">{publisher.data.host}</h4>
            {isMobile ? (
              <div className="d-flex justify-content-around">
                <div className="d-inline-block text-center">
                  <p className="h5">{convertLongNumber(publisher.data.postsNumber)}</p>
                  <small>Recommends received</small>
                </div>
                <div className="d-inline-block text-center">
                  <p className="h5">{convertLongNumber(publisher.data.recommnedsReceived)}</p>
                  <small>Posts</small>
                </div>
                <div className="d-inline-block text-center">
                  <p className="h5">{convertLongNumber(publisher.data.commentsOnArticles)}</p>
                  <small>Comments on articles</small>
                </div>
              </div>
            ) : (
              <tbody>
                <tr>
                  <td className="h5 pr-1 pr-sm-2 pb-sm-2">{convertLongNumber(publisher.data.postsNumber)}</td>
                  <td className="">Posts</td>
                </tr>
                <tr>
                  <td className="h5 pr-1 pr-sm-2 pb-sm-2">{convertLongNumber(publisher.data.recommnedsReceived)}</td>
                  <td className="">Recommends received</td>
                </tr>
                <tr>
                  <td className="h5 pr-1 pr-sm-2 pb-sm-2">{convertLongNumber(publisher.data.commentsOnArticles)}</td>
                  <td className="">Comments on articles</td>
                </tr>
              </tbody>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default withSizes(mapSizesToProps)(PublisherCard);
