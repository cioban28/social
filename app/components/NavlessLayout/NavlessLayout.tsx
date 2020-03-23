import React from 'react';
import DevTools from 'mobx-react-devtools';
import { Route } from 'react-router-dom';
import Footer from '../Footer';
import './styles.scss';

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div className="navlessLayout">
          {/* Use Mobx DevTools inside development environment */}
          {process.env.NODE_ENV === 'development' && <DevTools />}
          <Component {...matchProps} />
          <Footer />
        </div>
      )}
    />
  );
};

export default DefaultLayout;
