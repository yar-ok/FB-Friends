import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, View, StyleSheet } from 'react-native';
import MutualFriendItem from '../../views/MutualFriendItem';

const FBSDK = require('react-native-fbsdk');
const {
  GraphRequest,
  GraphRequestManager,
} = FBSDK;

class MutualScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userId: this.props.screenProps.userId,
    }
  }

  static navigationOptions = {
    header : null
  };

  responseInfoCallback = (error: ?Object, result: ?Object) => {
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
      '/' + this.state.userId + '/friends',
      {
        httpMethod: 'GET',
        version: 'v2.5',
        parameters: {
            'fields': {
                'string' : 'email,name,picture,friends'
            }
        }
      },
      this.responseInfoCallback,
    );
    new GraphRequestManager().addRequest(infoRequest).start();
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
          <Text style={{color: 'grey', fontSize: 17, marginTop: 10}}>There are no mutual friends yet...</Text>
        </View>
      )
    }

    return (
      <View style={{flex: 1}}>
        <FlatList
          style={styles.container}
          data={this.state.data}
          numColumns={1}
          keyExtractor={item => item.id}
          renderItem={({item}) => <MutualFriendItem {...item}/>}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default MutualScreen
