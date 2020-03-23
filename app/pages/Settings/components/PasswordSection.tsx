import React from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from 'stores/User';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import { changePasswordWithToken } from 'services/api';
import { Input } from 'components/FormikElements';

interface Props {
  user?: UserStore;
}

interface Values {
  currentPassword: string;
  password: string;
  repeatPassword: string;
}

const PasswordForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, status } = props;
  console.log('props', props, status);
  return (
    <form onSubmit={handleSubmit}>
      <Input
        id="currentPassword"
        type="password"
        label="Current Password"
        placeholder="Enter your current password"
        error={touched.currentPassword && errors.currentPassword}
        value={values.currentPassword}
        onChange={handleChange}
        onBlur={handleBlur}
        message={<a href="#">Forgot Password?</a>}
      />
      <Input
        id="password"
        type="password"
        label="New Password"
        placeholder="Enter new password"
        error={touched.password && errors.password}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        id="repeatPassword"
        type="password"
        label="Current Password"
        placeholder="Enter your current password"
        error={touched.repeatPassword && errors.repeatPassword}
        value={values.repeatPassword}
        onChange={handleChange}
        onBlur={handleBlur}
      />

      {/* Display error if server returned it */}
      {status && status.error && <div className="alert alert-danger">{status.error}</div>}
      {/* Display success message */}
      {status &&
        status.success && <div className="alert alert-success">Your password has been changed successfully</div>}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={isSubmitting}
        style={{ display: 'block', width: '100%' }}
      >
        Save
      </button>
    </form>
  );
};

const EnhancedForm = withFormik<Props, Values, any>({
  mapPropsToValues: () => ({
    currentPassword: '',
    password: '',
    repeatPassword: '',
  }),
  validate: (values) => {
    const errors: any = {};

    if (!values.currentPassword) {
      errors.currentPassword = 'This field is required.';
    }

    /** Validate new password field */
    if (!values.password) {
      errors.password = 'This field is required.';
    } else if (values.password.length < 5) {
      errors.password = 'Password length should not be less than 5 characters.';
    } else if (values.password.length > 32) {
      errors.password = 'Password length should not be more than 32 characters.';
    }

    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = `Passwords doesn't match`;
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, setStatus, resetForm, props }: FormikBag<Props, Values>) => {
    changePasswordWithToken(props.user.details.email, values.currentPassword, values.password)
      .then((response: any) => {
        if (response.success) {
          resetForm();
          setStatus({ success: true });
          setTimeout(() => setStatus({}), 4000);
        } else {
          setStatus({ success: false, error: `Please check if value inside 'Current Password' field is correct.` });
        }
      })
      .catch(() => {
        setStatus({ success: false, error: 'Server error. Please try again later or contact with support' });
      })
      .finally(() => setSubmitting(false));
  },
  displayName: 'ChangePasswordForm', // helps with React DevTools
})(PasswordForm);
// ========

@inject('user')
@observer
class PasswordSection extends React.Component<Props, {}> {
  render() {
    return <EnhancedForm user={this.props.user} />;
  }
}

export default PasswordSection;
