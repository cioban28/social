import React from 'react';
import styled from 'react-emotion';
import { colorLuminance } from 'utils';

const socialColors = {
  google: '#DC4E41',
  facebook: '#3B5998',
  linkedIn: '#0077B5',
  twitter: '#1DA1F2',
};

const socialBtn = styled('button')`
  border-radius: 50%;
  width: ${(props: any) => props.size};
  height: ${(props: any) => props.size};
  /* display: inline-flex;
  align-items: center;
  justify-content: center; */
  text-align: center;
  transition: all 0.2s linear;
  outline: none;
  vertical-align: middle;
  border: 0;
  cursor: pointer;
  padding: 0;
  margin: 0 4px;
  svg {
    fill: #fff;
    display: inline-block;
    vertical-align: middle;
  }
`;

socialBtn.defaultProps = {
  size: '30px',
};

const GoogleBtn = styled(socialBtn)`
  background: ${socialColors.google};
  &:hover {
    background: ${colorLuminance(socialColors.google, 0.2)};
  }
`;

const FacebookBtn = styled(socialBtn)`
  background: ${socialColors.facebook};
  &:hover {
    background: ${colorLuminance(socialColors.facebook, 0.2)};
  }
`;

const TwitterBtn = styled(socialBtn)`
  background: ${socialColors.twitter};
  &:hover {
    background: ${colorLuminance(socialColors.twitter, 0.2)};
  }
`;

const LinkedinBtn = styled(socialBtn)`
  background: ${socialColors.linkedIn};
  &:hover {
    background: ${colorLuminance(socialColors.linkedIn, 0.2)};
  }
`;

export const GoogleButton = (props) => (
  <GoogleBtn {...props}>
    <svg viewBox="0 0 24 24" width="22px" height="22px">
      <use xlinkHref="#google" />
      <g id="google" viewBox="0 0 24 24">
        <path d="M7.635 10.909v2.619h4.335c-.173 1.125-1.31 3.295-4.331 3.295-2.604 0-4.731-2.16-4.731-4.823 0-2.662 2.122-4.822 4.728-4.822 1.485 0 2.479.633 3.045 1.178l2.073-1.994c-1.33-1.245-3.056-1.995-5.115-1.995C3.412 4.365 0 7.785 0 12s3.414 7.635 7.635 7.635c4.41 0 7.332-3.098 7.332-7.461 0-.501-.054-.885-.12-1.265H7.635zm16.365 0h-2.183V8.726h-2.183v2.183h-2.182v2.181h2.184v2.184h2.189V13.09H24" />
      </g>
    </svg>
  </GoogleBtn>
);

export const FacebookButton = ({ ...props }) => (
  <FacebookBtn {...props}>
    <svg viewBox="0 0 24 24" width="22px" height="22px">
      <use xlinkHref="#facebook" />
      <g id="facebook" viewBox="0 0 24 24">
        <path d="M17,2V2H17V6H15C14.31,6 14,6.81 14,7.5V10H14L17,10V14H14V22H10V14H7V10H10V6A4,4 0 0,1 14,2H17Z" />
      </g>
    </svg>
  </FacebookBtn>
);

export const TwitterButton = (props) => (
  <TwitterBtn {...props}>
    <svg viewBox="0 0 24 24" width="18px" height="18px">
      <use xlinkHref="#twitter" />
      <g id="twitter" viewBox="0 0 24 24">
        <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.896-.959-2.173-1.559-3.591-1.559-2.717 0-4.92 2.203-4.92 4.917 0 .39.045.765.127 1.124C7.691 8.094 4.066 6.13 1.64 3.161c-.427.722-.666 1.561-.666 2.475 0 1.71.87 3.213 2.188 4.096-.807-.026-1.566-.248-2.228-.616v.061c0 2.385 1.693 4.374 3.946 4.827-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.417-1.68 1.319-3.809 2.105-6.102 2.105-.39 0-.779-.023-1.17-.067 2.189 1.394 4.768 2.209 7.557 2.209 9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63.961-.689 1.8-1.56 2.46-2.548l-.047-.02z" />
      </g>
    </svg>
  </TwitterBtn>
);

export const LinkedinButton = (props) => (
  <LinkedinBtn {...props}>
    <svg viewBox="0 0 24 24" width="22px" height="22px">
      <use xlinkHref="#linkedin" />
      <g id="linkedin" viewBox="0 0 24 24">
        <path d="M21,21H17V14.25C17,13.19 15.81,12.31 14.75,12.31C13.69,12.31 13,13.19 13,14.25V21H9V9H13V11C13.66,9.93 15.36,9.24 16.5,9.24C19,9.24 21,11.28 21,13.75V21M7,21H3V9H7V21M5,3A2,2 0 0,1 7,5A2,2 0 0,1 5,7A2,2 0 0,1 3,5A2,2 0 0,1 5,3Z" />
      </g>
    </svg>
  </LinkedinBtn>
);
