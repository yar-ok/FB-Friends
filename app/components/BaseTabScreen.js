import React, { Component } from 'react';
import { TabNavigator } from 'react-navigation';
import { Platform, Text, Image, View } from 'react-native';

import MutualFriendsScreen from './tabs/MutualFriendsScreen';
import FeedScreen from './tabs/FeedScreen';

const GLOBAL = require('../utils/Globals');

class BaseTabScreen extends Component {
  constructor(props){
      super(props);
      const { params } = this.props.navigation.state;
      this.state = {
        userId: params.userId,
        currentColor: Platform.OS === 'ios' ? '#ABABAB' : '#012968',
      };
  }

  static navigationOptions = {
    headerTitle: (
      <View style={{alignSelf: 'center', flexDirection: 'row'}}>
        <Image source={require('../images/icon_app_small.png')}
              style={{width: 26, height: 26, marginRight: 10, resizeMode: 'contain'}}/>
        <Text style={{fontSize: 18, color: 'white'}}>FB Friends</Text>
      </View>
    ),
    headerTintColor: 'white',
    headerRight: <View/>,
    headerStyle: {
      backgroundColor: '#012968'
    },
  };

render() {
    return (
      <TabScreen screenProps={{userId: this.state.userId}}/>
    )
  }
}

function getColor() {
    return Platform.OS === 'ios' ? '#ABABAB' : '#4967BC';
}

function getSelectedTabColor() {
    return '#263A79';
}

const TabScreen = TabNavigator ({
  Mutual: { screen: MutualFriendsScreen },
  Feed: { screen: FeedScreen },
}, {
  tabBarOptions: {
    style: {
            backgroundColor: getColor(),
    },
    indicatorStyle: {
            backgroundColor: 'white',
    },
    activeTintColor: 'white',
    inactiveTintColor: getSelectedTabColor(),
    activeBackgroundColor: getColor(),
    inactiveBackgroundColor: getColor(),
    labelStyle: {
      fontSize: 16,
      fontWeight: '600'
    }
  }
});

export default BaseTabScreen
