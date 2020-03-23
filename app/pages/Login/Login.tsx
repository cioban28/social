import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { getURLParams } from 'utils';
import AccessPagesWrapper from 'components/AccessPagesWrapper';
import FormikLoginForm from './FormikLoginForm';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
  email: string;
}

interface State {}

@inject('user', 'auth')
@observer
class LoginPage extends React.Component<Props, State> {
  emailFromQuery: string;

  constructor(props: any) {
    super(props);
    this.state = {};

    /** Data received from query string inside URL */
    this.emailFromQuery = decodeURIComponent(getURLParams('email'));
  }

  componentWillMount() {
    /** Replace user if user is authenticated */
    if (this.props.user.details && this.props.user.details.email) {
      this.props.history.replace('/');
    }
  }

  componentWillUnmount() {
    /** Clear auth values on route change */
    this.props.auth.reset();
  }

  render() {
    return (
      <AccessPagesWrapper description="Sign In for Vuukle with your email address or social media account">
        <FormikLoginForm
          user={this.props.user}
          auth={this.props.auth}
          history={this.props.history}
          email={this.emailFromQuery}
        />
      </AccessPagesWrapper>
    );
  }
}

export default LoginPage;
