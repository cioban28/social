import React from 'react';

interface Props {
  error: string;
  message?: string | React.ReactElement<any> | HTMLElement;
}

const InputFeedback = ({ error, message }: Props) => {
  if (error) {
    return <div className="invalid-feedback">{error}</div>;
  } else if (message) {
    return <small className="form-text">{message}</small>;
  }
  return null;
};

export default InputFeedback;
