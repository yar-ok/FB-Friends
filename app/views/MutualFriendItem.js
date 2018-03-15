import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const MutualFriendItem = (props) => (
  <View style={styles.container}>
    <Image source={{ uri: 'https://graph.facebook.com/' + props.id + '/picture?type=large' }} style={styles.photo} />
    <Text style={styles.text}>
      {props.name}
    </Text>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 60,
    width: 60,
    borderRadius: 30,
  },
});

export default MutualFriendItem
