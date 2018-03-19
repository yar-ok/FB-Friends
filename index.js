import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import AppReducer from './app/reducers/ListReducer';

import App from './App';

export default class MyApp extends Component {
    store = createStore(AppReducer);

    render() {
        return (
            <Provider store={this.store}>
                <App />
            </Provider>
        )
    }
}

AppRegistry.registerComponent('ReactFriendthem', () => MyApp);
