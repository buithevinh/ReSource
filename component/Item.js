import React, { Component } from 'react';

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
import IconMtIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconE from 'react-native-vector-icons/Entypo';

import Header from './Header';

import MapView from 'react-native-maps';

import { onChangeFollow } from '../actions/todoActions';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch) => { 
  return {
    onChangeFollow: (bool ,userID, key) => dispatch(onChangeFollow(bool, userID, key))
  }
}

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

class Item extends Component {
  constructor(props) {
    super(props);
    this.state = {
      follow: 'heart-o',
      isFollow: null,
      count: 0,
      flag: true,
      temp: 0
    }
  }

  componentWillMount() {
    if (this.props.follow) {
      this.setState({
        follow: 'heart',
        isFollow: true,
        count: this.props.count,
        temp: this.props.count
      });
    } else {
      this.setState({
        isFollow: false,
        count: this.props.count,
        temp: this.props.count
      });
    }
  }

  onFollowClick() {
    let count = this.state.count;
    if (this.state.isFollow) {
      count--;
      this.setState({
        follow: 'heart-o',
        isFollow: false,
        count: count
      });
    }else {
      count++;
      this.setState({
        follow: 'heart',
        isFollow: true,
        count: count
      });
    }
  }

  onChange() {
    if (this.state.count - this.state.temp > 0) {
      this.props.onChangeFollow(true ,this.props.idUser, this.props.keyContent);
    }  
    if (this.state.count - this.state.temp < 0) {
      this.props.onChangeFollow(false ,this.props.idUser, this.props.keyContent);
    }
  }

  render() {
    return (
      <View style = {styles.container}>
        <Header 
          titles = {this.props.title} 
          back = {true}
          onChange = {this.onChange.bind(this)}
          isChange = {true}
        />
        <ScrollView>
          <View style = {styles.content}>
            <View style = {styles.contentImage}>
              <Image 
                style = {styles.image}
                source = {{uri: this.props.src}}
              />
              <TouchableOpacity style = {styles.btnFollow} onPress = {this.onFollowClick.bind(this)} >
                <Icon name= {this.state.follow} style = {styles.iconImage} />
              </TouchableOpacity>

            </View>
            <View style = {styles.blockInfo}>
              <View style = {styles.blockHeader}>
                <View style = {styles.blockIcon}>
                  <Icon name = {this.state.follow} style = {styles.icon} />
                  <Text>{this.state.count} follow</Text>
                </View>
                <View style = {styles.blockCategory}>
                  <Icon name = 'eercast' style = {styles.icon} />
                  <Text>{this.props.category}</Text>
                </View>
              </View>
              <View style = {styles.txtView}>
                <Text style = {styles.txtTitle}>{this.props.title}</Text>
                <Text style = {styles.text}>{this.props.description}</Text>
                <View style = {styles.blockIcon}>
                  <IconMater name = 'timer' style = {styles.icon} />
                  <Text> {this.props.timer + ' '+ this.props.time}</Text>
                </View>
                <View style = {styles.blockIcon}>
                  <IconMtIcon name = 'map-marker-radius' style = {styles.icon} />
                  <Text>{this.props.address}</Text>
                </View>
                <View style = {styles.blockIcon}>
                  <IconMtIcon name = 'web' style = {styles.icon} />
                  <Text>www.vipo</Text>
                </View>
              </View>
              <View style = {styles.social}>
                <View style = {styles.iconSocial}>
                  <Icon name = 'facebook' style = {[styles.icon, {paddingLeft: 5}]} />
                </View>
                <View style = {styles.iconSocial}>
                  <IconE name = 'google-' style = {styles.icon} />
                </View>
              </View>
              <View style = {styles.mapView}>
                <View style = {styles.blockMap}> 
                  <MapView style = {styles.map}
                    region={{
                      latitude: this.props.latitude,
                      longitude: this.props.longitude,
                      latitudeDelta: 0.005,
                      longitudeDelta: 0.0021,
                    }}
                    liteMode = {true}
                    showsUserLocation= {true}
                  >
                    <MapView.Marker 
                      coordinate={{ 
                        latitude: this.props.latitude,
                        longitude: this.props.longitude
                      }}
                    />
                  </MapView>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles =  StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  image : {
    flex: 1,
    height: 220,
    resizeMode: 'cover',
    zIndex: 0
  },
  text: {

  },
  content: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
  },
  blockHeader: {
    flexDirection: 'row',
    paddingLeft: 10

  },
  blockIcon: {
    flex: 1,
    flexDirection: 'row',
  },
  blockCategory: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  icon: {
    color: '#D7263D',
    fontSize: 20,
    paddingRight: 5,

  },
  txtView: {
    margin: 15,
  },
  iconImage: {
    fontSize: 25,
    color: '#D7263D',
  },
  btnFollow: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1
  },
  blockInfo: {
    marginTop: 10
  },
  text: {
    fontSize: 14,
    marginBottom: 5
  },
  txtTitle: {
    fontSize: 18,
    fontFamily: 'Gotham-Medium',
    marginBottom: 5
  },
  mapView: {
    height: 250,
    flex: 1,
    marginTop: 10,
  },
  blockMap: {
    height: 240,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {  
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 10
    
  },
  iconSocial: {
    borderWidth: 1,
    borderRadius: 100,
    borderColor: '#D7263D',
    borderStyle: 'solid',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 6
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item)

