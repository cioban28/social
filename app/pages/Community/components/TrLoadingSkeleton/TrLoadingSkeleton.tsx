import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';

const TrLoadingSkeleton = () => {
  return (
    <tbody>
      {[1, 2, 3].map((key) => (
        <tr key={key}>
          <td style={{ textAlign: 'center' }}>
            <LoadingSkeleton style={{ width: '12px', display: 'inline-block' }} />
          </td>
          <td>
            <LoadingSkeleton
              shape="circle"
              style={{ width: '36px', height: '36px', display: 'inline-block', verticalAlign: 'middle' }}
            />
            <LoadingSkeleton
              style={{ width: '50px', display: 'inline-block', marginLeft: '10px', verticalAlign: 'middle' }}
            />
          </td>
          <td>
            <LoadingSkeleton style={{ width: '25px' }} />
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default TrLoadingSkeleton;
