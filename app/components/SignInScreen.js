import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, Button, ImageBackground } from 'react-native';
import LoginButtonApp from '../views/LoginButton';
import GLOBAL from '../utils/Globals';
import { StatusBar } from 'react-native';

const FBSDK = require('react-native-fbsdk');
const {
  LoginButton, LoginManager, AccessToken,
} = FBSDK;

class SignInScreen extends Component {
  constructor(props){
      super(props);
      this.changeFBstate = this.changeFBstate.bind(this);
      this.setSocialLogin = this.setSocialLogin.bind(this);
      this.nextBtn = this.nextBtn.bind(this);
      this.logout = this.logout.bind(this);
      this.initUser = this.initUser.bind(this);
      this.goFriendsScreen = this.goFriendsScreen.bind(this);
      fetchSocialLogin = fetchSocialLogin.bind(this);
      this.state = {
        fbLogin: false,
      };
  }
  static navigationOptions = {
    header : null
  };

  componentWillUnmount() {
    this._mounted = false;
  }

  componentWillMount() {
    fetchSocialLogin();
  }

  componentDidMount() {
    this._mounted = true;
  }

  setSocialLogin(isLogged) {
    AsyncStorage.setItem(GLOBAL.SOCIAL_NAME.FACEBOOK, JSON.stringify(isLogged));
  }

  updateLoginState(value) {
    if (this._mounted) {
      this.setState({fbLogin: value});
    }
  }

  changeFBstate (isLogin) {
    if (isLogin) {
      AccessToken.getCurrentAccessToken()
          .then((data) => {
              this.initUser(data.accessToken.toString());
          })
    } else {
      //logout
      this.logout();
    }
  }

  nextBtn() {
    if (this.state.fbLogin) {
      return  <LoginButtonApp style={styles.clickButtons}
                  text='Next >'
                  onPress={() => this.goFriendsScreen()} />
    } else {
      return null;
    }
  }

  goFriendsScreen() {
    this.props.navigation.navigate('Drawer', {makeLogout: this.logout});
  }

  logout() {
    LoginManager.logOut();
    this.setState({fbLogin : false});
    this.setSocialLogin(false);
  }

  initUser(token) {
    fetch('https://graph.facebook.com/v2.5/me?fields=id,email,name&access_token=' + token)
    .then((response) => response.json())
    .then((json) => {
      this.setState({fbLogin : true});
      this.setSocialLogin(true);
      AsyncStorage.multiSet(
        [
          [GLOBAL.USER_TOKEN, token],
          [GLOBAL.USER_ID, json.id],
          [GLOBAL.USER_NAME, json.name],
          [GLOBAL.USER_EMAIL, json.email === undefined ? '' : json.email],
        ], function(error) {
            if(error) {
              alert("error!");
            }
        }
      );
    })
    .catch(() => {
      alert('ERROR GETTING DATA FROM FACEBOOK')
    })
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../images/sign_in_screen_bg.png')} style={styles.backgroundContainer}>
        <StatusBar hidden = {true}/>
        <View style={styles.logocontainer}>
            <Image source={require('../images/plus_1_buble.png')} style={styles.logo}/>
            <View style={styles.titleContainer}>
              <Text style={{fontSize:23, color: 'white', fontWeight: 'bold', marginTop: 20}}>Sign in</Text>
              <Text style={{fontSize:15, color: 'white', fontWeight: 'bold', marginTop: 10, marginBottom: 10}}>with your Facebook account below</Text>
            </View>
            <View style={{backgroundColor: 'white', padding: 4, marginTop: 10, marginBottom: 10, borderRadius: 4}}>
              <LoginButton
                publishPermissions={['publish_actions']}
                onLoginFinished={
                  (error, result) => {
                    if (error) {
                      alert("Login failed with error: " + result.error);
                    } else if (!result.isCancelled) {
                      this.changeFBstate(true);
                    }
                  }
                }
                onLogoutFinished={() => this.changeFBstate(false)}/>
            </View>

          { this.nextBtn() }

        </View>
      </ImageBackground>
    )
  }
}

function fetchSocialLogin() {
  try {
    AsyncStorage.getItem(GLOBAL.SOCIAL_NAME.FACEBOOK).then((value) => {
      let result = JSON.parse(value);
            this.updateLoginState(result);
        }).done();
  } catch (error) {
    alert('Error -> ' + error);
  }
}

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
  },

  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowLayout: {
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 8,
    margin: 20,
    justifyContent: 'center',
    borderRadius: 10,
    alignSelf: 'stretch',
    alignItems: 'center',
},

  line: {
    alignSelf: 'stretch',
    backgroundColor: '#ABABAB',
    height: 1,
  },

  rowName: {
    fontSize: 18,
    color: 'black',
    marginLeft: 8,
  },

  switchStyle: {
    marginRight: 0,
    marginLeft: 'auto',
  },

  clickButtons: {
    width: 200,
    backgroundColor: '#00B9A1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
    marginTop: 20,
    marginLeft: 60,
    marginRight: 60,
    borderRadius: 10,
  },

  nextBtn: {
    fontSize: 18,
    color: 'white',
  },
  logocontainer: {
    marginTop: 150,
    alignItems: 'center',
  },
  logo: {
    height: 120,
    width: 120,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 45,
    fontWeight: 'bold',
    color: '#ffffff'
  },

  descriptionText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#ffffff'
  },

});

export default SignInScreen
