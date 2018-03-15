import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PostDialogLikeItem = (props) => (
  <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => 0}>
    <Image source={{ uri: 'https://graph.facebook.com/' + props.id + '/picture?type=large' }} style={styles.photo} />
    <Text style={styles.text}>
      {props.name}
    </Text>
  </TouchableOpacity>
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
    fontWeight: 'bold',
  },
  photo: {
    height: 30,
    width: 30,
    borderRadius: 15,
  },
});

export default PostDialogLikeItem
