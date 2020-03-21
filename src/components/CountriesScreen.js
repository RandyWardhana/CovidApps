import React, { Component } from 'react'
import { SafeAreaView, Text, FlatList, View, StyleSheet, RefreshControl, TextInput } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner } from 'native-base'
import { Card, Layout, CardHeader } from '@ui-kitten/components'
import _ from 'lodash'

import { getAllCases, getAllCountriesCases } from '../redux/actions/covidAction'
import { danger, warning, basic, success, black, blackSecondary, disabled, white } from '../Lib/Color';

class CountriesScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      filteredListItem: null,
      refreshing: true,
      searchText: null
    }
  }

  componentDidMount() {
    this.props.getAllCountriesCases()
    this.setState({ refreshing: false })
  }

  onRefresh() {
    this.props.getAllCountriesCases()
    this.setState({ refreshing: false })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  renderItem(item, index) {
    let statusHeader = item.cases >= 1000 ? danger : item.cases >= 500 ? warning : item.cases <= 100 ? basic : success

    return (
      <Card key={index} style={{ marginVertical: 8, fontFamily: 'Poppins-Medium' }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <Text style={styles.textTitle}>{item.country}</Text>
        {/* Divider */}
        <View style={styles.divider} />

        {/* Content */}
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={styles.textDetail}>{`Cases: ${this.formatNumber(item.cases)}`}</Text>
            <Text style={styles.textDetail}>{`Today: ${this.formatNumber(item.todayCases)}`}</Text>
            <Text style={styles.textDetail}>{`Active: ${this.formatNumber(item.active)}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textDetail}>{`Deaths: ${this.formatNumber(item.deaths)}`}</Text>
            <Text style={styles.textDetail}>{`Today: ${this.formatNumber(item.todayDeaths)}`}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.textDetail}>{`Recovered: ${this.formatNumber(item.recovered)}`}</Text>
            <Text style={styles.textDetail}>{`Critical: ${this.formatNumber(item.critical)}`}</Text>
          </View>
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
    const { refreshing, searchText, filteredListItem } = this.state

    if (!loadingAllCountriesCases && listAllCountriesCases) {
      return (
        <>
          <TextInput
            placeholder={'Search Country'}
            placeholderTextColor={'#bdbdbd'}
            style={styles.textInput}
            value={searchText}
            onChangeText={(text) => this.onSearchTextChange(text)} />
          <FlatList
            refreshControl={
              <RefreshControl
                onRefresh={() => this.onRefresh()}
                refreshing={refreshing}
              />}
            contentContainerStyle={styles.listItemContainer}
            data={filteredListItem || listAllCountriesCases}
            renderItem={({ item, index }) => this.renderItem(item, index)} />
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
    marginBottom: 4,
  },
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  },
  textInput: {
    borderRadius: 4,
    borderColor: disabled,
    borderWidth: 2,
    color: black,
    fontFamily: 'Poppins-Medium',
    height: 40,
    margin: 16,
    marginBottom: 4,
    paddingHorizontal: 16,
  },
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