import React, { Component } from 'react';
import { AsyncStorage, StyleSheet, Text, View, Image, ImageBackground } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

import { StatusBar } from 'react-native'
import GLOBAL from '../utils/Globals'

export default class SplashScreen extends Component {
  static navigationOptions = {
    header : null
  };

  replaceScreen(logged) {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [
        NavigationActions.navigate({
          routeName: logged ? 'Drawer' : 'SignIn', params: { isLogged: logged }
        })
      ]
    })
    this.props.navigation.dispatch(resetAction)
  };

  render() {
    setTimeout (() => {
          try {
            AsyncStorage.getItem(GLOBAL.SOCIAL_NAME.FACEBOOK).then((value) => {
                let result = JSON.parse(value);
                this.replaceScreen(result);
            }).done();
          } catch (error) {
            alert('Error -> ' + error);
          }
        }, 3000);
    return (
        <ImageBackground source={require('../images/sign_in_screen_bg.png')} style={styles.backgroundContainer}>
          <StatusBar hidden = {true}/>
          <View style={styles.logocontainer}>
              <Image source={require('../images/plus_1_buble.png')} style={styles.logo}/>
              <Text style={styles.title}>FB Friends</Text>
            </View>
        </ImageBackground>
    )
  }
}

const styles = StyleSheet.create({
  baseContainer: {
    flex:1,
    backgroundColor: '#FF18195D'
  },

  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
  },

  container: {
      flex: 1,
      width: undefined,
      height: undefined,
      backgroundColor:'transparent',
      justifyContent: 'center',
      alignItems: 'center',
    },
  backgroundImage: {
    flex:1,
    justifyContent: 'center',
    alignSelf: 'stretch',
    width: null,
    padding: 20,
    resizeMode: 'cover',
  },

  logocontainer: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center',
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

  clickButtons: {
    backgroundColor: '#00B9A1',
    alignItems: 'center',
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 8,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
  },

  clickButtonsText: {
    fontSize: 18,
    color: '#FF18195D'
  },

  btnImg: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
});
