import React from 'react';
import { NavLink } from 'react-router-dom';
import Avatar from 'components/Avatar';
import './styles.scss';

interface Props {
  userDetails: {
    name: string;
    pictureUrl: string;
  };
}

const SideNav = ({ userDetails }: Props) => {
  return (
    <div className="card settings-sidenav">
      <div className="card-body">
        <div className="card-profile-preview">
          <Avatar src={userDetails.pictureUrl} name={userDetails.name} size="36px" />
          <span>{userDetails.name}</span>
        </div>
      </div>
      <div className="nav nav-pills" role="tablist" aria-orientation="vertical" style={{ flexDirection: 'column' }}>
        <NavLink to="/settings/account" className="nav-link" role="tab" activeClassName="active">
          Account
        </NavLink>
        <NavLink to="/settings/password" className="nav-link" role="tab" activeClassName="active">
          Password
        </NavLink>
      </div>
    </div>
  );
};

export default SideNav;
