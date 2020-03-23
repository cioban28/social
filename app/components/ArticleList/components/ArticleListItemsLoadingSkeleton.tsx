import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';

const ArticleListItemsLoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((num: number) => (
      <div key={num} className="card mb-4">
        <div className="card-body">
          <div className="row mx-0 mb-3">
            <div className="col-sm-12 col-md-8 order-last order-md-first p-0">
              <LoadingSkeleton style={{ width: '100%', height: '16px' }} />
              <LoadingSkeleton style={{ width: '70%', height: '16px' }} />
              <div className="row m-0">
                <LoadingSkeleton shape="circle" style={{ width: '35px', height: '35px' }} />
                <LoadingSkeleton style={{ width: '170px', height: '16px', margin: '15px 0 0 15px' }} />
              </div>
            </div>
            <div className="col-sm-12 col-md-4 order-first order-md-last h-25">
              <LoadingSkeleton style={{ width: '133px', height: '100px' }} />
            </div>
          </div>
          <div className="row m-0">
            <LoadingSkeleton style={{ maxWidth: '100%', height: '12px', width: '100%' }} />
          </div>
        </div>
      </div>
    ))}
  </>
);

export default ArticleListItemsLoadingSkeleton;
