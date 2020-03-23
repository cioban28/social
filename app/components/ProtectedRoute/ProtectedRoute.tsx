import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import DefaultLayout from 'components/DefaultLayout';
import Header from 'components/HeaderNav';
import Spin from 'antd/lib/spin';

const ProtectedRoute = inject('user')(
  observer(({ component: Component, user, ...rest }) => {
    if (user.details && user.details.email && !user.loading) {
      return <DefaultLayout component={Component} {...rest} />;
    } else if (user.loading) {
      return (
        <div>
          <Header />
          <div style={{ margin: '20px 0', textAlign: 'center' }}>
            <Spin size="large" />
          </div>
        </div>
      );
    }
    return (
      <Route
        {...rest}
        render={(props) => (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location },
            }}
          />
        )}
      />
    );
  })
);

export default ProtectedRoute;
