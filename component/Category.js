import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  InteractionManager
} from 'react-native';

import _ from 'lodash';

import Header from './Header';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';
import IconMtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

import {Actions} from 'react-native-router-flux';

import { connect } from 'react-redux';

import { getItemCatelogy } from '../actions/todoActions';

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

const mapDispatchToProps = (dispatch) =>{
  return {
    getItemCatelogy: (category) => dispatch(getItemCatelogy(category))
  }
}

class Category extends Component {
  constructor(props) {
    super(props);
  }


  onShowCatelogyItem(category) {
    InteractionManager.runAfterInteractions(() => {
      this.props.getItemCatelogy(category);
    })
    Actions.show({category: category});
  }

  render() {
    let category = this.props.appData.dataFire.category;
    const Category = category.map ((item, i) => {
      return (
        <TouchableOpacity style = {[styles.itemCategory, {backgroundColor: item.category.color}]} 
            onPress = {this.onShowCatelogyItem.bind(this, item.category.title)} key = {i}>
          <View >
            <Image  
              style={styles.logo} 
              source={{uri: item.category.logo}}
            />
            <Text style = {styles.title} >
              {item.category.title}
            </Text>
          </View>
        </TouchableOpacity>
      )
    })
    return (
      <View style = {styles.container}>
        <Header titles = 'Category' back ={false} menu = {true}/>
        <View style = {styles.content}>
          <ScrollView contentContainerStyle = {{minHeight: 360}} >
            <View style = {styles.category}>
              {Category}
            </View>
          </ScrollView>
        </View>
      </View>
    )
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  content: {
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  category: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  itemCategory: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    borderRadius: 5
  },
  logo: {
    width: 64,
    height: 64,
  },
  title: {
    color: '#fff',
    textAlign: 'center'
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Category)
