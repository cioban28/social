import React from 'react';
import { Link } from 'react-router-dom';
import Footer from 'components/Footer';
import { css } from 'emotion';

class NotFoundPage extends React.Component {
  render() {
    return (
      <div
        className={css`
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
        `}
      >
        <div
          className={css`
            display: flex;
            justify-content: center;
            align-items: center;
          `}
        >
          <h1
            className={css`
              display: inline-block;
              border-right: 1px solid rgba(0, 0, 0, 0.3);
              margin: 0;
              margin-right: 20px;
              padding: 15px 20px 15px 0;
              font-size: 28px;
              font-weight: 500;
              vertical-align: top;
            `}
          >
            404
          </h1>
          <div>
            <h2
              className={css`
                font-size: 16px;
                font-weight: normal;
                margin: 0;
                margin-bottom: 5px;
                line-height: 30px;
              `}
            >
              This page could not be found.
            </h2>
            <Link
              className={css`
                text-transform: uppercase;
                font-size: 14px;
              `}
              to="/"
            >
              Return to home
            </Link>
          </div>
        </div>
        <Footer style={{ marginTop: '50px' }} />
      </div>
    );
  }
}

export default NotFoundPage;
