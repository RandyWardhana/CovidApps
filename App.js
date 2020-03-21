import React, { Component } from 'react'
import { EvaIconsPack } from '@ui-kitten/eva-icons'
import { IconRegistry, ApplicationProvider } from '@ui-kitten/components'
import { mapping, light } from '@eva-design/eva'

import { AppNavigator } from './src/navigation/AppNavigator'

class App extends Component {

  render() {
    return (
      <>
        <IconRegistry icons={EvaIconsPack} />
        <ApplicationProvider mapping={mapping} theme={light}>
          <AppNavigator />
        </ApplicationProvider>
      </>
    )
  }
}

export default App