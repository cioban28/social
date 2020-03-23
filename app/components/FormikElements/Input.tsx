import React from 'react';
import Label from './Label';
import InputFeedback from './InputFeedback';

interface Props {
  type: 'email' | 'password' | 'text';
  id: string;
  label: string;
  error: string;
  value: string;
  placeholder: string;
  onChange: () => void;
  onBlur?: () => void;
  className?: string;
  message?: string | React.ReactElement<any> | HTMLElement;
  disabled?: boolean;
}

const Input = ({ type, id, label, error, value, onChange, className, message, ...props }: Props) => {
  return (
    <div className={`form-group ${className}`}>
      <Label htmlFor={id}>{label}</Label>
      <input
        id={id}
        className={`form-control ${!!error ? 'is-invalid' : ''}`}
        type={type}
        value={value}
        onChange={onChange}
        {...props}
      />
      <InputFeedback error={error} message={message} />
    </div>
  );
};

export default Input;
