import React, { Component } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'

import { connect } from 'react-redux'
import { actionCreators } from '../actions/listActions';

import List from './List';
import Input from './Input';

const mapStateToProps = (state) => ({
  todos: state.todos,
});

class ReduxScreen extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params = {} } = navigation.state;
    return {
      headerTitle: (
        <View style={{alignSelf: 'center', flexDirection: 'row'}}>
          <Image source={require('../images/icon_app_small.png')}
                style={{width: 26, height: 26, marginRight: 10, resizeMode: 'contain'}}/>
          <Text style={{fontSize: 18, color: 'white'}}>FB Friends</Text>
        </View>
      ),
      headerTintColor: 'white',
      headerRight: <View/>,
      headerLeft: (
        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', paddingLeft: 8}}
            onPress={ () => showDrawer() }>
          <Image source={require('../images/ic_menu_white_24dp.png')} />
        </TouchableOpacity>
      ),
      headerStyle: {
        backgroundColor: '#012968'
      },
    }
  };

  showDrawer = () => {
    this.props.navigation.navigate('DrawerOpen');
  }

  onAddTodo = (text) => {
      const {dispatch} = this.props

      dispatch(actionCreators.add(text))
    }

    onRemoveTodo = (index) => {
      const {dispatch} = this.props

      dispatch(actionCreators.remove(index))
    }

  render() {
    const {todos} = this.props

    return (
      <View>
        <Input
          placeholder={'Type a todo, then hit enter!'}
          onSubmitEditing={this.onAddTodo}
        />
        <List
          list={todos}
          onPressItem={this.onRemoveTodo}
        />
      </View>
    )
  }
}

export default connect(mapStateToProps)(ReduxScreen)

const styles = StyleSheet.create({
  backgroundContainer: {
      flex: 1,
      width: null,
      height: null,
      alignItems: 'center',
      justifyContent: 'center'
  },
})
