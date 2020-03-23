import React from 'react';
import LoadingSkeleton from 'components/LoadingSkeleton';
import { NavLink } from 'react-router-dom';
import './styles.scss';

const navs = [
  {
    label: 'Comments',
    key: 'comments',
    route: '/',
  },
  {
    label: 'Recommends',
    key: 'recommends',
    route: '/recommends',
  },
  /* {
    label: 'Upvotes',
    key: 'upvotes',
    route: '/upvotes',
  }, */
];

interface Props {
  comments: number;
  recommends: number;
  upvotes: number;
  loading?: boolean;
  profileId: string;
}

const LoadingState = () => (
  <ul className="ProfileNav-list">
    {navs.map((nav) => (
      <li className="ProfileNav-item" style={{ textAlign: 'center', marginRight: '5px' }} key={nav.key}>
        <LoadingSkeleton style={{ width: '75px', height: '14px', marginTop: '5px' }} />
        <LoadingSkeleton style={{ width: '50px', height: '30px' }} />
      </li>
    ))}
  </ul>
);

const ProfileNav = ({ loading = false, profileId, ...rest }: Props) => {
  return (
    <div className="ProfileNav">
      <div className="container">
        <div className="row justify-content-md-center">
          <div className="col-lg-6">
            {loading ? (
              <LoadingState />
            ) : (
              <ul className="ProfileNav-list">
                {navs.map((nav) => (
                  <li className="ProfileNav-item" key={nav.key}>
                    <NavLink to={`/profile/${profileId}${nav.route}`} activeClassName="active" exact>
                      <span className="ProfileNav-label">{nav.label}</span>
                      <span className="ProfileNav-value">{rest[nav.key]}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
