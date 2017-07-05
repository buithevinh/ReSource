import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
  StyleSheet,
  AppState, 
  Platform,
  InteractionManager
} from 'react-native';

import _ from 'lodash';

import Header from './Header';
import PushController from './PushController';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';
import IconMtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

import {Actions} from 'react-native-router-flux';

import { connect } from 'react-redux';

import { getFollowSuccess } from '../actions/todoActions';

const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

import PushNotification from 'react-native-push-notification';

const mapDispatchToProps = (dispatch) =>{
  return {
    getFollowSuccess: (userID) => dispatch(getFollowSuccess(userID))
  }
}

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

class Menus extends Component {
  constructor(props) {
    super(props);
    this.handleAppStateChange = this.handleAppStateChange.bind(this);
    this.state = {
      seconds: 5,
    };
  }

  // handle click button new

  onNews() {
    Actions.news();
  }
  // handle click button category

  onCategory() {
    Actions.category();
  }

  // handle click button follow
  onFollow() {
    Actions.follow();
    InteractionManager.runAfterInteractions(() => {
      this.props.getFollowSuccess(this.props.appData.userID);
    })
  }

  // handle click button profile
  onProfile() {
    Actions.profile();
  }

  //handle click button feed back
  onFeedBack() {
    Actions.feedback();
  }

  //handle click button contact
  onContact(){
    Actions.contact();
  } 

  onNotifications() {

  }
  // handle click button logout
  onLogOut() {
    LoginManager.logOut();
    Actions.login();
  }

  //handle click button onNotifications 

  componentDidMount() {
    AppState.addEventListener('change', this.handleAppStateChange);
  }

   componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  handleAppStateChange(appState) {
    if (appState === 'background') {
      let date = new Date(Date.now() + (this.state.seconds * 1000));
      if (Platform.OS === 'ios') {
        date = date.toISOString();
      }

      PushNotification.localNotificationSchedule({
        message: "My Notification Message",
        date,
      });
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <View style = {styles.viewLogo}>
          <Image 
            source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/vipo-92a5a.appspot.com/o/my_logo.png?alt=media&token=14c6f983-c2a5-4c8c-9a1a-7696ca71b5db'}}
            style = {styles.logo}
          />
        </View>
        <View style = {styles.viewMenu}>
          <View style = {styles.viewVertical}>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onNews.bind(this)} >
                <IconE name = 'news' style = {styles.icon} />
                <Text style = {styles.txtMenu}>News </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.viewHorizontal} >
              <TouchableOpacity style = {styles.view} onPress = {this.onCategory.bind(this)}>
                <IconE name = 'compass' style = {styles.icon}/>
                <Text style = {styles.txtMenu}>Category </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onFollow.bind(this)}>
                <IconE name = 'heart' style = {styles.icon} />
                <Text style = {styles.txtMenu}>Follow </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style = {styles.viewVertical}>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onNotifications.bind(this)} >
                <IconMater name = 'notifications-none' style = {styles.icon} />
                <Text style = {styles.txtMenu}> Notification </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onProfile.bind(this)} >
                <Icon name = 'user-circle-o' style = {styles.icon}  />
                <Text style = {styles.txtMenu}>Profile </Text>
              </TouchableOpacity>
              
            </View>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onFeedBack.bind(this)}>
                <IconMater name = 'feedback'style = {styles.icon}  />
                <Text style = {styles.txtMenu}>Feed Back </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style = {styles.viewVertical}>
            <View style = {styles.viewHorizontal} >
              <TouchableOpacity style = {styles.view} onPress = {this.onContact.bind(this)}>
                <IconMtIcon name = 'map-marker-radius' style = {styles.icon} />
                <Text style = {styles.txtMenu}>Contact </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.viewHorizontal}>
              <TouchableOpacity style = {styles.view} onPress = {this.onLogOut.bind(this)} >
                <IconMtIcon name = 'logout' style = {styles.icon} />
                <Text style = {styles.txtMenu}>Log Out </Text>
              </TouchableOpacity>
            </View>
            <View style = {styles.viewHorizontal}>
              
            </View>
          </View>
        </View>
        <PushController />
      </View>
    )
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#18AFA0'
  },
  viewLogo: {
    flex: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  viewMenu: {
    flex: 6
  },
  logo: {
    width: 240,
    height: 240,
  },
  txtLogo: {
    fontSize: 20,
    textAlign: 'center'
  },
  viewVertical: {
    flex: 1,
    flexDirection: 'row',
  },
  viewHorizontal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10
  },
  icon: {
    color: '#fff',
    fontSize: 30,
    textAlign: 'center'
  },
  txtMenu: {
    textAlign: 'center',
    color: '#fff'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  }
  
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
  
)(Menus)
