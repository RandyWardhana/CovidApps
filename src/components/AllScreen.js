import React, { Component } from 'react'
import { SafeAreaView, Text, ScrollView, View, StyleSheet, RefreshControl, Platform } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner } from 'native-base'
import { Card, Layout } from '@ui-kitten/components'
import _ from 'lodash'

import { getAllCases } from '../redux/actions/covidAction'
import { danger, warning, basic, success, black, blackSecondary, disabled, white, } from '../Lib/Color';

class AllScreen extends Component {

  constructor(props) {
    super(props)
    this.state = {
      refreshing: true
    }
  }

  componentDidMount() {
    this.props.getAllCases()
    this.setState({ refreshing: false })
  }

  onRefresh() {
    this.props.getAllCases()
    this.setState({ refreshing: false })
  }

  formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
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

  renderData() {
    const { listAllCases, loadingAllCases } = this.props.covid
    const { refreshing } = this.state

    if (!loadingAllCases && listAllCases) {
      return (
        <ScrollView style={styles.container} refreshControl={<RefreshControl onRefresh={() => this.onRefresh()} refreshing={refreshing} />}>
          {this.renderItem(listAllCases.cases, 'Cases')}
          {this.renderItem(listAllCases.deaths, 'Deaths')}
          {this.renderItem(listAllCases.recovered, 'Recovered')}
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
    padding: Platform.OS == 'ios' ? 16:8,
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
  }
})

const mapStateToProps = (state) => ({
  covid: state.covid,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCases: bindActionCreators(getAllCases, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllScreen)