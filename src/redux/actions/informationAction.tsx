'use strict'

import NetInfo from '@react-native-community/netinfo'
import { IS_CONNECTED } from '../constants'

export const setConnection = () => {
  return (dispatch: any) => {
    NetInfo.fetch().then(res => {      
      if (res.isConnected) {
        dispatch(getConnection(true))
      }
      else {
        dispatch(getConnection(false))
      }
    })
  }
}

function getConnection(status: Boolean) {
  return {
    type: IS_CONNECTED,
    status
  }
}