import React, { Component } from 'react';
import { StatusBar, StyleSheet, Text, View, Image, ImageBackground, TouchableOpacity } from 'react-native';

class Info extends Component {
  constructor(props) {
    super(props);
    showDrawer = showDrawer.bind(this);
  }

  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Image source={require('../images/icon_app_small.png')}
                style={{width: 26, height: 26, marginRight: 10, resizeMode: 'contain'}}/>
          <Text style={{fontSize: 18, color: 'white'}}>FB Friends</Text>
        </View>
      ),
      headerTintColor: 'white',
      headerRight: <View/>,
      headerLeft: (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 8}}
            onPress={ () => showDrawer() }>
          <Image source={require('../images/ic_menu_white_24dp.png')} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#012968'
      },
    }
  };

  render() {
    return(
      <ImageBackground source={require('../images/sign_in_screen_bg.png')} style={styles.backgroundContainer}>
        <StatusBar hidden = {false} backgroundColor='#141550'/>
        <Text style={{
          color: 'grey', fontSize: 17, margin: 10, color: 'white', textAlign: 'center'
        }}>FB Friends is the test app.{'\n'}Using it, you can login to app via Facebook,{'\n'}see your friends and posts.{'\n'}It is open source project.</Text>
      </ImageBackground>
    )
  }
}

export default Info

function showDrawer() {
  this.props.navigation.navigate('DrawerOpen');
}

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center'
  },
})
