import * as React from 'react'
import { SafeAreaView, StyleSheet, View, Text, Image } from 'react-native'
import {
  NavigationParams,
  NavigationScreenProp,
  NavigationState,
} from 'react-navigation'

import { black, white } from '../Lib/Color'

interface Props {
  navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}

const timeout = 2000

class SplashScreen extends React.Component<Props> {

  componentDidMount() {
    setTimeout(() => {
      this.props.navigation.navigate('App')
    }, timeout)
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container}>
          <View style={styles.iconContainer}>
            <Image resizeMode={'contain'} source={require('../assets/CoronaIcon.png')} style={styles.icon} />
            <Text style={styles.appTitle}>Covid Apps</Text>
          </View>
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
  },
  iconContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  icon: {
    height: 250,
    marginBottom: 64
  },
  appTitle: {
    color: black,
    fontFamily: 'Poppins-Medium',
    fontSize: 24
  }
})

export default SplashScreen