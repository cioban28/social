import React from 'react';
import styled from 'react-emotion';

interface Props {
  children: string | React.ReactElement<any>;
  htmlFor: string;
}

const Span = styled('span')`
  display: inline-block;
  color: #d2322d;
  font-size: 0.9rem;
  font-weight: bold;
  position: relative;
  margin-right: 3px;
`

const Label = ({ children, ...props }: Props) => {
  return (
    <label className="label" {...props}>
      <Span className="required">*</Span>
      {children}
    </label>
  );
};

export default Label;
