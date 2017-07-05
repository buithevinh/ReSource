import React, { Component } from 'react';



import {Actions} from 'react-native-router-flux';

import { connect } from 'react-redux';
import { fetchAccessToken } from '../actions/todoActions';

import {
  View,
  BackAndroid,
  Text,
  NetInfo,
  StyleSheet,
  Alert
} from 'react-native';

var Spinner = require('react-native-spinkit');

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
const mapDispatchToProps = (dispatch) => {
  return {
    fetchAccessToken: () => dispatch(fetchAccessToken())
  }
}



class App extends Component{
  constructor(props){
    super(props);
    props.fetchAccessToken();
    this.state = this.getStateLoading();
    this.handleFirstConnectivityChange = handleFirstConnectivityChange.bind(this);
  }

  getStateLoading() {
    return {
      index: 2,
      types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
      size: 100,
      color: "#FFFFFF",
      isVisible: true
    }
  }

  componentDidUpdate() {
    let appData = this.props.appData;
    if (appData.isLoadingAccessToken) {
      if (appData.accessToken !== -1) {
          Actions.news();
      }else if (appData.accessToken === -1) {
        Actions.login();
      }
    }
  }
  
  componentDidMount() {
    NetInfo.isConnected.addEventListener('change', handleFirstConnectivityChange.bind(this));
  }

  render () {
    var type = this.state.types[this.state.index];
    return (
      <View style = {styles.container}>
        <View style={styles.loading}>
          <Spinner style={styles.spinner} isVisible={this.state.isVisible} size={this.state.size} type={type} color={this.state.color}/>
        </View>  
      </View>
    )
  }
}

const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#18AFA0',
    flexDirection: 'column',
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 40,
  },
  loading: {
    alignItems: 'center',
  }
});


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App)
