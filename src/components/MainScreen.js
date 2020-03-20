import React, { Component } from 'react'
import { SafeAreaView, Text, StatusBar, FlatList, View, StyleSheet, Dimensions, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner } from 'native-base'
import _ from 'lodash'

import { getAllCases, getAllCountriesCases } from '../redux/actions/covidAction'

const { height } = Dimensions.get('window')

class MainScreen extends Component {

  componentDidMount() {
    this.props.getAllCountriesCases()
  }

  renderItem(item, index) {

    return (
      <View key={index} style={styles.listItem}>
        <Text style={styles.textTitle}>{item.country}</Text>
        <View style={styles.row}>
          <Text style={styles.textDetail}>{`Cases: ${item.cases} | `}</Text>
          <Text style={styles.textDetail}>{`Today: ${item.todayCases} | `}</Text>
          <Text style={styles.textDetail}>{`Active: ${item.active}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textDetail}>{`Deaths: ${item.deaths} | `}</Text>
          <Text style={styles.textDetail}>{`Today: ${item.todayDeaths}`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textDetail}>{`Recovered: ${item.recovered} | `}</Text>
          <Text style={styles.textDetail}>{`Critical: ${item.critical}`}</Text>
        </View>
      </View>
    )
  }

  renderData() {
    const { listAllCountriesCases, loadingAllCountriesCases } = this.props.covid

    if (loadingAllCountriesCases) {
      return (
        <View style={styles.spinner}>
          <Spinner color='white' size={44} />
        </View>
      )
    }
    else {
      return (
        <>
          <FlatList
            contentContainerStyle={styles.listItemContainer}
            data={listAllCountriesCases}
            renderItem={({ item, index }) => this.renderItem(item, index)} />
        </>
      )
    }
  }

  render() {
    return (
      <>
        <StatusBar barStyle='light-content' backgroundColor='#4a4a4a' />
        <SafeAreaView style={styles.container} showsVerticalScrollIndicator={false}>
          {this.renderData()}
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#4a4a4a',
    flex: 1,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    padding: 16,
  },
  listItem: {
    paddingVertical: 8
  },
  textTitle: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: '500',
  },
  textDetail: {
    color: '#BDBDBD'
  },
  row: {
    flexDirection: 'row'
  }
})

const mapStateToProps = (state) => ({
  covid: state.covid,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCases: bindActionCreators(getAllCases, dispatch),
    getAllCountriesCases: bindActionCreators(getAllCountriesCases, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen)