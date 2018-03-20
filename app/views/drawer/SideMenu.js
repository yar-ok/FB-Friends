import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './SideMenu.style';
import {NavigationActions} from 'react-navigation';
import {Platform, AsyncStorage, ScrollView, Text, View, TouchableOpacity, Image} from 'react-native';
import GLOBAL from '../../utils/Globals';

import AndroidImagePicker from '../../modules/AndroidImagePicker'

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

class SideMenu extends Component {
  constructor(props){
      super(props);
      this.logout = this.logout.bind(this);
      this.state = {
        userId: undefined,
        userName: undefined,
        email: undefined
      }
    }

  navigateToScreen = (route) => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  }

  componentDidMount() {
    AsyncStorage.multiGet([ GLOBAL.USER_ID, GLOBAL.USER_NAME, GLOBAL.USER_EMAIL ]).then((data) => {
      this.setState({
        userId: data[0][1],
        userName: data[1][1],
        email: data[2][1]
      })
    })
  }

  logout() {
    this.props.navigation.navigate('DrawerClose');
    const { params } = this.props.navigation.state;
    if (params !== undefined && params.makeLogout) {
      this.props.navigation.state.params.makeLogout();
    } else {
      LoginManager.logOut();
      AsyncStorage.setItem(GLOBAL.SOCIAL_NAME.FACEBOOK, 'false');
    }
    const resetAction = NavigationActions.reset({
      index: 0,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: 'SignIn'
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)

  }

  showGallery = () => {
    try {
      this.props.navigation.navigate('DrawerClose');
      AndroidImagePicker.pickImage(
        {},
        (uri) => { console.log(uri) },
        (error) => { console.log(error) }
      )
    } catch(e) {
      () => { console.error('error') }
    }
  }

  galleryMenu = () => {
    if (Platform.OS === 'android') {
      return <TouchableOpacity onPress={this.showGallery} >
               <Text style={styles.navItemStyle}>
                 Gallery
               </Text>
             </TouchableOpacity>

    } else {
      return null
    }
  }

  render () {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerContainer}>
            <View style={styles.imageContainer}>
              <Image source={{ uri: 'https://graph.facebook.com/'
                + this.state.userId + '/picture?type=large' }} style={styles.userImage} />
            </View>
            <Text style={styles.userName}>{this.state.userName}</Text>
            <Text style={styles.userEmail}>{this.state.userEmail}</Text>
          </View>
          <TouchableOpacity onPress={this.navigateToScreen('Friends')} >
            <Text style={styles.navItemStyle}>
              All Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Info')} >
            <Text style={styles.navItemStyle}>
              Info
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={this.navigateToScreen('Redux')} >
            <Text style={styles.navItemStyle}>
              Redux
            </Text>
          </TouchableOpacity>
          { this.galleryMenu() }
        </ScrollView>
        <View style={styles.footerContainer}>
          <TouchableOpacity style={styles.logoutContainer}
              onPress= {() => this.logout()}>
            <Image source={require('../../images/ic_exit_to_app_white_24dp.png')} />
            <Text
            style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

SideMenu.propTypes = {
  navigation: PropTypes.object
};

export default SideMenu;
