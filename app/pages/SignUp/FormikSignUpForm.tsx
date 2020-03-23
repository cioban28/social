import React from 'react';
import { Link } from 'react-router-dom';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/Auth';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import { Form, FormGroup, Button, Label, Alert, Input } from 'reactstrap';
import { Input as FormikInput } from 'components/FormikElements';

interface Props {
  history: any;
  user: UserStore;
  auth: AuthStore;
}

interface Values {
  name: string;
  email: string;
  password: string;
  ageRange: '0' | '1' | '2' | '3' | '4' | '5' | '6' | '';
}

const SignUpForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
  const { values, touched, errors, isSubmitting, handleChange, handleBlur, handleSubmit } = props;
  return (
    <Form onSubmit={handleSubmit} className="login-form">
      <FormikInput
        id="name"
        type="text"
        label="Name"
        placeholder="Name"
        error={touched.name && errors.name}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormikInput
        id="email"
        type="email"
        label="Email"
        placeholder="example@domain.com"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormikInput
        id="password"
        type="password"
        label="Password"
        placeholder="Password"
        error={touched.password && errors.password}
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <FormGroup>
        <Label for="age_range">Age Range</Label>
        <Input type="select" name="ageRange" id="age_range" value={values.ageRange} onChange={handleChange}>
          <option value=""></option>
          <option value="0">0 - 17</option>
          <option value="1">18 - 24</option>
          <option value="2">25 - 34</option>
          <option value="3">35 - 44</option>
          <option value="4">45 - 54</option>
          <option value="5">55 - 64</option>
          <option value="6">65+</option>
        </Input>
      </FormGroup>
      <div>
        {props.auth.error && <Alert color="danger">{props.auth.error}</Alert>}
        <Button
          color="primary"
          className="login-form-button"
          style={{ height: '36px', marginTop: '10px' }}
          block
          disabled={isSubmitting}
        >
          Sign up
        </Button>
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0' }}>
          <span />
          <span>
            Already have an account? <Link to="/login">Sign in</Link>
          </span>
        </div>
      </div>
    </Form>
  );
};

const FormikSignUpForm = withFormik<Props, Values, any>({
  mapPropsToValues: () => ({
    name: '',
    email: '',
    password: '',
    ageRange: '',
  }),
  validate: (values) => {
    const errors: any = {};

    /** Validate name field */
    if (!values.name) {
      errors.name = 'Name field cannot be empty.';
    } else if (values.name.length < 4) {
      errors.name = 'Minimum 4 chars';
    } else if (values.name.length > 32) {
      errors.name = 'Maximum 32 chars';
    }

    /** Validate email field */
    if (!values.email) {
      errors.email = 'Email field cannot be empty.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Please enter valid email.';
    }

    /** Validate password field */
    if (!values.password) {
      errors.password = 'Password field cannot be empty.';
    } else if (values.password.length < 5) {
      errors.password = 'Password length should not be less than 5 characters.';
    } else if (values.password.length > 32) {
      errors.password = 'Password length should not be more than 32 characters.';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, props }: FormikBag<Props, Values>) => {
    props.auth.setName(values.name);
    props.auth.setEmail(values.email);
    props.auth.setPassword(values.password);
    let ageRange: '0' | '1' | '2' | '3' | '4' | '5' | '6';
    if (values.ageRange === '') {
      ageRange = '0';
    } else {
      ageRange = values.ageRange;
    }
    props.auth.setAgeRange(ageRange);

    props.auth
      .signup()
      .then(() => {
        if (!props.auth.error) {
          props.history.replace('/');
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  },
  displayName: 'SignUpForm', // helps with React DevTools
})(SignUpForm);

export default FormikSignUpForm;
