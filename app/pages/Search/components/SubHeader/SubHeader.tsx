import React from 'react';
import { css } from 'emotion';

interface Props {
  searchValue: string;
}

class SubHeader extends React.Component<Props> {
  render() {
    return (
      <div
        className={css`
          background-color: #4a90e2;
          padding: 16px 0;
        `}
      >
        <div className="container">
          <h1
            className={css`
              color: #fff;
              font-size: 27px;
              font-weight: bold;
              line-height: 32px;
              overflow: hidden;
              padding-left: 12px;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {this.props.searchValue ? `Search: ${this.props.searchValue}` : 'Search'}
          </h1>
        </div>
      </div>
    );
  }
}

export default SubHeader;
