import React from 'react';
import { Link } from 'react-router-dom';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import { Button, Alert } from 'reactstrap';
import { Input } from 'components/FormikElements';
import { css } from 'emotion';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
  email: string;
}

interface Values {
  email: string;
  password: string;
}

const form_footer = css({
  display: 'flex',
  'flexd-irection': 'column',
  padding: '10px 0',
  '@media (min-width: 450px)': {
      'flex-direction': 'row',
      'justify-content': 'space-between'
  }
});

const LoginForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
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
      <div>
        {status && status.error && <Alert color="danger">{status.error}</Alert>}
        <Button
          color="primary"
          className="login-form-button"
          style={{ height: '36px', marginTop: '10px' }}
          block
          disabled={isSubmitting}
        >
          Sign in
        </Button>
        <div className={form_footer}>
          <span>
            <Link className="login-form-forgot" to="/forgot-password">
              Forgot password?
            </Link>
          </span>
          <span>
            Don't have an account? <Link to="/sign-up">Sign up</Link>
          </span>
        </div>
      </div>
    </form>
  );
};

const FormikLoginForm = withFormik<Props, Values, any>({
  mapPropsToValues: (props) => ({
    email: props.email,
    password: '',
  }),
  validate: (values) => {
    const errors: any = {};

    /** Validate password field */
    if (!values.password) {
      errors.password = 'Password field cannot be empty.';
    }

    /** Validate email field */
    if (!values.email) {
      errors.email = 'Email field cannot be empty.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter valid email.';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, setStatus, props }: FormikBag<Props, Values>) => {
    props.auth.setEmail(values.email);
    props.auth.setPassword(values.password);

    props.auth
      .login()
      .then(() => {
        if (props.user.details && props.user.details.email) {
          setStatus({ success: true });
          props.history.replace('/');
        } else {
          setStatus({ success: false, error: props.auth.error });
          setTimeout(() => setStatus({}), 4000);
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: 'LoginForm', // helps with React DevTools
})(LoginForm);

export default FormikLoginForm;
