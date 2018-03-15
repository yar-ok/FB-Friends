import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const CommentItem = (props) => (
  <TouchableOpacity style={styles.container} >
    <Text style={styles.email}>
      {props.email}
    </Text>
    <Text style={styles.name}>
      {props.name}
    </Text>
  </TouchableOpacity>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'column',
  },
  name: {
    marginLeft: 12,
    fontSize: 16,
  },
  email: {
    marginLeft: 12,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default CommentItem
