import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';

const PublisherCardLoadingSkeleton = () => (
  <>
    {
      <div className="card">
        <div style={{ width: '72px', margin: '0 auto', marginTop: '30px' }}>
          <LoadingSkeleton shape="circle" style={{ width: '72px', height: '72px' }} />
        </div>
        <div className="card-body">
          <LoadingSkeleton style={{ width: '90px', height: '16px', margin: '0 auto', marginBottom: '25px' }} />

          <table>
            <tbody>
              <tr>
                <td className="pr-2 pr-sm-2">
                  <LoadingSkeleton style={{ width: '70px', height: '16px' }} />
                </td>
                <td>
                  <LoadingSkeleton style={{ width: '90px', height: '16px' }} />
                </td>
              </tr>
              <tr>
                <td>
                  <LoadingSkeleton style={{ width: '70px', height: '16px' }} />
                </td>
                <td>
                  <LoadingSkeleton style={{ width: '90px', height: '16px' }} />
                </td>
              </tr>
              <tr>
                <td>
                  <LoadingSkeleton style={{ width: '70px', height: '16px' }} />
                </td>
                <td>
                  <LoadingSkeleton style={{ width: '90px', height: '16px' }} />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    }
  </>
);

export default PublisherCardLoadingSkeleton;
