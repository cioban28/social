import React from 'react';
import * as vuukleLogo from 'static/vuukle-logo.svg';
import './styles.scss';

const AccessWrapper = ({
  description,
  children,
  title = 'Welcome to Vuukle',
}: {
  description?: any;
  title?: string;
  children: any;
}) => {
  return (
    <div className="access-wrapper">
      <div className="card access-wrapper-card">
        <div className="card-body">
          <div className="header">
            <img src={vuukleLogo} alt="Vuukle" />
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AccessWrapper;
