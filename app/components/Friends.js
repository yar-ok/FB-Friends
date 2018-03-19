import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, FlatList, Text, View, Image, ImageBackground, TouchableOpacity, Dimensions } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';
import { StatusBar } from 'react-native'

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

const { width, height } = Dimensions.get('window');
const SCREEN_WIDTH = width;
const PRODUCT_ITEM_MARGIN = 8;
const NUM_COLUMNS = 2;

class Friends extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
    }
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

  responseInfoCallback = (error: ?Object, result: ?Object) => {
    if (error) {
      alert('Error fetching data: ' + error.toString());
      this.setState ({
        isLoading: false,
        data: [],
      })
    } else {
      this.setState ({
        isLoading: false,
        data: result.friends.data,
      })
    }
  }

  componentDidMount() {
    const infoRequest = new GraphRequest(
      '/me',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
            'fields': {
                'string' : 'email,name,picture,friends'
            }
        }
      },
      this.responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.data.length == 0) {
      return (
        <ImageBackground source={require('../images/sign_in_screen_bg.png')} style={{flex: 1, height: null, width: null, alignItems: 'center', justifyContent: 'center'}}>
            <Image source={require('../images/ic_people_white_48dp.png')} />
            <Text style={{
              color: 'grey', fontSize: 17, margin: 10, color: 'white', textAlign: 'center'
            }}>To see your FB friends,{'\n'}they need to install and login to app via Facebook</Text>
        </ImageBackground>
      )
    }

    showDrawer = () => {
      this.props.navigation.navigate('DrawerOpen');
    }

    const { navigate } = this.props.navigation;
    return (
      <ImageBackground source={require('../images/sign_in_screen_bg.png')} style={styles.backgroundContainer}>
        <StatusBar hidden = {false} backgroundColor='#141550'/>
        <FlatList
          style={styles.container}
          data={this.state.data}
          numColumns={NUM_COLUMNS}
          keyExtractor={item => item.id}
          renderItem={({item}) =>
            <TouchableOpacity onPress={() => navigate('BaseTabScreen', {userId: item.id})}>
              <Image source={{ uri: 'https://graph.facebook.com/' + item.id + '/picture?type=large' }} style={styles.photo}/>
            </TouchableOpacity>
          }
        />
      </ImageBackground>
    )
  }
}

const itemWidth = (SCREEN_WIDTH - NUM_COLUMNS * 2 * PRODUCT_ITEM_MARGIN) / NUM_COLUMNS;

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
  },
  container: {
    flex: 1,
  },
  photo: {
    height: itemWidth,
    width: itemWidth,
    margin: PRODUCT_ITEM_MARGIN,
    borderRadius: 12,
  },
})

export default Friends
