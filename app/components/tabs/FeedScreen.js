import React, { Component } from 'react';
import { ActivityIndicator, Text, FlatList, View, StyleSheet, Modal, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import CommentItem from '../../views/CommentItem'
import Utils from '../../utils/Utils'
import FeedItem from '../../views/FeedItem';
import PostDialogLikeItem from '../../views/PostDialogLikeItem';
import PostDialogCommentsItem from '../../views/PostDialogCommentsItem';
import moment from 'moment';
import GLOBAL from '../../utils/Globals'

const FBSDK = require('react-native-fbsdk');
const {
  ShareDialog,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class FeedScreen extends Component {
  constructor(props) {
    super(props);
    this.responseInfoCallback = this.responseInfoCallback.bind(this)
    getValidatedData = getValidatedData.bind(this)
    this.state = {
      showDialog: false,
      isLoading: true,
      userId: this.props.screenProps.userId,
    }
  }

  static navigationOptions = {
    header : null
  };

  responseInfoCallback(error: ?Object, result: ?Object) {
    if (error) {
      alert('Error fetching data: ' + error.toString());
      this.setState ({
        isLoading: false,
        data: [],
      })
    } else {
      this.setState ({
        isLoading: false,
        data: result.data,
      })
    }
  }

  componentDidMount() {
    const infoRequest = new GraphRequest(
      '/' + this.state.userId + '/posts?fields=id,picture,source,type,story,created_time,icon,from,link,message,likes,comments,full_picture',
      null,
      this.responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
  }

  showDialog(itemSelected, selectedMode) {
    this.setState({
      showDialog:true,
      itemSelected: itemSelected,
      selectedMode: selectedMode,
    });
  }

  closeDialog() {
    this.setState({
      showDialog:false,
      itemSelected: undefined,
      selectedMode: undefined,
    });
  }

  getDialogDataList() {
    if (this.state.itemSelected === undefined) {
      return [];
    }
    if (this.state.selectedMode !== undefined && this.state.selectedMode == GLOBAL.POST_EVENTS.LIKES) {
      return this.state.itemSelected.likes.data;
    } else {
      return this.state.itemSelected.comments.data;
    }
  }

  showShareDialog(itemSelected) {
    let type = itemSelected.type;
    if (type == GLOBAL.POST_TYPE.STATUS) {
      ToastAndroid.show('Sorry, you cannot share statuses', ToastAndroid.SHORT);
    } else {
      let shareLinkContent = {
        contentType: 'link',
        contentUrl: itemSelected.link !== undefined ? itemSelected.link : itemSelected.source,
        contentDescription: itemSelected.message,
      };
        ShareDialog.canShow(shareLinkContent).then(
          function(canShow) {
            if (canShow) {
              return ShareDialog.show(shareLinkContent);
            }
          }
        );
    }
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    if (this.state.data.length == 0) {
      return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'white'}}>
          <Image source={require('../../images/empty.png')} />
          <Text style={{color: 'grey', fontSize: 17, marginTop: 10}}>There are no posts yet...</Text>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <View style={{flex: 1, backgroundColor: '#C2C2C2'}}>
        <FlatList
            style={styles.container}
            data={this.state.data}
            numColumns={1}
            keyExtractor={item => item.id}
            renderItem={({item}) =>
              <FeedItem {...getValidatedData(item)} shareClick={(itemSelected) => this.showShareDialog(itemSelected)} onPress={(itemSelected, selectedMode) => this.showDialog(itemSelected, selectedMode)}/>
            }
          />
        </View>
        <Modal
            transparent={true}
            visible={this.state.showDialog}
            animationType={'slide'}
            onRequestClose={() => this.closeDialog()}>
            <TouchableOpacity
            activeOpacity={1}
            style={{flex:1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(19, 19, 19, 0.6)'}}
            onPress={() => this.closeDialog()}>
              <TouchableOpacity onPress={() => 0} activeOpacity={1} style={{height: 250, backgroundColor:'white', borderRadius: 5}}>
                <FlatList
                  style={styles.container}
                  data={this.getDialogDataList()}
                  numColumns={1}
                  keyExtractor={item => item.id}
                  renderItem={({item}) =>
                    this.state.selectedMode !== undefined && this.state.selectedMode == GLOBAL.POST_EVENTS.LIKES ?
                    <PostDialogLikeItem {...item}/> : <PostDialogCommentsItem {...item} />
                  }
                />
              </TouchableOpacity>
            </TouchableOpacity>
        </Modal>
    </View>
    );
  }
}

function getValidatedData(rowData) {
  let endDate = new Date();
  let startDate = moment(rowData.created_time, 'YYYY-MM-DDTHH:mm:ssZ');
  if (startDate.isValid()) {
    let different = parseInt(endDate.getTime() - startDate.valueOf());
    let secondsInMilli = 1000;
    let minutesInMilli = secondsInMilli * 60;
    let hoursInMilli = minutesInMilli * 60;
    let daysInMilli = hoursInMilli * 24;

    let elapsedDays = Math.floor(different / daysInMilli);
    different = different % daysInMilli;

    let elapsedHours = Math.floor(different / hoursInMilli);
    different = different % hoursInMilli;

    let elapsedMinutes = Math.floor(different / minutesInMilli);
    different = different % minutesInMilli;

    let elapsedSeconds = Math.floor(different / secondsInMilli);

    let result = 0;
    if (elapsedDays > 23) {
      result = getDate(startDate);
    } else if (elapsedDays > 0) {
      result = elapsedDays + " days, " + elapsedHours + " hours, " + elapsedMinutes + " minutes ago";
    } else if (elapsedHours > 0) {
      result = elapsedHours + " hours, " + elapsedMinutes + " minutes, " + elapsedSeconds + " seconds ago";
    } else if (elapsedMinutes > 0) {
      result = elapsedMinutes + " minutes, " + elapsedSeconds + " seconds ago";
    } else {
      result = elapsedSeconds + " seconds ago";
    }

    if (!rowData.updated) {
      rowData.updated = true;
      rowData.created_time = result;
    }
  }
  return rowData;
}

function getDate(date) {
  return date.format('DD MMMM YYYY hh:mm');
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  itemContainer: {
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

export default FeedScreen
