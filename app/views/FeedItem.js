import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Linking } from 'react-native';
import GLOBAL from '../utils/Globals';

const FeedItem = (props) => (
  <View style={styles.container}>
    <View style={{backgroundColor: 'white', padding: 12}}>
      <View style={styles.topLayout}>
        <Image source={{ uri: 'https://graph.facebook.com/' + props.from.id + '/picture?type=large' }} style={styles.photo} />
        <View style={{justifyContent: 'center'}}>
          <Text style={{fontSize: 18, color: 'black'}}>
            {props.from.name}
          </Text>
          <Text style={{fontSize: 14, color: 'grey'}}>
            {props.created_time}
          </Text>
        </View>
      </View>

      {getContentTitle(props)}
      {getViewByType(props)}
      {getLinkView(props)}
    </View>
    <View style={styles.actions}>
      <TouchableOpacity style={styles.action}
      onPress={() => props.likes !== undefined && props.likes.data.length > 0 ? props.onPress(props, GLOBAL.POST_EVENTS.LIKES) : 0} >
        <Image source={require('../images/like_icon.png')} />
        <Text style={styles.actionName}>{props.likes !== undefined && props.likes.data.length > 0 ? 'Likes (' + (props.likes.data.length) + ')' : 'Likes (0)' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action}
      onPress={() => props.comments !== undefined && props.comments.data.length > 0 ? props.onPress(props, GLOBAL.POST_EVENTS.COMMENTS) : 0} >
        <Image source={require('../images/comment_icon.png')} />
        <Text style={styles.actionName}>{props.comments !== undefined && props.comments.data.length > 0 ? 'Comments (' + (props.comments.data.length) + ')' : 'Comments (0)' }</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.action} onPress={() => props.shareClick(props)}>
        <Image source={require('../images/share_icon.png')} />
        <Text style={styles.actionName}>Share</Text>
      </TouchableOpacity>
    </View>
  </View>
)

function getContentTitle(props) {
  if (props.post_story != null) {
    return <Text style={styles.contentTitle} >{props.post_story}</Text>;
  } else if (props.story != null && props.type != GLOBAL.POST_TYPE.VIDEO) {
    return <Text style={styles.contentTitle} >{props.story}</Text>;
  } else if (props.type == GLOBAL.POST_TYPE.STATUS && props.message != null) {
    return <Text style={styles.status} >{props.message}</Text>;
  } if (props.type == GLOBAL.POST_TYPE.VIDEO && props.message != null) {
    return <Text style={styles.contentTitle} >{props.message}</Text>;
  } else {
    return null;
  }
}

function getLinkView(props) {
  if (props.type == GLOBAL.POST_TYPE.LINK) {
    return <Text style={{color: 'blue', textDecorationLine: 'underline'}}
            onPress={() => Linking.openURL(props.link)}>
              {props.full_picture}
            </Text>
  } else {
    return null;
  }
}

function getViewByType(props) {
  switch (props.type) {
    case GLOBAL.POST_TYPE.IMAGE:
      return <Image style={styles.postRes}  source={{ uri: props.full_picture }}/>;
    case GLOBAL.POST_TYPE.VIDEO:
      return  <TouchableOpacity onPress={() => Linking.openURL(getVideoUrl(props))}>
                <Image style={styles.postRes}  source={{ uri: props.full_picture }}/>
                <Image style={ styles.playBtn } source={require('../images/youtube_play_icon.png')}/>
              </TouchableOpacity>
  }
  return null;
}

function getVideoUrl(props) {
  if (props.full_picture !== undefined) {
    return props.full_picture;
  } else if (props.source !== undefined) {
    return props.source;
  } else if (props.link !== undefined) {
    return props.link;
  }  else {
    return '';
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginLeft: 10,
    marginRight: 10,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topLayout: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    marginRight: 10,
  },
  postRes: {
    height: 250,
    flex: 1,
  },

  contentTitle: {
    marginBottom: 10,
    color: 'black',
  },
  status: {
    fontSize: 21,
    color: 'grey',
  },
  playBtn: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [
      {translateX: -24},
      {translateY: -17},
    ],
  },
  actions: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    height: 35,
    backgroundColor: '#e5e7e9',
  },
  action: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionName: {
    color: '#083b63',
    fontSize: 14,
    marginLeft: 4,
  },
});

export default FeedItem
