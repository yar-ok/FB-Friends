import React, { Component } from 'react';
import SideMenu from '../views/drawer/SideMenu';
import {DrawerNavigator} from 'react-navigation';
import Friends from '../components/Friends';
import TabScreen from '../components/BaseTabScreen';
import Info from '../components/Info';
import Redux from '../components/ReduxScreen';

import { StackNavigator } from 'react-navigation';

export default DrawerNavigator({
  Friends: {
    screen: StackNavigator({
      FriendsScreen: { screen: Friends },
      BaseTabScreen: {
        screen: TabScreen,
        navigationOptions: ({navigation}) => ({
          drawerLockMode: 'locked-closed'
        })
      }
    }),
  },
  Info: {
    screen: StackNavigator({
      InfoScreen: { screen: Info },
    })
  },
  Redux: {
    screen: StackNavigator({
      ReduxScreen: { screen: Redux },
    })
  },
}, {
  contentComponent: props => <SideMenu {...props}/>,
  drawerWidth: 300
});
