import React, { Component } from 'react';

import {Actions} from 'react-native-router-flux';

import {
  Text,
  TouchableOpacity,
  View,
  BackAndroid ,
  Image,
  ScrollView,
  StyleSheet,
  Modal,
  InteractionManager
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';
import IconE from 'react-native-vector-icons/Entypo';
import IconMtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconEvill from 'react-native-vector-icons/EvilIcons';

import { connect } from 'react-redux';

import  Menu  from './Menus';

import _ from 'lodash';

import { getFollowSuccess } from '../actions/todoActions';


const FBSDK = require('react-native-fbsdk');
const {
  LoginManager,
} = FBSDK;

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

class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nameBars: 'menu',
      nameFollow: 'heart',
      modalVisible: false
    }
  }

  onBack() {
    if (this.props.menu) {
      this.setModalVisible(true);
    } else {
      Actions.pop();
    }

    if (this.props.isChange) {
      this.props.onChange();
    }
  }

  onFollow(){
    Actions.follow();
    this.setModalVisible(false);
  }

  onNews() {
    Actions.news();
    this.setModalVisible(false);
  }
  // handle click button category

  onCategory() {
    Actions.category();
    this.setModalVisible(false);
  }

  // handle click button follow
  onFollowClick() {
    Actions.follow();
    this.setModalVisible(false);
    InteractionManager.runAfterInteractions(() => {
      this.props.getFollowSuccess(this.props.appData.userID);
    })
  }

  // handle click button profile
  onProfile() {
    Actions.profile();
    this.setModalVisible(false);
  }

  //handle click button feed back
  onFeedBack() {
    Actions.feedback();
    this.setModalVisible(false);
  }

  //handle click button contact
  onContact(){
    Actions.contact();
    this.setModalVisible(false);
  } 

  onNotifications() {

  }
  // handle click button logout
  onLogOut() {
    LoginManager.logOut();
    Actions.login();
  }

  componentWillMount (){
      if (this.props.back) {
        this.setState({
          nameBars: 'chevron-with-circle-left',
        });
      }
  };

  setModalVisible(visible){
    this.setState({
      modalVisible: visible
    })
  }

  render() {
    return (
      <View>
        <Modal  
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => this.setModalVisible(false)}
        >
          <View style = {styles.container}>
            <View style = {styles.viewHeader}>
              <Text style = {styles.space}></Text>
              <Text style = {styles.txtHeader}></Text>
              <TouchableOpacity onPress = {() => this.setModalVisible(false)} style = {styles.btnIcon}>
                <IconEvill name = 'close' style = {styles.icon} />
              </TouchableOpacity>
            </View>
            <View style = {styles.viewProfile}>
              <View style = {styles.viewImage} >
                <Image 
                  source = {{uri: this.props.appData.url}}
                  style =  {styles.logo}
                />
              </View>
              <Text style = {styles.name} >{this.props.appData.name}</Text>
            </View>
            <View style = {styles.viewMenu}>
              <View style = {styles.viewVertical}>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onNews.bind(this)} >
                    <IconE name = 'news' style = {styles.blockIcon} />
                    <Text style = {styles.txtMenu}>News </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.viewHorizontal} >
                  <TouchableOpacity style = {styles.view} onPress = {this.onCategory.bind(this)}>
                    <IconE name = 'compass' style = {styles.blockIcon}/>
                    <Text style = {styles.txtMenu}>Category </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onFollowClick.bind(this)}>
                    <IconE name = 'heart' style = {styles.blockIcon} />
                    <Text style = {styles.txtMenu}>Follow </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style = {styles.viewVertical}>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onNotifications.bind(this)} >
                    <IconMater name = 'notifications-none' style = {styles.blockIcon} />
                    <Text style = {styles.txtMenu}> Notification </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onProfile.bind(this)} >
                    <Icon name = 'user-circle-o' style = {styles.blockIcon}  />
                    <Text style = {styles.txtMenu}>Profile </Text>
                  </TouchableOpacity>
                  
                </View>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onFeedBack.bind(this)}>
                    <IconMater name = 'feedback'style = {styles.blockIcon}  />
                    <Text style = {styles.txtMenu}>Feed Back </Text>
                  </TouchableOpacity>
                </View>
              </View>
              <View style = {styles.viewVertical}>
                <View style = {styles.viewHorizontal} >
                  <TouchableOpacity style = {styles.view} onPress = {this.onContact.bind(this)}>
                    <IconMtIcon name = 'map-marker-radius' style = {styles.blockIcon} />
                    <Text style = {styles.txtMenu}>Contact </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.viewHorizontal}>
                  <TouchableOpacity style = {styles.view} onPress = {this.onLogOut.bind(this)} >
                    <IconMtIcon name = 'logout' style = {styles.blockIcon} />
                    <Text style = {styles.txtMenu}>Log Out </Text>
                  </TouchableOpacity>
                </View>
                <View style = {styles.viewHorizontal}>
                  
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <View style = {styles.header} >
          <TouchableOpacity onPress ={this.onBack.bind(this)} style = {styles.btnIcon}>
            <IconE name = {this.state.nameBars} style = {styles.icon}/>
          </TouchableOpacity>
          <Text style = {styles.txtHeader}>
            {this.props.titles}
          </Text>
          <TouchableOpacity onPress ={this.onFollow.bind(this)} style = {styles.btnIcon}>
            <IconE  name = {this.state.nameFollow} style = {styles.icon} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles =  StyleSheet.create({
  header: {
    backgroundColor: '#18AFA0',
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  btnIcon: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
   color: '#fff',
    fontSize: 30,
  },
  category: {
    flex: 1
  },
  titleModal: {
    flex: 0.8,
    backgroundColor: '#E84855',
    flexDirection: 'row',
    alignItems: 'center'
  },
  txtModal: {
    flex: 9,
    textAlign: 'center',
    alignItems: 'center',
    color: '#fff',
    fontFamily: 'Gotham-Medium',
    fontSize: 20
  },
  btnClose: {
    flex: 1.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconClose: {
    color: '#fff',
    fontSize: 25,
  },
  content: {
    flex: 9,
    flexDirection: 'row',
    flexWrap: 'wrap',
    top: 0,
    zIndex: 999,
    backgroundColor: '#fff',
  },
  itemCategory: {
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center'
  },
  txtHeader: {
    fontFamily: 'Gotham-Medium',
    fontWeight: '200',
    fontSize: 18,
    color: '#fff',
    flex: 8,
    textAlign: 'center'
  },
  logo: {
    width: 64,
    height: 64,
  },
  title: {
    color: '#fff',
    textAlign: 'center'
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#EAF2E8'
    
  },
  viewHeader: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#18AFA0',
    height: 50
  },
  viewMenu: {
    flex: 8
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
  blockIcon: {
    color: '#D7263D',
    fontSize: 30,
    textAlign: 'center'
  },
  txtMenu: {
    textAlign: 'center',
    color: '#0B3954'
  },
  view: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  space: {
    flex: 1.5
  },
  viewImage: {
    width: 84,
    height: 84,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#fff',
    borderStyle: 'solid',
  },
  logo: {
    flex: 1,
    resizeMode: 'cover',
    width: 80,
    height: 80,
    borderRadius: 100
  },
  viewProfile: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: '#18AFA0'
  },
  name: {
    color: '#fff',
    fontSize: 20,
    marginTop: 10
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
