import React, { PureComponent } from 'react'
import { SafeAreaView, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'

import { blackSecondary, success, white } from '../Lib/Color'

const NoInternet = (props) => {
  const { onPress } = props

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../assets/noInternetConnection.png')} />
      <Text style={styles.headerText}>Lost Connection?</Text>
      <Text style={styles.descriptionText}>Looks like we couldn’t find what you’re looking for please check your connection, and then try again</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.buttonText}>Try Again</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
  
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: white,
    flex: 1,
    justifyContent: 'center',
  },
  headerText: {
    color: blackSecondary,
    fontFamily: 'Poppins-Medium',
    fontSize: 24,
    marginTop: 48
  },
  descriptionText: {
    color: blackSecondary,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    marginHorizontal: 16,
    marginTop: 16,
    textAlign: 'center'
  },
  buttonText: {
    color: '#15A97B',
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    marginTop: 24,
    textAlign: 'center'
  }
})

export default NoInternet