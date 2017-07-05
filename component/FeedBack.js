import React, {Component} from 'react';
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TextInput,
  Alert,
  InteractionManager
} from 'react-native';

import Header from './Header';

import { connect } from 'react-redux';
import { sendFeedbackSuccess } from '../actions/todoActions';

let Spinner = require('react-native-spinkit');

const mapDispatchToProps = (dispatch) => {
  return {
    sendFeedbackSuccess: (userID, data) => dispatch(sendFeedbackSuccess(userID, data))
  }
}

const mapStateToProps = (state) => {
  return {
    appData: state.appData
  }
}

class FeedBack extends Component {
    constructor(props){
        super(props);
        this.state = this.getStateLoading();
    }

    renderView() {
        let type = this.state.types[this.state.index];
        if (this.state.isVisible) {
            return (
                <View style={styles.loading}>
                    <Spinner 
                        style={styles.spinner} 
                        isVisible={this.state.isVisible} 
                        size={this.state.size} type={type} 
                        color={this.state.color}
                    />
                </View>
            );
        } else return (<View></View>);
    }

    getStateLoading() {
        return {
            index: 1,
            types: ['CircleFlip', 'Bounce', 'Wave', 'WanderingCubes', 'Pulse', 'ChasingDots', 'ThreeBounce', 'Circle', '9CubeGrid', 'WordPress', 'FadingCircle', 'FadingCircleAlt', 'Arc', 'ArcAlt'],
            size: 100,
            color: "#FFFFFF",
            isVisible: false,
            name:  null,
            mail: null,
            message: '',
            disabled: 'rgba(226,26,60, 0.3)',
            isDisabled: true
        }
    }

    componentDidUpdate(){
        let appData = this.props.appData;
        InteractionManager.runAfterInteractions(() => {
            if (this.state.isVisible) {
                if (appData.isFeedback) {
                    let that = this;
                    setTimeout(function() {
                    Alert.alert(
                        'Send FeedBack', 
                        'Successfully!',
                        [ 
                            {
                                text: 'OK', 
                                onPress: () => {
                                    that.setState({
                                        isVisible: false,
                                        name: null,
                                        mail: null,
                                        message: null,
                                        isDisabled: true,
                                        disabled: 'rgba(226,26,60, 0.3)',
                                    })
                            }   }
                        ]
                    );
                    that.setState({
                      isVisible : false
                    });
                  }, 500);
                  
                }
            }
        })
    }

    onSend(userID){
        if (!this.state.isVisible) {
            let data = {
                name: this.state.name,
                mail: this.state.mail,
                message: this.state.message
            }
            this.props.sendFeedbackSuccess(userID, data);
            this.setState({
                isVisible: true
            });
        }
        
    }

    onCheckValidate() {
        let patternName = /^[a-zA-Z_ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ]+$/;
        let patternMail = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let patternMessage = /^(\s+)$/;
        if (patternName.test(this.state.name) &&
            patternMail.test(this.state.mail) &&
            !patternMessage.test(this.state.message) && this.state.message.trim()) {
            this.setState({
                isDisabled: false,
                disabled: 'rgba(226,26,60, 1)',
            })
        } else {
            this.setState({
                isDisabled: true,
                disabled: 'rgba(226,26,60, 0.3)',
            })
        }
    }

    onTextName(text) {
        this.setState({
            name: text
        })
        this.onCheckValidate();
    }

    onTextMail(text){
        this.setState({
            mail: text
        })
        this.onCheckValidate();
    }

    onTextMessage(text){
        this.setState({
            message: text
        })
        this.onCheckValidate();  
    }

    render() {
        let userID = this.props.appData.userID;
        return (
            <View style = {styles.container}>
                {this.renderView()}
                <Header  titles = 'FeedBack' back ={true}/>
                <View style = {styles.content}>
                    <View style = {styles.block} >
                        <Text style = {styles.text} >Your Name: </Text>
                        <TextInput 
                            placeholder = 'Enter Name' 
                            underlineColorAndroid = 'transparent' 
                            placeholderTextColor = 'rgba(60, 72, 89, 0.8)' 
                            style = {styles.input}
                            onChangeText = {this.onTextName.bind(this)}
                            value = {this.state.name}
                        />
                    </View>
                    <View style = {styles.block} >
                        <Text style = {styles.text} >Your Mail: </Text>
                        <TextInput 
                            placeholder = 'Enter Mail' 
                            underlineColorAndroid =  'transparent' 
                            placeholderTextColor = 'rgba(60, 72, 89, 0.8)' 
                            style = {styles.input}
                            onChangeText = {this.onTextMail.bind(this)}
                            value = {this.state.mail}
                        />
                    </View>
                    <View style = {styles.block} >
                        <Text style = {styles.text} >Message: </Text>
                        <TextInput 
                            placeholder = 'Enter Message' 
                            style = {styles.input}
                            multiline={true}
                            numberOfLines={4}
                            placeholderTextColor = 'rgba(60, 72, 89, 0.8)'
                            underlineColorAndroid = 'transparent'
                            onChangeText = {this.onTextMessage.bind(this)}
                            value = {this.state.message}
                        />
                    </View>
                    <View style = {[styles.block,{marginTop: 20}]} >
                        <TouchableOpacity 
                            onPress = {this.onSend.bind(this, userID)}
                            style = {[styles.btnSend, {backgroundColor: this.state.disabled}]}
                            disabled = {this.state.isDisabled}
                        >
                            <Text style = {styles.txtSend} >Send Message</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>        
        );
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
        marginTop: 20
    },
    block: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
    },
    text: {
        flex: 3,
        color: '#0B3954',
        textAlign: 'right',
        fontSize: 16
    },
    input: {
        flex: 7,
        borderRadius: 5,
        padding: 4,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    btnSend: {
        alignItems: 'center',
        padding: 10,
        borderRadius: 5,
    },
    txtSend: {
        color: '#fff',
        fontSize: 16
    },
    loading: {
        alignItems: 'center',
        backgroundColor: 'rgba(21, 18, 16, 0.7)',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        alignItems: 'center',
        justifyContent: 'center'
    }
});


export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(FeedBack)
