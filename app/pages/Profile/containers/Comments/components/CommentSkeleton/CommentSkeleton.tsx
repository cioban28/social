import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';

const CommentSkeleton = () => {
  return (
    <div className="card" style={{ marginBottom: '20px' }}>
      <div className="card-body">
        <div style={{ marginBottom: '10px', textAlign: 'right' }}>
          <LoadingSkeleton style={{ height: '25px', width: '100px' }} />
          <LoadingSkeleton style={{ height: '12px', width: '150px' }} />
        </div>
        <div style={{ display: 'flex' }}>
          <LoadingSkeleton style={{ width: '50px', height: '50px' }} shape="circle" />
          <div style={{ marginLeft: '10px' }}>
            <LoadingSkeleton style={{ width: '60px', height: '14px' }} />
            <LoadingSkeleton style={{ width: '160px', height: '14px' }} />
            <LoadingSkeleton style={{ width: '140px', height: '14px' }} />
            <LoadingSkeleton style={{ width: '100px', height: '14px' }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentSkeleton;
