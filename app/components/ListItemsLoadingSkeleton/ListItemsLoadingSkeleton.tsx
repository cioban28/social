import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';

const ListItemsLoadingSkeleton = () => (
  <>
    {[1, 2, 3, 4, 5].map((num: number) => (
      <div key={num} className="list-group-item  publisher-list-item">
        <LoadingSkeleton shape="circle" style={{ width: '35px', height: '35px' }} />
        <div className="publisher-list-item-content">
          <LoadingSkeleton style={{ width: '70px', height: '16px' }} />
          <LoadingSkeleton style={{ maxWidth: '90px', height: '12px', width: '100%' }} />
        </div>
      </div>
    ))}
  </>
);

export default ListItemsLoadingSkeleton;
