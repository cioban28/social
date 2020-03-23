import React, { Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
/** Mobx */
import { observer, inject } from 'mobx-react';
import { UserStore } from 'stores/User';
import { AuthStore } from 'stores/auth';
/** ReactStrap */
import Collapse from 'reactstrap/lib/Collapse';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import UncontrolledDropdown from 'reactstrap/lib/UncontrolledDropdown';
import DropdownMenu from 'reactstrap/lib/DropdownMenu';
import DropdownToggle from 'reactstrap/lib/DropdownToggle';
import DropdownItem from 'reactstrap/lib/DropdownItem';
/** Antd */
import Input from 'antd/lib/input';
import Button from 'antd/lib/button';
/** Other */
// import * as avatar from 'static/avatar.png';
import Avatar from 'components/Avatar';
import * as VuukleLogo from 'static/vuukle-logo.svg';
import './styles.scss';

interface Props {
  user?: UserStore;
  auth?: AuthStore;
  history?: {
    push: (route: string) => void;
  };
}

interface State {
  isOpen: boolean;
  searchValue: string;
}

@inject('user', 'auth')
@observer
class Header extends Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      /** Determinates if mobile menu is opened or close */
      isOpen: false,
      /** Search input value */
      searchValue: '',
    };
  }

  /** Toggler func for mobile menu show/hide */
  toggle = () => this.setState({ isOpen: !this.state.isOpen });

  /** Handles search form submit */
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.history.push(`/search?value=${this.state.searchValue}`);
  };

  render() {
    return (
      <Navbar color="light" light expand="md">
        <Link className="navbar-brand" to="/">
          <img src={VuukleLogo} alt="Vuukle" width="32px" height="35px" />
        </Link>
        <NavbarToggler onClick={this.toggle} />
        <Collapse isOpen={this.state.isOpen} navbar>
          <Nav navbar>
            <form onSubmit={this.handleSubmit}>
              <div className="searchBox">
                <Input
                  type="text"
                  value={this.state.searchValue}
                  onChange={(e) => this.setState({ searchValue: e.target.value })}
                  placeholder="Find for users, articles, publishers…"
                />
              </div>
            </form>
            <NavItem>
              <NavLink to="/" className="nav-link" activeClassName="active" exact>
                Home
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink to="/explore" className="nav-link" activeClassName="active">
                Explore
              </NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav caret>
                Community
              </DropdownToggle>
              <DropdownMenu right>
                <NavLink className="dropdown-item" to="/community/users-by-points" activeClassName="active">
                  Top users by points
                </NavLink>
                <NavLink className="dropdown-item" to="/community/users-by-comments" activeClassName="active">
                  Top users by comments
                </NavLink>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <div className="searchBox searchBox--md">
            <form onSubmit={this.handleSubmit}>
              <Input
                type="text"
                value={this.state.searchValue}
                onChange={(e) => this.setState({ searchValue: e.target.value })}
                placeholder="Find for users, articles, publishers…"
              />
            </form>
          </div>
          <Nav style={{ marginLeft: 'auto' }} navbar>
            {this.props.user.details &&
              !this.props.user.loading && (
                <UncontrolledDropdown nav inNavbar>
                  <DropdownToggle nav caret>
                    <span>
                      <Avatar name={this.props.user.details.name} src={this.props.user.details.pictureUrl} />
                      <span style={{ marginLeft: '10px' }}>Hello, {this.props.user.details.name}</span>
                    </span>
                  </DropdownToggle>
                  <DropdownMenu right>
                    <NavLink
                      to={`/profile/${this.props.user.details.id}`}
                      className="dropdown-item"
                      activeClassName="active"
                    >
                      My profile
                    </NavLink>
                    <NavLink to="/settings" className="dropdown-item" activeClassName="active">
                      Settings
                    </NavLink>
                    <DropdownItem divider />
                    <a
                      href="#"
                      className="dropdown-item"
                      onClick={(e) => {
                        e.preventDefault();
                        this.props.auth.logout();
                      }}
                    >
                      Logout
                    </a>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
            {!this.props.user.details &&
              !this.props.user.loading && (
                <div className="nav-user-actions">
                  <Link to="/login">Login</Link>
                  <Button
                    onClick={() => this.props.history.push('/sign-up')}
                    type="primary"
                    style={{ marginLeft: '15px' }}
                  >
                    Register
                  </Button>
                </div>
              )}
          </Nav>
        </Collapse>
      </Navbar>
    );
  }
}

export default Header;
