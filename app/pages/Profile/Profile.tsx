import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Top from './components/Top';
import ProfileNav from './components/ProfileNav';
import BadgesCard from './components/BadgesCard';
import LatestRecommendsCard from './components/LatestRecommendsCard';
import LatestCommentsCard from './components/LatestCommentsCard';
import Footer from 'components/Footer';
import { inject, observer } from 'mobx-react';
import { PublicProfileStore } from 'stores/PublicProfile';
import { CommentsStore } from 'stores/Comments';
/** Pages */
import Comments from './containers/Comments';
import Recommends from './containers/Recommends';
import Upvotes from './containers/Upvotes';
import { ProfileRecommends } from 'stores/ProfileRecommends';

import './styles.scss';

interface Props {
  profile: PublicProfileStore;
  profileRecommends: ProfileRecommends;
  comments: CommentsStore;
  match: {
    params: {
      id: string;
    };
  };
  location: {
    pathname: string;
  };
  history: {
    replace: (route: string) => void;
  };
}

@inject('profile', 'profileRecommends', 'comments')
@observer
class ProfilePage extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    this.props.profile.id = this.props.match.params.id;
    this.props.profile.getProfileDetails();

    this.props.profileRecommends.getRecommends();
    this.props.comments.getLatestComments();
  }

  componentWillUpdate(nextProps: Props) {
    /** If user is not found */
    if (nextProps.profile.error) {
      this.props.history.replace('/not-found');
    }

    console.log(nextProps, this.props);
    // if (nextProps.profile.details instanceof Object) {
    //   console.log('WORKED');
    //   this.props.profileRecommends.getRecommends();
    //   this.props.comments.getLatestComments();
    // }
  }

  componentWillUnmount() {
    this.props.profileRecommends.removeRecommends();
    this.props.comments.clearState();
  }

  render() {
    return (
      <div className="ProfilePage">
        {this.props.profile.loading || this.props.profile.error ? (
          <Top />
        ) : (
          <Top profileDetails={this.props.profile.details} />
        )}
        {this.props.profile.loading || this.props.profile.error ? (
          <ProfileNav comments={0} recommends={0} upvotes={0} profileId={this.props.profile.id} loading />
        ) : (
          <ProfileNav
            comments={this.props.profile.details.commentsCount}
            recommends={this.props.profile.details.recommendsCount}
            upvotes={this.props.profile.details.votesCount}
            profileId={this.props.profile.id}
          />
        )}
        <div className="container" style={{ marginTop: '50px' }}>
          <div className="row">
            <div className="col-lg-3 d-none d-lg-block">
              <BadgesCard />
            </div>
            <div className="col-lg-6">
              <Switch>
                <Route path="/profile/:id/" exact component={Comments} />
                <Route path="/profile/:id/recommends" exact component={Recommends} />
                <Route path="/profile/:id/upvotes" exact component={Upvotes} />
                <Route component={Comments} />
              </Switch>
            </div>
            <div className="col-lg-3">
              {!!this.props.location.pathname.match(/recommends|upvotes/) ? (
                <LatestCommentsCard
                  loading={this.props.comments.latestCommentsLoading}
                  comments={this.props.comments.latestComments}
                  showMoreLink={`/profile/${this.props.profile.id}`}
                />
              ) : (
                <LatestRecommendsCard
                  loading={this.props.profileRecommends.loading}
                  recommends={this.props.profileRecommends.recommends}
                  showMoreLink={`/profile/${this.props.profile.id}/recommends`}
                />
              )}
              <Footer />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfilePage;
