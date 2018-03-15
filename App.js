import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Routs from './app/config/routes'

export default class App extends Component {
  render() {
    return (
      <AppNavigator/>
    );
  }
}

export const AppNavigator = StackNavigator(
  Routs, {
    headerMode: 'none'
  }
);
