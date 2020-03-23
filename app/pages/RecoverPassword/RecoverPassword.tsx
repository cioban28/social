import React from 'react';
import { observer, inject } from 'mobx-react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { getURLParams } from 'utils';
import AccessPagesWrapper from 'components/AccessPagesWrapper';
import FormikRecoverForm from './FormikRecoverForm';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
  verificationKey: string;
  emailVal: string;
}

interface State {
  confirmPasswordDirty: boolean;
  inProgress: boolean;
}

@inject('user', 'auth')
@observer
class RecoverPasswordPage extends React.Component<Props, State> {
  verificationKey: string;
  emailVal: string;

  constructor(props: any) {
    super(props);
    this.state = {
      confirmPasswordDirty: false,
      inProgress: false,
    };

    /** Data received from query string inside URL */
    this.verificationKey = decodeURIComponent(getURLParams('code'));
    this.emailVal = decodeURIComponent(getURLParams('email'));
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
      <AccessPagesWrapper description="Select your new password">
        <FormikRecoverForm
          user={this.props.user}
          auth={this.props.auth}
          history={this.props.history}
          verificationKey={this.verificationKey}
          emailVal={this.emailVal}
        />
      </AccessPagesWrapper>
    );
  }
}

export default RecoverPasswordPage;
