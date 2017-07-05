import { 
    FETCHING_PROFILE_SUCCESS, 
    FETCHING_FOLLOW_ITEM, 
    FETCHING_CATELOGY_ITEM,
    FETCHING_DATA, 
    FETCHING_DATA_SUCCESS, 
    FETCHING_DATA_FAILURE, 
    FETCHING_ACCESSTOKEN_SUCCESS, 
    FETCHING_ACCESSTOKEN,
    SEND_FEEDBACK,
    ON_SEND_FEEDBACK,
    GET_PROFILE_SUCCESS,
    ON_CHANGE_FOLLOW,
    GET_FOLLOW_DATA
} from './actionTypes';

import { 
    getDataFireBase, 
    getToken, 
    getItem, 
    getFollowItemSuccess, 
    getProfile,
    sendFeedbackData,
    getProfileUser,
    onChangeFollowFB,
    getFollowData
} from '../stores/getDataFireBase';

export function getData (){
    return {
        type: FETCHING_DATA
    }
}   

export function getAccessToken() {
    return {
        type:  FETCHING_ACCESSTOKEN,
    }
}

export function getAccessTokenSuccess(accessToken, userID) {
    return {
        type:  FETCHING_ACCESSTOKEN_SUCCESS,
        accessToken,
        userID,
    }
}

export function getDataSuccess(data) {
    return {
        type: FETCHING_DATA_SUCCESS,
        data,
    }
}

export function getDataFailure(){
    return {
        type: FETCHING_DATA_FAILURE
    }
}

export function getItemSuccess(item) {
    return {
        type: FETCHING_CATELOGY_ITEM,
        item
    }
}   

export function getFollowItem(item) {
    return {
        type: FETCHING_FOLLOW_ITEM,
        item
    }
}

export function getProfileSuccess(item) {
    return {
        type: FETCHING_PROFILE_SUCCESS,
        item
    }
}

export function sendFeedback (message) {
    return {
        type: SEND_FEEDBACK,
        message
    }
}

export function onSend() {
    return {
        type: ON_SEND_FEEDBACK
    }
}

export function getUserSuccess(item) {
    return {
        type: GET_PROFILE_SUCCESS,
        item
    }
}

export function onChangeFollowSuccess() {
    return {
        type: ON_CHANGE_FOLLOW
    }
}

export function getFollowDataSuccess(items) {
    return {
        type: GET_FOLLOW_DATA,
        items
    }   
}

export function fetchData (userID) {
    return (dispatch) => {
        dispatch(getData());
        getDataFireBase(userID, (data) => {
            if(data){
                getFollowData(data, userID, (items) => {
                    dispatch(getDataSuccess(data));
                    dispatch(getFollowDataSuccess(items))
                })
            } else {
                dispatch(getDataFailure());
                console.log(error);
            }
        });
    }
}

export function fetchAccessToken() {
    return (dispatch) => {
        dispatch(getAccessToken());
        getToken().then((accessToken) => {
            dispatch(getAccessTokenSuccess(accessToken));
            dispatch(getProfileData(accessToken.userID))
        }).catch((error) => {
            console.log(error);
        })
    }
}

export function getItemCatelogy(category){
    return (dispatch) => {
        getItem(category).then((item) => {
            dispatch(getItemSuccess(item));
        }).catch((error) => {
            console.log(error);
        })
    }
}

export function getFollowSuccess(userID) {
    return (dispatch) => {
        getFollowItemSuccess(userID, (item) => {
            dispatch(getFollowItem(item))
        })
    }
}

export function getProfileData(userID) {
    return (dispatch) => {
        getProfile(userID).then((data) => {
            dispatch(getProfileSuccess(data))
        }).catch((error) => {
            console.log(error)
        })
    }
}


export function sendFeedbackSuccess(userID, data) {
    return (dispatch) => {
        sendFeedbackData(userID, data).then((message) => {
            dispatch(sendFeedback(message))
        }).catch((error) => {
            console.log(error)
        })
    }
}


export function onSendFeedBack() {
    return (dispatch) => {
        dispatch(onSend());
    }
}

export function getProfileUserSuccess(userID) {
    return (dispatch) => {
        getProfileUser(userID).then((profileUser) => {
            dispatch(getUserSuccess(profileUser))
        }).catch((error) => {
            console.log(error);
        })
    }
}

export function onChangeFollow (bool, userID, key) {
    return (dispatch) => {
        onChangeFollowFB(bool, userID, key);
        dispatch(onChangeFollowSuccess());
    }
}

