import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  Image,
  StyleSheet,
  TextInput,
  ScrollView
} from 'react-native';

import Header from './Header';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconMater from 'react-native-vector-icons/MaterialIcons';

import { connect } from 'react-redux';

import {Actions} from 'react-native-router-flux';

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

class Profile extends Component {
    constructor(props){
        super(props);
    }

    onClickItem(item) {
        Actions.item(item);
    }

    render() {
        let appData = this.props.appData;
        const items = appData.profile.data.map((item, i) => {
            return (
                <TouchableOpacity onPress = {this.onClickItem.bind(this, item.data)} key = {i}>
                  <View style = {styles.item} >
                    <View style = {[styles.blockAvatar, {zIndex: 1}]}>
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
                    <View style = {[styles.blockPosts, {zIndex: 1}]}>
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
        return (
            <View style = {styles.container}>
                <Header titles = 'Profile' back = {true} />
                <ScrollView style = {styles.content} >
                    <View style = {styles.blockImage} >
                        <View style = {styles.avatar}>
                            <Image 
                                source = {{uri: appData.url}}
                                style = {styles.image}
                            />
                        </View>
                        <View style = {styles.viewName}>
                            <Text style = {styles.textName}>{appData.name} </Text>
                            <Text style = {styles.text}>{appData.location.name}</Text>
                        </View>
                        <View style = {styles.follow}>
                            <View style = {styles.blockCount} > 
                                <Text style = {styles.count}> {appData.profile.countPosts} </Text>
                                <Text style = {styles.text}> Posts</Text>
                            </View>
                            <View style = {styles.blockCount}>
                                <Text style = {styles.count}>  {appData.profile.countFollowers} </Text>
                                <Text style = {styles.text}> Followers</Text>
                            </View>
                            <View style = {styles.blockCount} > 
                                <Text style = {styles.count}>{appData.profile.countFollowing}</Text>
                                <Text style = {styles.text}> Following   </Text>
                            </View>
                        </View>
                    </View>
                    <View style  = {styles.blockInfo} >
                        {items}
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
        backgroundColor: '#EAF2E8',
    },
    content: {
        flex: 9,
        flexDirection: 'column',
    },
    blockImage: {
        flex: 5,
        backgroundColor: '#18AFA0',
        alignItems: 'center',
        justifyContent: 'center'
    },
    blockInfo: {
        flex: 5,
        justifyContent: 'center'
    },
    image: {
        width: 80,
        height: 80,
        resizeMode: 'cover',
        borderRadius: 100,
    },
    avatar: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#fff',
        borderStyle: 'solid',
        width: 84
    },
    textName: {
        fontSize: 20,
        color: '#fff',
        marginTop: 10,
        textAlign: 'center'
    },
    text: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center'
    },
    count: {
        fontSize: 18,
        color: '#fff'
    },
    follow: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
        backgroundColor: '#1ABFAF',
        paddingTop: 10,
        paddingBottom: 10
    },
    viewName: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blockCount: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    block: {
        justifyContent: 'center',
        borderBottomWidth : 2,
        borderColor: '#fff',
        borderStyle: 'solid',
        paddingBottom: 10,
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10

    },
    title: {
        color: '#D7263D',
        fontSize: 16
    },
    txtContent: {
        fontSize: 16,
        color: '#0B3954'
    },
    item: {
        flexDirection: 'column',
        flex: 1,
    },
    txtItem: {
        color: '#000405',
        fontSize: 16,
        fontFamily: 'Mijas-Ultra',
        justifyContent: 'center'
    },
    blockAvatar: {
        height: 180,
    },
    itemImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    blockPosts: {
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
})

export default connect(
  mapStateToProps,
)(Profile)
