import React, { Component } from 'react';

import {
  Text,
  TouchableOpacity,
  View,
  BackAndroid ,
  Image,
  StyleSheet,
} from 'react-native';

import _ from 'lodash';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';

import {Actions} from 'react-native-router-flux';

export default class RenderItem extends Component{
    constructor(props) {
        super(props);
    }

    onClickItem(item,  key){
      item['keyContent'] = key;
      Actions.item(item);
    }

    render() {
        let mapData = this.props.mapData;
        console.log(mapData);
        const item = mapData.map((item, i) => {
          return (
            <TouchableOpacity onPress = {this.onClickItem.bind(this, item.data, item.key)} key = {i}>
              <View style = {styles.item} >
                <View style = {[styles.blockImage, {zIndex: 1}]}>
                    <Image 
                        style={styles.itemImage} 
                        source={{uri: item.data.src}}
                    />
                </View>
                <View style = {[styles.logoBlock, {zIndex: 2}]}>
                    <Image 
                        style={styles.logo} 
                        source={{uri: item.data.src_logo}}
                    />
                </View>
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
        }); 
        return (
          <View>
            {item}
          </View>
        )
    }
}
const styles =  StyleSheet.create({
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
});