import React from 'react'
import { StyleSheet, View } from 'react-native'
import Index from './src/navigation'
import { Provider } from 'react-redux'
import store from './src/api/store/store'

const App = () => {
  return (
    <Provider store={store}>
     <Index/>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})