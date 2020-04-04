import * as React from 'react'
import { SafeAreaView, Text, ScrollView, View, StyleSheet, RefreshControl, Platform, TextInput, TouchableOpacity, FlatList } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Spinner, Icon, Item } from 'native-base'
import Feather from 'react-native-vector-icons/Feather'
import { Card } from '@ui-kitten/components'
import _ from 'lodash'
import DefaultPreference from 'react-native-default-preference'

import { getAllCases, getAllCountriesCases, getCountriesCases } from '../redux/actions/covidAction'
import { danger, warning, basic, success, black, blackSecondary, disabled, white, } from '../Lib/Color'

interface AllScreenProps {
  covid?: any,

  getAllCases: any,
  getAllCountriesCases: any,
  getCountriesCases: any
}

interface AllScreenState {
  refreshing: boolean,
  pinnedCountry?: string,
  filteredListItem?: [],
  searchText?: string,
  alert: boolean
}

class AllScreen extends React.Component<AllScreenProps, AllScreenState> {

  private myRef: any
  constructor(props: AllScreenProps, state: AllScreenState) {
    super(props)
    this.state = {
      refreshing: state.refreshing,
      pinnedCountry: state.pinnedCountry,
      filteredListItem: state.filteredListItem,
      searchText: state.searchText,
      alert: state.alert,
    }

    this.myRef = React.createRef()
  }

  componentDidMount(): void {
    this.getPreference()
    this.props.getAllCases()
    this.props.getAllCountriesCases()

    this.setState({ refreshing: false })
  }

  getPreference(): void {
    DefaultPreference.get('pinned').then((res) => {
      this.setState({ pinnedCountry: res })
    }).catch((err) => {
      throw err
    })
  }

  componentDidUpdate(prevProps: any, prevState: any): void {
    if (this.state.pinnedCountry !== prevState.pinnedCountry) {
      if (!_.isEmpty(this.state.pinnedCountry)) this.props.getCountriesCases(this.state.pinnedCountry)
    }
  }

  onRefresh(): void {
    this.getPreference()
    this.props.getAllCases()
    this.props.getAllCountriesCases()

    this.setState({ refreshing: false })
  }

  formatNumber(num: number): String {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
  }

  setDefaultPreference(dataPreference: string): void {
    DefaultPreference.set('pinned', dataPreference).then((res) => {
      DefaultPreference.get('pinned').then((res) => {
        this.setState({ pinnedCountry: res })
      }).catch((err) => {
        throw err
      })
    }).catch((err) => {
      throw err
    })
  }

  onSearchTextChange = (searchText: string) => {
    const { listAllCountriesCases } = this.props.covid

    let filtered = _.filter(listAllCountriesCases, (item: any) => {
      return item.country.toLowerCase().includes(searchText.toLowerCase())
    })

    if (_.isEmpty(searchText)) {
      filtered = null
    }

    this.setState({ searchText, filteredListItem: filtered })
  }

  renderItemGlobal(item: number, header: string): Object {
    let statusHeader = header == 'Cases' ? black : header == 'Deaths' ? danger : success

    return (
      <Card style={{ marginRight: 8, width: 200 }}>
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

  renderItemPinned(item: any): Object {
    let statusHeader = item.cases >= 1000 ? danger : item.cases >= 500 ? warning : item.cases <= 100 ? basic : success

    return (
      <Card style={{ marginVertical: 8, marginHorizontal: 16 }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <View style={[styles.row, { alignItems: 'flex-end', justifyContent: 'space-between' }]}>
          <Text style={styles.textTitle}>{item.country}</Text>
          <TouchableOpacity
            onPress={() => this.setDefaultPreference('')}
            style={{ alignSelf: 'center' }}>
            <Icon type='AntDesign' name={'pushpin'} style={{ fontSize: 24, transform: [{ rotate: '90deg' }] }} />
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

  renderItem(item: any, index: number): any {
    let statusHeader = item.cases >= 1000 ? danger : item.cases >= 500 ? warning : item.cases <= 100 ? basic : success
    const pinned = this.state.pinnedCountry == item.country ? 'pushpin' : 'pushpino'
    const setPreference = !_.isEmpty(this.state.pinnedCountry) ? '' : item.country


    return (
      <Card key={index} style={{ marginVertical: 8, marginHorizontal: 16 }}>
        {/* Status Header */}
        <View style={[styles.statusHeader, { backgroundColor: statusHeader }]} />

        {/* Header */}
        <View style={[styles.row, { alignItems: 'flex-end', justifyContent: 'space-between' }]}>
          <View style={styles.column}>
            <Text style={[styles.textTitle, { fontSize: 16 }]}>{`# ${index + 1}`}</Text>
            <Text style={styles.textTitle}>{item.country}</Text>
          </View>
          <TouchableOpacity
            onPress={() => this.setDefaultPreference(setPreference)}
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

  renderSearch(searchText: string): Object {
    return (
      <Item style={styles.searchContainer}>
        <Feather name='search' size={20} color={'#bdbdbd'} />
        <TextInput
          style={styles.textInput}
          placeholder={'Search Country'}
          placeholderTextColor={'#bdbdbd'}
          value={searchText}
          onChangeText={(text) => this.onSearchTextChange(text)} />
        {!_.isEmpty(searchText) && (
          <TouchableOpacity onPress={() => this.setState({ searchText: '' })}>
            <Feather name='x' size={20} color={'#bdbdbd'} />
          </TouchableOpacity>
        )}
      </Item>
    )
  }

  renderListGlobal(listAllCases: any): Object {
    return (
      <>
        <ScrollView
          contentContainerStyle={{ flexDirection: 'row', paddingHorizontal: 16 }}
          horizontal
          showsHorizontalScrollIndicator={false}>
          {this.renderItemGlobal(listAllCases.cases, 'Cases')}
          {this.renderItemGlobal(listAllCases.deaths, 'Deaths')}
          {this.renderItemGlobal(listAllCases.recovered, 'Recovered')}
        </ScrollView>
      </>
    )
  }

  renderListPinned(listCountriesCases: any): Object {
    return (
      <>
        <Text style={[styles.textHero, { marginTop: 8 }]}>
          Pinned Country
        </Text>
        {this.renderItemPinned(listCountriesCases)}
      </>
    )
  }

  renderListCountry(filterListItem: []): Object {
    return (
      <>
        <Text style={[styles.textHero, { marginTop: 8 }]}>
          All Country
        </Text>
        <FlatList
          contentContainerStyle={{ paddingBottom: 48 }}
          data={filterListItem}
          renderItem={({ item, index }) => this.renderItem(item, index)} />
      </>
    )
  }

  renderLoading(): Object {
    return (
      <View style={styles.spinner}>
        <Spinner color={black} size={44} />
      </View>
    )
  }

  scrollToTop(): void {
    this.myRef.current.scrollTo({x: 0, y: 0, animated: true})
  }

  renderData(): Object {
    const { listAllCases, listAllCountriesCases, listCountriesCases, loadingAllCases, loadingAllCountriesCases, loadingCountriesCases } = this.props.covid
    const { refreshing, pinnedCountry, searchText, filteredListItem } = this.state

    const filterListItem = _.isEmpty(searchText) ? listAllCountriesCases : filteredListItem

    if (!loadingAllCases && listAllCases) {
      return (
        <>
          {this.renderSearch(searchText)}
          <ScrollView
            ref={this.myRef}
            refreshControl={<RefreshControl onRefresh={() => this.onRefresh()} refreshing={refreshing} />}>
            <Text style={styles.textHero}>
              Global Coronavirus Pandemic Cases
            </Text>
            {this.renderListGlobal(listAllCases)}
            {!loadingCountriesCases && listCountriesCases && pinnedCountry !== '' ? (
              this.renderListPinned(listCountriesCases)
            ) : loadingCountriesCases && !listCountriesCases ? this.renderLoading() : null}
            {!loadingAllCountriesCases && listAllCountriesCases !== '' ? (
              this.renderListCountry(filterListItem)
            ) : this.renderLoading()}
          </ScrollView>
          <SafeAreaView>
            <TouchableOpacity style={styles.scrollToTop} onPress={() => this.scrollToTop()}>
              <Feather name='chevrons-up' style={{ color: white, fontSize: 28 }} />
            </TouchableOpacity>
          </SafeAreaView>
        </>
      )
    }
    else {
      return this.renderLoading()
    }
  }

  render(): Object {
    return (
      <>
        <SafeAreaView style={styles.container}>
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
    padding: 16,
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
  scrollToTop: {
    backgroundColor: black,
    bottom: 16,
    padding: 8,
    borderRadius: 32,
    position: 'absolute',
    right: 16,
  }
})

const mapStateToProps = (state) => ({
  covid: state.covid,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getAllCases: bindActionCreators(getAllCases, dispatch),
    getAllCountriesCases: bindActionCreators(getAllCountriesCases, dispatch),
    getCountriesCases: bindActionCreators(getCountriesCases, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllScreen)