import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Footer from 'components/Footer';
/** Pages */
import ByPoints from './pages/ByPoints';
import ByComments from './pages/ByComments';
import Levels from './pages/Levels';

class CommunityPage extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route path="/community/users-by-points" exact component={ByPoints} />
          <Route path="/community/users-by-comments" exact component={ByComments} />
          <Route path="/community/levels" exact component={Levels} />
          <Route component={() => <h2>Hello from Community page</h2>} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default CommunityPage;
