import React, { Component } from 'react';
import { Alert, Text, View, TouchableOpacity, StyleSheet } from 'react-native';

const Utils = {
  showAlert(info) {
    Alert.alert(
    'Alert Title',
    info,
    [
      {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      {text: 'OK', onPress: () => console.log('OK Pressed')},
    ],
    { cancelable: true }
    )
  }
}

export default Utils
