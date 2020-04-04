import React from 'react'
import { StatusBar } from 'react-native'
import { createAppContainer, createSwitchNavigator, SafeAreaView } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { BottomNavigation, BottomNavigationTab, Icon, IconRegistry } from '@ui-kitten/components'
import { EvaIconsPack } from '@ui-kitten/eva-icons'

import AllScreen from '../components/AllScreen'
import CountriesScreen from '../components/CountriesScreen'
import { white, black } from '../Lib/Color'

const AllScreens = () => (
  <AllScreen />
)

const CountriesScreens = () => (
  <CountriesScreen />
)

const AllIcon = (style) => (
  <Icon {...style} name='globe-2' />
)

const CountriesIcon = (style) => (
  <Icon {...style} name='flag' />
)

const TabBarComponent = ({ navigation }) => {

  const onSelect = (index) => {
    const selectedTabRoute = navigation.state.routes[index]
    navigation.navigate(selectedTabRoute.routeName)
  }

  return (
    <>
      <StatusBar barStyle='dark-content' backgroundColor={white} />
      <SafeAreaView>
        <IconRegistry icons={EvaIconsPack} />
        <BottomNavigation
          indicatorStyle={{ backgroundColor: white }}
          selectedIndex={navigation.state.index}
          onSelect={onSelect}>
          <BottomNavigationTab title='All' style={{ marginTop: 12 }} titleStyle={{ fontFamily: 'Poppins-Light' }} icon={AllIcon} />
          <BottomNavigationTab title='Countries' titleStyle={{ fontFamily: 'Poppins-Light' }} icon={CountriesIcon} />
        </BottomNavigation>
      </SafeAreaView>
    </>
  )
}

const TabNavigator = createBottomTabNavigator({
  All: AllScreens,
  Countries: CountriesScreens,
}, {
  tabBarComponent: TabBarComponent
})

const RootNavigator = createSwitchNavigator({
  App: TabNavigator,
}, {
    initialRouteName: 'App'
  })

export const AppNavigator = createAppContainer(RootNavigator)
