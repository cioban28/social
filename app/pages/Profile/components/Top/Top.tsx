import React from 'react';
import PointsBadge from 'components/PointsBadge';
import Avatar from 'components/Avatar';
import LoadingSkeleton from 'components/LoadingSkeleton';
import { ProfileDetails } from 'stores/PublicProfile';
import './styles.scss';

interface Props {
  profileDetails?: ProfileDetails;
}

class ProfileTop extends React.PureComponent<Props> {
  constructor(props: any) {
    super(props);
  }

  render() {
    /** Loading app state */
    if (!this.props.profileDetails) {
      return (
        <div className="profile-top">
          <div className="container">
            <div className="profile-top-preview">
              <LoadingSkeleton shape="circle" style={{ width: '65px', height: '65px' }} />
              <div>
                <LoadingSkeleton style={{ width: '100px' }} />
                <LoadingSkeleton style={{ width: '50px' }} />
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="profile-top">
        <div className="container">
          <div className="profile-top-preview">
            <Avatar size="65px" name={this.props.profileDetails.name} />
            <div>
              <h3>{this.props.profileDetails.name}</h3>
              <div>
                <PointsBadge points={this.props.profileDetails.points} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileTop;
