import React from 'react';
import { Link } from 'react-router-dom';
import './styles.scss';

interface Props {
  routeName: string;
}

const TopNav = ({ routeName = 'Settings' }: Props) => (
  <div className="settings-topnav">
    <Link to="/settings">Back</Link>
    <h3>{routeName}</h3>
  </div>
);

export default TopNav;
