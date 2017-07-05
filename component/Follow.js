import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  BackAndroid ,
  Image,
  ScrollView,
  StyleSheet,
  InteractionManager,
  NetInfo
} from 'react-native';


import Header from './Header';

import RenderItem from './RenderItem'

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';

import {Actions} from 'react-native-router-flux';

import { connect } from 'react-redux';

let Spinner = require('react-native-spinkit');

function handleFirstConnectivityChange(reach) {
  if (!reach) {
    Alert.alert(
      'Network Problem',
      'Không thể kết nối internet', 
      [
        {
          text: 'OK',
          onPress: () => {  
              BackAndroid.exitApp();
            }
        }
      ]
    );
  } 
  NetInfo.removeEventListener(
    'change',
    handleFirstConnectivityChange
  );
}


const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

class Follow extends Component {
  constructor(props) {
    super(props);
    this.state = this.getStateLoading();
    this.handleFirstConnectivityChange = handleFirstConnectivityChange.bind(this);
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
    NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange.bind(this));
  }

  RenderItemView(){
    let type = this.state.types[this.state.index];
    let mapData = this.props.appData.follow;
    if (typeof (mapData) !== 'undefined' && mapData.length !== 0) {
      return (
        <RenderItem mapData = {mapData} />
        );
    } 
    else {
      return (
        <View style={styles.loading}>
          <Spinner 
            style={styles.spinner} 
            isVisible={this.state.isVisible} 
            size={this.state.size} type={type} 
            color={this.state.color}
          />
        </View>
      )
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <Header titles = 'Follow' back ={false} menu = {true} />
        <View style = {styles.listItems}>
          <ScrollView>
            {this.RenderItemView()}
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
  loading: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
});
export default connect(
  mapStateToProps,
)(Follow)
