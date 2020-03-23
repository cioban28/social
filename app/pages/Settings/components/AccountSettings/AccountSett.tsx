import React from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from 'stores/User';
import { withFormik, InjectedFormikProps, FormikBag } from 'formik';
import { Input } from 'components/FormikElements';
import AvatarSelect from './AvatarSelect';
import { updateprofile } from '../../../../services/api';

interface Props {
  user?: UserStore;
}

interface Values {
  name: string;
  email: string;
  avatarSelect: { label: string; value: string };
  avatarUrl: string;
}

const ProfileForm: React.SFC<InjectedFormikProps<Props, Values>> = (props: any) => {
  const {
    values,
    touched,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    status,
    setFieldTouched,
    setFieldValue,
  } = props;
  return (
    <form onSubmit={handleSubmit}>
      <AvatarSelect
        user={props.user}
        value={values.avatarSelect}
        avatarUrl={values.avatarUrl}
        onChange={setFieldValue}
        onBlur={setFieldTouched}
        touched={touched.avatar}
      />
      <Input
        id="name"
        type="text"
        label="Your name"
        placeholder="Enter your name"
        error={touched.name && errors.name}
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        id="email"
        type="email"
        label="Email"
        placeholder="Enter email"
        error={touched.email && errors.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        message="Email changing if temporarily disabled."
        disabled
      />
      {/* Email will not be publicly displayed. 🔝 */}

      {/* Display error if server returned it */}
      {status &&
        status.error && (
          <div className="alert alert-danger">
            Your profile has not been saved. Please try again later or contact with support.
          </div>
        )}
      {/* Display success message */}
      {status &&
        status.success && <div className="alert alert-success">Your account has been updated successfully</div>}

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

const FormikProfileForm = withFormik<Props, Values, any>({
  mapPropsToValues: ({ user }: Props) => ({
    name: user.details.name,
    email: user.details.email,
    avatarSelect: null,
    avatarUrl: user.details.pictureUrl,
  }),
  validate: (values) => {
    const errors: any = {};

    if (!values.name) {
      errors.name = 'This field is required.';
    }

    /** Validate new password field */
    if (!values.email) {
      errors.email = 'This field is required.';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
      errors.email = 'Invalid email address';
    }

    return errors;
  },
  handleSubmit: (values, { setSubmitting, setStatus, props }: FormikBag<Props, Values>) => {
    setSubmitting(true);

    updateprofile(values.name, values.avatarUrl)
      .then((response: any) => {
        if (response.success) {
          setStatus({ success: true });
          props.user.update(values.name, values.avatarUrl);
        }
      })
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') {
          // tslint:disable-next-line
          console.log('updateProfile error', err);
        }
        setStatus({ error: true });
      })
      .finally(() => {
        setSubmitting(false);
        setTimeout(() => setStatus({}), 4000);
      });
  },
  displayName: 'ProfileForm', // helps with React DevTools
})(ProfileForm);

@inject('user')
@observer
class AccountSettings extends React.Component<Props, {}> {
  render() {
    return <FormikProfileForm user={this.props.user} />;
  }
}

export default AccountSettings;
