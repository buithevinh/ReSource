import React, { Component } from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Image
} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';
import IconE from 'react-native-vector-icons/Entypo';

import Communications from 'react-native-communications';

import Header from './Header';

export default class Contact extends Component {
    constructor(props){
        super(props);
    }

    onClickPhone(){
        Communications.phonecall('01217767795', true)
    }

    onClickWeb(link) {
        Communications.web(link);
    }
    onClickMail() {
        Communications.email(['buithevinh1993@gmail.com'], null, null, 'Contact Vipo Message', 'my body text');
    }
    render() {
        return(
            <View style = {styles.container}>
                <Header titles = 'Contact' back  = {true} />
                <View style = {styles.content}>
                    <View style = {styles.blockImage} >
                        <Image 
                            source = {{uri: 'https://firebasestorage.googleapis.com/v0/b/vipo-92a5a.appspot.com/o/vipo%20(4).png?alt=media&token=b771901d-b6f7-4047-b16c-4bd93dadfa33'}}
                            style = {styles.image}
                        />
                    </View>
                    <View style = {styles.block}>
                        <Text style = {styles.text}>WebSite: </Text>
                        <TouchableOpacity onPress = {this.onClickWeb.bind(this, 'https://buithevinh.github.io/PageCV/')}>
                            <Text style = {styles.textContent}>www.buithevinh.github.io</Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.block}>
                        <Text style = {styles.text}> SDT: </Text>
                        <TouchableOpacity onPress = {this.onClickPhone.bind(this)}>
                            <Text  style = {styles.textContent}>01217767795 </Text>
                        </TouchableOpacity>
                    </View>
                     <View style = {styles.block}>
                        <Text style = {styles.text}> Email: </Text>
                        <TouchableOpacity onPress = {this.onClickMail.bind(this)}>
                            <Text  style = {styles.textContent}>buithevinh@gmail.com </Text>
                        </TouchableOpacity>
                    </View>
                    <View style = {styles.block}>
                        <View style = {styles.social}>
                            <TouchableOpacity onPress = {this.onClickWeb.bind(this, 'https://www.facebook.com/vinh.bui.589')} style = {styles.iconSocial}>
                                <Icon name = 'facebook' style = {[styles.icon]} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress = {this.onClickWeb.bind(this, 'https://plus.google.com/112023720855926277341?hl=vi')} style = {styles.iconSocial}>
                                <IconE name = 'google-' style = {styles.icon} />
                            </TouchableOpacity>
                        </View>
                    </View>
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
        backgroundColor: '#EAF2E8'
    },
    content: {
        flex: 9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    blockImage: {
        width: 84,
        height: 84,
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#fff',
        borderStyle: 'solid',
    },
    image: {
        flex: 1,
        resizeMode: 'cover',
        width: 80,
        height: 80,
        borderRadius: 100
    },
    block: {
        flexDirection: 'row',
        margin: 10
    },
    text: {
        color: '#0B3954',
        fontSize: 16,
        fontWeight: 'bold'
    },
    textContent: {
        color: '#0B3954',
        fontSize: 16,
        fontStyle: 'italic'
    },
    social: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    iconSocial: {
        borderWidth: 2,
        borderRadius: 100,
        borderColor: '#D7263D',
        borderStyle: 'solid',
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 6
    },
    icon:{
        color: '#D7263D',
        fontSize: 20,
    }
});