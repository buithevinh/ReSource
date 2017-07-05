import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  BackAndroid ,
  Image,
  ScrollView,
  StyleSheet,
  InteractionManager
} from 'react-native';

import _ from 'lodash';

import Header from './Header';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';


import {Actions} from 'react-native-router-flux';

import { connect } from 'react-redux';

let Spinner = require('react-native-spinkit');

import { getProfileUserSuccess, fetchData } from '../actions/todoActions';

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getProfileUserSuccess: (userID) => dispatch(getProfileUserSuccess(userID)),
    fetchData: (userID) => dispatch(fetchData(userID))
  }
}

class News extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateLoading();
  }

  getStateLoading() {
    return {
      index: 6,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 20,
      color: "#011627",
      isVisible: true
    }
  }
  componentDidMount() {
    this.props.fetchData(this.props.appData.userID);
  }

  onClickItem(item,  key) {
    item['keyContent'] = key;
    Actions.item(item);
  }

  onClickLogo(userID) {
    InteractionManager.runAfterInteractions(() => {
      this.props.getProfileUserSuccess(userID);
    })
    Actions.profileUser({userID: userID});
  }

  renderView(){
    let type = this.state.types[this.state.index];
    let mapData = this.props.appData.dataFire.data;
    if (typeof (mapData) !== 'undefined') {
      return mapData.map((item, i) => {
        return (
          <TouchableOpacity onPress = {this.onClickItem.bind(this, item.data, item.key)} key = {i}>
            <View style = {styles.item} >
              <View style = {[styles.blockImage, {zIndex: 1}]}>
                <Image 
                  style={styles.itemImage} 
                  source={{uri: item.data.src}}
                />
              </View>
              <TouchableOpacity style = {[styles.logoBlock, {zIndex: 2}]} onPress = {this.onClickLogo.bind(this, item.data.idUser)}>
                <Image 
                  style={styles.logo} 
                  source={{uri: item.data.src_logo}}
                />
              </TouchableOpacity>
              <View style = {[styles.blockInfo, {zIndex: 1}]}>
                <View style = {styles.blockSpace} >
                  <View style = {[styles.blockIcon, {alignItems: 'flex-end',}]}>
                    <View style = {{justifyContent: 'center', flexDirection: 'row',marginBottom: -5}}>
                      <IconMater name= 'timer' style = {styles.iconTimer}/>
                      <Text style = {styles.txtItem}>{item.data.timer}</Text>
                    </View>
                  </View>
                </View>
                <View style = {styles.txtBlock}>
                  <View style = {styles.blockTitle}>
                    <Text style = {styles.txtTitle}>{item.data.title}</Text>
                  </View>
                  <View style = {styles.blockSub}>
                    <View style = {styles.blockIcon}>
                      <IconMater name= 'date-range' style = {styles.iconTimer}/>
                      <Text style = {styles.txtItem}>{item.data.time}</Text>
                    </View>
                    <View style = {styles.blockIcon}>
                      <Icon name = 'eercast' style = {styles.iconTimer}/>
                      <Text style = {styles.txtItem}>{item.data.category}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )
      })    
    } else {
      return (
        <View style  = {styles.loading}> 
          <Spinner 
            style={styles.spinner} 
            isVisible={this.state.isVisible} 
            size={this.state.size} type={type} 
            color={this.state.color}
          />
        </View>
      );
    }
    
  }
  render() {
    return (
       <View style = {styles.container}>
        <Header titles = 'News' back ={false} menu = {true}/>
        <View style = {styles.listItems}>
          <ScrollView>
            {this.renderView()}
          </ScrollView>
        </View>
       </View>
    )
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  listItems: {
    flex: 9,
  },
  item: {
    flexDirection: 'column',
    flex: 1
  },
  txtItem: {
    color: '#000405',
    fontSize: 16,
    fontFamily: 'Mijas-Ultra',
    justifyContent: 'center'
  },
  blockImage: {
    height: 180,
  },
  itemImage: {
    flex: 1,
    resizeMode: 'cover',
  },
  icon: {
    color: '#fff',
    fontSize: 25,
  },
  blockInfo: {
    backgroundColor: '#EAF2E8',
    flexDirection: 'row',
    flex: 1,
    height: 64 ,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 10,
    paddingLeft: 10
  },
  logo: {
    width: 64,
    height: 64,
    resizeMode: 'cover',
    borderRadius: 100,
  },
  logoBlock: {
    position: 'absolute',
    bottom: 30,
    left: 10,
    height: 68,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  txtBlock: {
    flex: 8,
  },
  blockSpace: {
    flex: 2.2,
  },
  iconTimer: {
    color: '#D7263D',
    fontSize: 20,
    paddingRight: 5,
    alignItems: 'center',
  },
  blockIcon: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  blockSub: {
    flex: 1,
    flexDirection: 'row',
  },
  blockTitle: {
    marginBottom: 5
  },
  txtTitle: {
    fontSize: 18,
    color: '#030407'
  },
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(News)
