import React, { Component } from 'react'
import { SafeAreaView, Text, ScrollView, View, StyleSheet, RefreshControl, Platform, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner, Icon } from 'native-base'
import { Card } from '@ui-kitten/components'
import _ from 'lodash'
import DefaultPreference from 'react-native-default-preference'

import { getAllCases, getCountriesCases } from '../redux/actions/covidAction'
import { danger, warning, basic, success, black, blackSecondary, disabled, white, } from '../Lib/Color'

class AllScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: true,
      pinnedCountry: ''
    }
  }

  componentDidMount() {
    this.getPreference()
    this.props.getAllCases()

    this.setState({ refreshing: false })
  }

  getPreference() {
    DefaultPreference.get('pinned').then((res) => {
      this.setState({ pinnedCountry: res })      
    }).catch((err) => {
      throw err
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.pinnedCountry !== prevState.pinnedCountry) {
      if (!_.isEmpty(this.state.pinnedCountry)) this.props.getCountriesCases(this.state.pinnedCountry)
    }
  }

  onRefresh() {
    this.getPreference()
    this.props.getAllCases()
    this.setState({ refreshing: false })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  setDefaultPreference() {
    DefaultPreference.set('pinned', '').then((res) => {
      DefaultPreference.get('pinned').then((res) => {
        this.setState({ pinnedCountry: res })
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      throw err
    })
  }

  renderItem(item, header) {
    let statusHeader = header == 'Cases' ? black : header == 'Deaths' ? danger : success

    return (
      <Card style={{ marginVertical: 8, fontFamily: 'Poppins-Medium' }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <Text style={[styles.textDetail, { marginBottom: -4 }]}>Global</Text>
        <Text style={styles.textTitle}>{header}</Text>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <Text style={[styles.textDetail, { fontFamily: 'Poppins-Medium' }]}>{this.formatNumber(item)}</Text>
      </Card>
    )
  }

  renderItemPinned(item) {
    let statusHeader = item.cases >= 1000 ? danger : item.cases >= 500 ? warning : item.cases <= 100 ? basic : success

    return (
      <Card style={{ marginVertical: 8, fontFamily: 'Poppins-Medium', marginBottom: 48 }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <View style={[styles.row, { alignItems: 'flex-end', justifyContent: 'space-between' }]}>
          <Text style={styles.textTitle}>{item.country}</Text>
          <TouchableOpacity
            onPress={() => this.setDefaultPreference()}
            style={{ alignSelf: 'center' }}>
            <Icon type='AntDesign' name='pushpin' style={{ fontSize: 24, transform: [{ rotate: '90deg' }] }} />
          </TouchableOpacity>
        </View>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={[styles.column, { marginVertical: 8 }]}>
          <Text style={styles.textDetail}>{`Today Cases: ${this.formatNumber(item.todayCases)}`}</Text>
          <Text style={styles.textDetail}>{`Today Deaths: ${this.formatNumber(item.todayDeaths)}`}</Text>
        </View>
        <View style={[styles.column, { marginVertical: 8 }]}>
          <Text style={styles.textDetail}>{`Total Cases: ${this.formatNumber(item.cases)}`}</Text>
          <Text style={styles.textDetail}>{`Total Deaths: ${this.formatNumber(item.deaths)}`}</Text>
          <Text style={styles.textDetail}>{`Positive Cases: ${this.formatNumber(item.active)}`}</Text>
        </View>
        <View style={[styles.column, { marginVertical: 8 }]}>
          <Text style={styles.textDetail}>{`Recovered: ${this.formatNumber(item.recovered)}`}</Text>
          <Text style={styles.textDetail}>{`Critical Condition: ${this.formatNumber(item.critical)}`}</Text>
        </View>
      </Card>
    )
  }

  renderData() {
    const { listAllCases, listCountriesCases, loadingAllCases, loadingCountriesCases } = this.props.covid
    const { refreshing, pinnedCountry } = this.state

    if (!loadingAllCases && listAllCases) {
      return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => this.onRefresh()} refreshing={refreshing} />}>
          <Text style={styles.textHero}>
            Global Coronavirus Pandemic Cases
          </Text>
          {this.renderItem(listAllCases.cases, 'Cases')}
          {this.renderItem(listAllCases.deaths, 'Deaths')}
          {this.renderItem(listAllCases.recovered, 'Recovered')}
          {!loadingCountriesCases && listCountriesCases && pinnedCountry !== '' && (
            <>
              <Text style={[styles.textHero, { marginTop: 8 }]}>
                Pinned Country
              </Text>
              {this.renderItemPinned(listCountriesCases)}
            </>
          )}
        </ScrollView>
      )
    }
    else {
      return (
        <View style={styles.spinner}>
          <Spinner color={black} size={44} />
        </View>
      )
    }
  }

  render() {
    return (
      <>
        <SafeAreaView style={styles.container} showsVerticalScrollIndicator={false}>
          {this.renderData()}
        </SafeAreaView>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: Platform.OS == 'ios' ? 16 : 8,
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusHeader: {
    height: 6,
    marginHorizontal: -32,
    top: -16
  },
  divider: {
    backgroundColor: disabled,
    height: 2,
    marginHorizontal: -32,
    marginVertical: 16
  },
  textTitle: {
    color: black,
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    fontWeight: '800',
  },
  textDetail: {
    color: blackSecondary,
    fontFamily: 'Poppins-Light',
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  textHero: {
    color: black,
    fontFamily: 'Poppins-Bold',
    fontSize: 20,
    paddingVertical: 16,
  }
})

const mapStateToProps = (state) => ({
  covid: state.covid,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCases: bindActionCreators(getAllCases, dispatch),
    getCountriesCases: bindActionCreators(getCountriesCases, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllScreen)