import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import App from './App';

/** Polyfills */
import './polyfills';

/** Root styles */
import 'styles/antd.less';
import 'styles/bootstrap.scss';

/** MobX Stores */
import AuthStore from 'stores/Auth';
import UserStore from 'stores/User';
import PublicProfileStore from 'stores/PublicProfile';
import CommentsStore from 'stores/Comments';
import CommunityByComments from 'stores/CommunityByComments';
import CommunityByPoints from 'stores/CommunityByPoints';
import Explore from 'stores/Explore';
import Home from 'stores/Home';
import ProfileRecommends from 'stores/ProfileRecommends';
import SearchStore from 'stores/Search';
import PublisherStore from 'stores/PublisherPageStore';

const stores = {
  auth: AuthStore,
  user: UserStore,
  profile: PublicProfileStore,
  comments: CommentsStore,
  communityByComments: CommunityByComments,
  communityByPoints: CommunityByPoints,
  explore: Explore,
  home: Home,
  profileRecommends: ProfileRecommends,
  search: SearchStore,
  publisher: PublisherStore,
};

// render react DOM
const render = (WrapperComponent) =>
  ReactDOM.render(
    <Provider {...stores}>
      <WrapperComponent />
    </Provider>,
    document.getElementById('app')
  );

if (module.hot) {
  // Hot reloadable React components and translation json files
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./App', () => {
    const NextApp = require('./App').default;
    ReactDOM.unmountComponentAtNode(document.getElementById('app'));
    render(NextApp);
  });
}

render(App);
