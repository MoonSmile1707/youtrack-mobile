/* @flow */
import {View, ScrollView, Text, TouchableWithoutFeedback, TouchableOpacity, Image, Linking, Dimensions} from 'react-native';
import React, {Component} from 'react';
import styles from './menu.styles';
import {VERSION_STRING} from '../usage/usage';
import getTopPadding from '../header/header__top-padding';
import Drawer from 'react-native-drawer';
import Router from '../router/router';
import Auth from '../auth/auth';
import clicksToShowCounter from '../debug-view/clicks-to-show-counter';
import {next} from '../icon/icon';
import {connect} from 'react-redux';
import {
  openMenu,
  closeMenu,
  openFeaturesView,
} from '../../actions/app-actions';

import type {AgileUserProfile} from '../../flow/Agile';
import Feature from '../feature/feature';
import ConnectedAccounts from './menu__connected-accounts';

const CURRENT_YEAR = (new Date()).getFullYear();
const MENU_WIDTH = 280;

function openPrivacyPolicy() {
  Linking.openURL('https://www.jetbrains.com/company/privacy.html');
}


type Props = {
  children?: React$Element<any>,
  show: boolean,
  auth: Auth,
  issueQuery: ?string,
  agileProfile: AgileUserProfile,
  onOpen: () => any,
  onClose: () => any,
  openFeaturesView: () => any
};

type DefaultProps = {
  onOpen: () => any,
  onClose: () => any
};

export class Menu extends Component<Props, void> {
  static defaultProps: DefaultProps = {
    onOpen: () => {},
    onClose: () => {}
  };

  _openIssueList = () => {
    this.props.onClose();
    Router.IssueList();
  };

  _openAgileBoard = () => {
    this.props.onClose();
    Router.AgileBoard();
  };

  _openInbox = () => {
    this.props.onClose();
    Router.Inbox();
  };

  _getSelectedAgileBoard = () => {
    const {agileProfile} = this.props;
    if (!agileProfile) {
      return '';
    }
    const lastSprint = agileProfile.visitedSprints
      .filter(s => s.agile.id === agileProfile.defaultAgile.id)[0];

    if (!lastSprint) {
      return '';
    }
    return `${agileProfile.defaultAgile.name}, ${lastSprint.name}`;
  };

  _renderMenu() {
    const {height} = Dimensions.get('window');
    const {auth, issueQuery, openFeaturesView} = this.props;
    if (!auth) { //TODO: menu renders right after logOut by some reason.
      return null;
    }

    const MenuItem = ({label, description = '', onPress = () => {}}) => (
      <TouchableOpacity activeOpacity={0.4} style={styles.menuItemButton} onPress={onPress}>
        <View style={styles.menuItemTopLine}>
          <Text style={styles.menuItemText}>{label}</Text>
          <Image style={styles.menuItemIcon} source={next}/>
        </View>
        <Text style={styles.menuItemSubtext}>{description}</Text>
      </TouchableOpacity>
    );

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={[styles.menuContainer, {paddingTop: getTopPadding(), minHeight: height}]}>
          <View style={styles.accounts}><ConnectedAccounts/></View>

          <View style={styles.menuItems}>
            <MenuItem
              label={'Issues'}
              description={issueQuery || 'No query'}
              onPress={this._openIssueList}
            />

            <MenuItem
              label={'Agile Boards'}
              description={this._getSelectedAgileBoard()}
              onPress={this._openAgileBoard}
            />

            <Feature version={'2018.3'}>
              <MenuItem
                label={'Notifications'}
                description={''}
                onPress={this._openInbox}
              />
            </Feature>
          </View>

          <View style={styles.flexSpacer}/>

          <View style={styles.menuFooter}>
            <TouchableWithoutFeedback onPress={() => clicksToShowCounter(openFeaturesView, 'open features list')}>
              <Text style={styles.footerText}>YouTrack Mobile {VERSION_STRING}</Text>
            </TouchableWithoutFeedback>

            <View style={styles.spacer}/>
            <Text style={styles.footerText}>© 2000—{CURRENT_YEAR} JetBrains</Text>
            <Text style={styles.footerText}>All rights reserved</Text>

            <View style={styles.spacer}/>
            <TouchableOpacity style={styles.buttonLink} onPress={openPrivacyPolicy}>
              <Text style={styles.linkText}>Privacy Policy</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }

  render() {
    const {children, show, onOpen, onClose} = this.props;

    return (
      <Drawer
        type="static"
        open={show}
        content={this._renderMenu()}
        tapToClose={true}
        onOpen={onOpen}
        onClose={onClose}
        openDrawerOffset={viewport => viewport.width - MENU_WIDTH}
        captureGestures={true}
        panOpenMask={12}
      >
        {children}
      </Drawer>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    show: state.app.showMenu,
    auth: state.app.auth,
    issueQuery: state.issueList.query,
    agileProfile: state.agile.profile,
    ...ownProps
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOpen: () => dispatch(openMenu()),
    onClose: () => dispatch(closeMenu()),
    openFeaturesView: () => dispatch(openFeaturesView()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

