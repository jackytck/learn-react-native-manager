import React, { Component } from 'react'
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
import LoginForm from './components/LoginForm'

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
        <LoginForm />
      </Provider>
    )
  }
}

export default App
