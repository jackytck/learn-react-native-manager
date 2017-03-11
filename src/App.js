import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import firebase from 'firebase'
import reducers from './reducers'
import {
  apiKey,
  authDomain,
  databaseURL,
  storageBucket,
  messagingSenderId
} from './creds'

class App extends Component {
  componentWillMount () {
    firebase.initializeApp({
      apiKey,
      authDomain,
      databaseURL,
      storageBucket,
      messagingSenderId
    })
  }

  render () {
    return (
      <Provider store={createStore(reducers)}>
        <View>
          <Text>
            Hello!
          </Text>
        </View>
      </Provider>
    )
  }
}

export default App
