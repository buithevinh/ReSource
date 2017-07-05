import React, { Component } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
  BackAndroid
} from 'react-native';

import {Actions} from 'react-native-router-flux';
import Icon from 'react-native-vector-icons/FontAwesome';


import FBSDK  from 'react-native-fbsdk';

import { connect } from 'react-redux';

const {
  LoginManager,
  GraphRequest,
  GraphRequestManager,
  AccessToken,
  LoginButton
} = FBSDK;


import {FireBase, provider} from '../modules/firebase';

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}



class Login extends Component {
  constructor(){
    super();
  }

  onButtonPress () {
    LoginManager.logInWithReadPermissions(['public_profile', 'email', 'user_photos']).then(
      function(result) {
        if (result.isCancelled) {
          alert('Login cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then((data) =>{
            let accessToken = data.accessToken;
            const responseInfoCallback = (error, result) => {
              if (error) {
                alert('Error fetching data: ' + error.toString());
              } else {
                let userId =  result.id;
                let fireBaseUser = FireBase.database().ref('users/' + userId);
                Actions.app();
                fireBaseUser.once('value').then(function(snapshot) {
                  if (!snapshot.val()) {
                    fireBaseUser.set({
                      email: result.email,
                      name: result.name,
                      id: userId
                    })
                  }
                });
              }
            }
            const infoRequest = new GraphRequest('/me',
            { 
              accessToken: accessToken,
              parameters: {
                fields: {
                  string: 'email,name,first_name,middle_name,last_name'
                }
              }
            },responseInfoCallback);
            new GraphRequestManager().addRequest(infoRequest).start();
          })
        } 
      },
      function(error) {
        alert('Login fail with error: ' + error);
      }
    );
  };

  componentWillMount(){
    BackAndroid.addEventListener('hardwareBackPress', () => {
      Actions.pop();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style= {styles.title}>
          <Text style={styles.text}>
            VIPO
          </Text>
        </View>
        <View style= {styles.block}>
          <View style={styles.spacer}></View>
          <View style={styles.button}>
            <TouchableOpacity onPress={this.onButtonPress.bind(this)} style= {styles.facebook}>
              <View style={styles.btnBlock}>
                <Icon name="facebook-square" style = {styles.icon}/>
                <Text  style={styles.btn}>
                  Login With Facebook
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.onButtonPress} style= {styles.google} >
              <View style={styles.btnBlock}>
                <Text style={styles.btn}>Google+</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.spacer}></View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#0FB26E',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    color: '#fff',
    justifyContent: 'center',
  },
  title: {
    flexDirection: 'column',
    flex: 1,
    justifyContent: 'center',
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
  },
  button: {
    flex: 9,
  },
  spacer: {
    flex: 0.5,
  },
  btn: {
    color: '#fff', 
    textAlign: 'left',
    fontSize: 20,
    flex: 0.8
  },
  btnBlock: {
    height: 40,
    justifyContent: 'center',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  facebook: {
    height: 40,
    backgroundColor: '#3b5998',
    borderRadius: 2,
  },
  google: {
    height: 40,
    backgroundColor: '#d34836',
    marginTop: 10,
    borderRadius: 2
  },
  icon: {
    left: 0,
    color: '#fff',
    fontSize: 25,
    flex: 0.2,
    textAlign: 'center'
  }
});

export default connect(
  mapStateToProps,
)(Login)
