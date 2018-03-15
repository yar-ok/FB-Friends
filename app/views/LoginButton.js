import React, { Component } from 'react';
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

class LoginButton extends Component {
  render () {
    const {text, style, source, onPress} = this.props;
    if (source==null) {
      return (
        <TouchableOpacity style={style} onPress={onPress}>
          <Text style={styles.title}>{text}</Text>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity style={style} onPress={onPress}>
        <Image source={source} style={styles.btnImg}/>
        <Text style={styles.title}>{text}</Text>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    backgroundColor: '#00B9A1',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: 8,
  },

  title: {
    fontSize: 18,
    color: 'white',
  },

  btnImg: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
})

export default LoginButton
