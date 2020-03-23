import React from 'react';
// import DevTools from 'mobx-react-devtools';
import Header from 'components/HeaderNav';
import { Route } from 'react-router-dom';
import './styles.scss';

const DefaultLayout = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={(matchProps) => (
        <div>
          <Header {...matchProps} />
          {/* Use Mobx DevTools inside development environment */}
          {/* {process.env.NODE_ENV === 'development' && <DevTools />} */}
          <Component {...matchProps} />
        </div>
      )}
    />
  );
};

export default DefaultLayout;
