import React from 'react';
import { inject, observer } from 'mobx-react';
import { UserStore } from 'stores/User';
import { Route, Switch } from 'react-router-dom';
import AccountSettings from './components/AccountSettings';
import PasswordSection from './components/PasswordSection';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Footer from 'components/Footer';
import Spin from 'antd/lib/spin';

interface Props {
  location: any;
  history: any;
  user: UserStore;
}

interface State {
  isMobile: boolean;
}

@inject('user')
@observer
class SettingsPage extends React.Component<Props, State> {
  resizeHandler: () => void;

  constructor(props: any) {
    super(props);
    this.state = {
      isMobile: false,
    };

    this.resizeHandler = () => {
      if (this.state.isMobile && window.innerWidth > 767) {
        return this.setState({ isMobile: false });
      }
      if (!this.state.isMobile && window.innerWidth < 768) {
        return this.setState({ isMobile: true });
      }
    };
  }

  componentDidMount() {
    if (window.innerWidth > 767) {
      this.props.history.replace('/settings/account');
    } else {
      this.setState({ isMobile: true });
    }

    window.addEventListener('resize', this.resizeHandler);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeHandler);
  }

  componentWillUpdate(nextProps: Props) {
    if (!nextProps.user.details && !nextProps.user.loading) {
      this.props.history.replace('/login');
    }
  }

  render() {
    if (this.props.user.loading) {
      return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
          <Spin size="large" />
        </div>
      );
    }

    if (this.state.isMobile) {
      const isMainPage = this.props.location.pathname === '/settings';
      /** Mobile Layout */
      if (isMainPage) {
        return (
          <div style={{ marginTop: '50px', padding: '10px' }}>
            <SideNav userDetails={this.props.user.details} />
            <Footer />
          </div>
        );
      }
      return (
        <div>
          <TopNav routeName={this.props.location.pathname.match('account') ? 'Account' : 'Change Password'} />
          <div style={{ background: '#fff', padding: '10px' }}>
            <Switch>
              <Route exact path="/settings/account" component={AccountSettings} />
              <Route exact path="/settings/password" component={PasswordSection} />
              <Route component={AccountSettings} />
            </Switch>
          </div>
        </div>
      );
    }

    /** Desktop Layout */
    return (
      <div className="container" style={{ marginTop: '50px' }}>
        <div className="row">
          <div className="col-xs-12 col-md-5 col-lg-3">
            <SideNav userDetails={this.props.user.details} />
            <Footer />
          </div>
          <div className="col-xs-12 col-md-7 col-lg-6">
            <div className="card">
              <div className="card-header">
                {this.props.location.pathname.match('account') ? 'Account' : 'Change Password'}
              </div>
              <div className="card-body">
                <Switch>
                  <Route exact path="/settings/account" component={AccountSettings} />
                  <Route exact path="/settings/password" component={PasswordSection} />
                  <Route component={AccountSettings} />
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default SettingsPage;
