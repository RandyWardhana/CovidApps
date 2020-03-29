import React, { Component } from 'react'
import { SafeAreaView, Text, FlatList, View, StyleSheet, RefreshControl, TextInput, TouchableOpacity, ToastAndroid } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner, Item, Icon } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { Card } from '@ui-kitten/components'
import _ from 'lodash'
import DefaultPreference from 'react-native-default-preference'

import { getAllCases, getAllCountriesCases } from '../redux/actions/covidAction'
import { danger, warning, basic, success, black, blackSecondary, disabled, white } from '../Lib/Color';

class CountriesScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredListItem: null,
      refreshing: true,
      searchText: null,
      alert: true,
      pinnedCountry: []
    }
  }

  componentDidMount() {
    this.getPreference()
    this.props.getAllCountriesCases()
    this.setState({ refreshing: false, alert: true })
  }

  getPreference() {
    DefaultPreference.get('pinned').then((res) => {

      this.setState({ pinnedCountry: JSON.parse(res) })

    }).catch((err) => {
      throw err
    })
  }

  setDefaultPreference = (country) => {
    let { pinnedCountry } = this.state

    if (!pinnedCountry) {
      let pin = [country]
      this.setState({ pinnedCountry: pin })

      DefaultPreference.set('pinned', JSON.stringify(pin)).then((res) => {
        ToastAndroid.show(`${country} added to pinned`, ToastAndroid.SHORT)
      }).catch((err) => {
        throw err
      })
    } else {
      pinnedCountry.push(country)
  
      DefaultPreference.set('pinned', JSON.stringify(pinnedCountry)).then((res) => {
        ToastAndroid.show(`${country} added to pinned`, ToastAndroid.SHORT)
      }).catch((err) => {
        throw err
      })

    }
  }

  onRefresh() {
    this.getPreference()
    this.props.getAllCountriesCases()
    this.setState({ refreshing: false })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  renderItem(item, index) {
    let statusHeader = item.cases >= 1000 ? danger : item.cases >= 500 ? warning : item.cases <= 100 ? basic : success
    const pinned = this.state.pinnedCountry && this.state.pinnedCountry.includes(item.country) ? 'pushpin' : 'pushpino'
    const setPreference = !_.isEmpty(this.state.pinnedCountry) ? '' : item.country
    return (
      <Card key={index} style={{ marginVertical: 8, fontFamily: 'Poppins-Medium' }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <View style={[styles.row, { alignItems: 'flex-end', justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={[styles.textTitle, { fontSize: 16 }]}>{`# ${index + 1}`}</Text>
            <Text style={styles.textTitle}>{item.country}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.setDefaultPreference(item.country)}
            style={{ alignSelf: 'center' }}>
            <Icon type='AntDesign' name={pinned} style={{ fontSize: 24, transform: [{ rotate: '90deg' }] }} />
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

  onSearchTextChange = (searchText) => {
    const { listAllCountriesCases } = this.props.covid

    let filtered = _.filter(listAllCountriesCases, (item) => {
      return item.country.toLowerCase().includes(searchText.toLowerCase())
    })

    if (_.isEmpty(searchText)) {
      filtered = null
    }

    this.setState({ searchText, filteredListItem: filtered })
  }

  renderData() {
    const { listAllCountriesCases, loadingAllCountriesCases } = this.props.covid
    const { refreshing, searchText, filteredListItem, alert } = this.state

    if (!loadingAllCountriesCases && listAllCountriesCases) {
      return (
        <>
          <Item style={styles.searchContainer}>
            <Feather name='search' size={20} color={'#bdbdbd'} />
            <TextInput
              style={styles.textInput}
              placeholder={'Search Country'}
              placeholderTextColor={'#bdbdbd'}
              value={searchText}
              onChangeText={(text) => this.onSearchTextChange(text)} />
          </Item>
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={() => this.onRefresh()}
                refreshing={refreshing}
              />}
            contentContainerStyle={styles.listItemContainer}
            data={filteredListItem || listAllCountriesCases}
            renderItem={({ item, index }) => this.renderItem(item, index)} />
          {alert && (
            <View style={[styles.row, styles.alertContainer]}>
              <Text style={styles.alert}>Data is sorted by most cases.</Text>
              <TouchableOpacity
                onPress={() => this.setState({ alert: false })}
                style={{ marginLeft: 16 }}>
                <Icon type='MaterialIcons' name='close' style={{ color: white, fontSize: 20 }} />
              </TouchableOpacity>
            </View>
          )}
        </>
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
  },
  spinner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemContainer: {
    backgroundColor: white,
    padding: 16,
  },
  listItem: {
    paddingVertical: 8
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
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  textInput: {
    color: black,
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
    flex: 1,
    padding: 16,
  },
  searchContainer: {
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  alertContainer: {
    alignSelf: 'center',
    backgroundColor: black,
    borderRadius: 32,
    bottom: 8,
    justifyContent: 'space-between',
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'absolute',
  },
  alert: {
    color: white,
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
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

export default connect(mapStateToProps, mapDispatchToProps)(CountriesScreen)