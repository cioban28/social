import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import AccessPagesWrapper from 'components/AccessPagesWrapper';
import FormikSignUpForm from './FormikSignUpForm';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
}

interface State {}

@inject('user', 'auth')
@observer
class SignUpPage extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {};
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
      <AccessPagesWrapper description="Sign Up for Vuukle with your email address or social media account">
        <FormikSignUpForm user={this.props.user} auth={this.props.auth} history={this.props.history} />
      </AccessPagesWrapper>
    );
  }
}

export default SignUpPage;
