import React from 'react';
import { Link } from 'react-router-dom';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import { Button, Alert } from 'reactstrap';
import { Input } from 'components/FormikElements';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
  verificationKey: string;
  emailVal: string;
}

interface Values {
  email: string;
  password: string;
  confirmPassword: string;
  verificationKey: string;
}

const RecoverForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit, status } = props;
  return (
    <form onSubmit={handleSubmit} className="login-form">
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="example@domain.com"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled
      />
      <Input
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        error={touched.password && errors.password}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        id="confirmPassword"
        type="password"
        label="Confirm Password"
        placeholder="Password"
        error={touched.confirmPassword && errors.confirmPassword}
        value={values.confirmPassword}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <div>
        {status && status.error && <Alert color="danger">{status.error}</Alert>}
        <Button
          color="primary"
          className="login-form-button"
          style={{ height: '36px', marginTop: '10px' }}
          block
          disabled={isSubmitting}
        >
          Recover
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span />
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

const FormikRecoverForm = withFormik<Props, Values, any>({
  mapPropsToValues: (props) => ({
    email: props.emailVal,
    password: '',
    confirmPassword: '',
    verificationKey: props.verificationKey,
  }),
  validate: (values) => {
    const errors: any = {};

    /** Validate email field */
    if (!values.email) {
      errors.email = 'Email field cannot be empty.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter valid email.';
    }

    /** Validate password field */
    if (!values.password) {
      errors.password = 'Please enter desired new password.';
    } else if (values.password.length < 5) {
      errors.password = 'Password should contain at least 5 symbols.';
    } else if (values.password.length > 32) {
      errors.password = 'Password should not contain more than 32 symbols.';
    }

    /** Validate confirm password field */
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Please confirm your password.';
    } else if (values.confirmPassword.length < 5) {
      errors.confirmPassword = 'Password should contain at least 5 symbols.';
    } else if (values.confirmPassword.length > 32) {
      errors.confirmPassword = 'Password should not contain more than 32 symbols.';
    }

    if (values.password !== values.confirmPassword) {
      if (!errors.confirmPassword) {
        errors.confirmPassword = `Please enter same password as in 'New Password' field.`;
      } else {
        errors.confirmPassword += `Please enter same password as in 'New Password' field.`;
      }
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, setStatus, props }: FormikBag<Props, Values>) => {
    props.auth.setEmail(values.email);
    props.auth.setPassword(values.password);

    props.auth
      .recoverPassword(values.verificationKey)
      .then((res: any) => {
        if (res.success) {
          setStatus({ success: true });
          props.history.replace(`/login?email=${values.email}`);
        } else if (Array.isArray(res.errors)) {
          props.auth.error = 'Your code has been expired or it is not valid. Please make password reset request again.';
          setStatus({ success: false, error: props.auth.error });
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: 'RecoverForm', // helps with React DevTools
})(RecoverForm);

export default FormikRecoverForm;
