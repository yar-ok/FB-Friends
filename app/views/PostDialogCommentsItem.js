import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

const PostDialogCommentsItem = (props) => (
  <TouchableOpacity style={styles.container} activeOpacity={1} onPress={() => 0}>
    <Image source={{ uri: 'https://graph.facebook.com/' + props.from.id + '/picture?type=large' }} style={styles.photo} />
    <View style={styles.commentsContainer}>
      <Text style={styles.text}>
        {props.from.name}
      </Text>
      <Text ellipsizeMode='tail' numberOfLines={1} style={styles.comment}>
        {props.message}
      </Text>
    </View>
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
  commentsContainer: {
    flexDirection: 'column',
  },
  comment: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 14,
  }
});

export default PostDialogCommentsItem
