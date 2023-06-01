import React, { Fragment, Component } from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import projectLogo from '../../assets/images/react.svg';

class Header extends Component {
  render() {
    let { headerShadow } = this.props;

    return (
      <Fragment>
        <div className="header-nav-wrapper header-nav-wrapper-lg" />
        <div
          className={clsx(
            'app-header bg-second header-nav-wrapper header-nav-wrapper-lg w-100 navbar-light',
            { 'app-header--shadow': headerShadow }
          )}>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  headerShadow: state.ThemeOptions.headerShadow
});

export default connect(mapStateToProps)(Header);
