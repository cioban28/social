import React from 'react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { Button, Alert } from 'reactstrap';
import { Input } from 'components/FormikElements';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import Cookies from 'js-cookie';
import { ERRORS } from 'common';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
}

interface Values {
  email: string;
  emailSent: boolean;
}

const ForgetForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
  return (
    <div>
      {values.emailSent ? (
        <Alert color="success">
          An e-mail with further instructions is sent. You may need to check your spam folder.
        </Alert>
      ) : (
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
          {props.auth.error && (
            <Alert style={{ margin: '10px 0' }} color="danger">
              {props.auth.error}
            </Alert>
          )}
          <div>
            <Button
              color="primary"
              className="login-form-button"
              style={{ height: '36px', marginTop: '10px', display: 'block', width: '100%' }}
              block
              disabled={isSubmitting}
            >
              Reset password
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

const FormikForgetForm = withFormik<Props, Values, any>({
  mapPropsToValues: () => ({
    email: '',
    emailSent: false,
  }),
  validate: (values) => {
    const errors: any = {};

    /** Validate email field */
    if (!values.email) {
      errors.email = 'Email field cannot be empty.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter valid email.';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }: FormikBag<Props, Values>) => {
    const tries: number = parseInt(Cookies.get('triesAmount'), 10);

    if (!tries) {
      const fiveHours = 5 / 24;
      Cookies.set('triesAmount', '1', { expires: fiveHours });
    } else if (tries >= 5) {
      props.auth.error = 'You have exceed the max amout of tries. Please try again in 5 hours.';
      setSubmitting(false);
      return;
    } else {
      Cookies.set('triesAmount', (tries + 1).toString());
    }

    props.auth
      .forgotPass()
      .then((res: any) => {
        if (
          (res && res.success) ||
          /** If user doesn't exist user requesting recover shouldn't know this */
          (Array.isArray(res.errors) && res.errors.indexOf('user_does_not_exist') !== -1)
        ) {
          values.emailSent = true;
        } else if (res.errors) {
          props.auth.error = ERRORS[res.errors[0]];
        }
      })
      .catch((error: string) => alert(error))
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: 'ForgetForm', // helps with React DevTools
})(ForgetForm);

export default FormikForgetForm;
