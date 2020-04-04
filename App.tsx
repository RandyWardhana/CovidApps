import * as React from 'react'
import { StatusBar } from 'react-native'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components'
import { mapping, light } from '@eva-design/eva'

import AppNavigator from './src/navigation/AppNavigator'
import { white } from './src/Lib/Color';

class App extends React.Component<Object> {

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <StatusBar barStyle='dark-content' backgroundColor={white} />
        <ApplicationProvider mapping={mapping} theme={light}>
          <AppNavigator />
        </ApplicationProvider>
      </>
    )
  }
}

export default App