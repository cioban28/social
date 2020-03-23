import React from 'react';
import './styles.scss';

interface Props {
  description: string | JSX.Element;
  title: string;
}

const Header = ({ description, title }: Props) => {
  return (
    <div className="CommunityHeader">
      <div className="community-bg" />
      <div className="container">
        <h2>{title}</h2>
        {typeof description === 'string' ? <p>{description}</p> : description}
      </div>
    </div>
  );
};

export default Header;
