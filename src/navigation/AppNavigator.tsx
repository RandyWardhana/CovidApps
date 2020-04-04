import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import SplashScreen from '../components/SplashScreen'
import AllScreen from '../components/AllScreen'

const RootNavigator = createSwitchNavigator({
  App: AllScreen,
  Splash: SplashScreen 
}, {
  initialRouteName: 'Splash'
})

const AppNavigator = createAppContainer(RootNavigator)

export default AppNavigator
