import React, { Component } from 'react'
import { StatusBar } from 'react-native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components'
import { mapping, light } from '@eva-design/eva'

import AllScreen from './src/components/AllScreen'
import { AppNavigator } from './src/navigation/AppNavigator'
import { white } from './src/Lib/Color';

class App extends Component {

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar barStyle='dark-content' backgroundColor={white} />
        <ApplicationProvider mapping={mapping} theme={light}>
          <AllScreen />
          {/* <AppNavigator /> */}
        </ApplicationProvider>
      </>
    )
  }
}

export default App