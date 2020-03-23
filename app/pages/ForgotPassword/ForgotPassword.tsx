import React from 'react';
import { Link } from 'react-router-dom';
import { observer, inject } from 'mobx-react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import AccessPagesWrapper from 'components/AccessPagesWrapper';
import FormikForgetForm from './FormikForgetForm'

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
}

@inject('user', 'auth')
@observer
class ForgotPassword extends React.Component<Props> {
  constructor(props: any) {
    super(props);
  }

  componentWillMount() {
    this.props.auth.error = undefined;
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
      <AccessPagesWrapper
        title="RECOVER YOUR PASSWORD"
        description="If you've forgotten your password, we'll send you an email to reset your password."
      >
        <FormikForgetForm user={this.props.user} auth={this.props.auth} history={this.props.history} />
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span>
            <Link className="login-form-forgot" to="/login">
              ← Return to Login
            </Link>
          </span>
        </div>
      </AccessPagesWrapper>
    );
  }
}

export default ForgotPassword;
