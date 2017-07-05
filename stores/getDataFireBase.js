import { FireBase } from '../modules/firebase';

const FBSDK = require('react-native-fbsdk');

import _ from 'lodash';

const {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
} = FBSDK;


export function getDataFireBase (userID, callback) {
    let firebase = FireBase.database();
    let fireBaseUser = firebase.ref('content');
    let fireCategory = firebase.ref('category');
    fireBaseUser.on('value', (snap) => {
        let items = [],
            category = [];
        snap.forEach((data) => {
            items.push({
                key: data.key,
                data: data.val(),
            })
        });
        fireCategory.on('value', (snap)=> {
            snap.forEach((data) => {
                category.push({
                    key: data.key,
                    category: data.val()
                })
            });
        })
        let data = {
            data:  items,
            category: category
        }
        callback(data);
    })
}

export function getToken() {
    return new Promise((resolve, reject) => {
        AccessToken.getCurrentAccessToken().then((data) =>{
            if (data) {
                let token = data.accessToken;
                const responseInfoCallback = (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        let accessToken = {
                            accessToken: token,
                            userID: result.id,
                            image: result.picture.data.url,
                            name: result.name,
                            about: result.about,
                            email: result.email,
                            link: result.link,
                            location: result.location
                        }
                        return resolve(accessToken);
                    }
                }
                const infoRequest = new GraphRequest('/me',
                { 
                  accessToken: token,
                  parameters: {
                    fields: {
                      string: 'email,name,first_name,middle_name,last_name,picture,about,link,location'
                    }
                  }
                },responseInfoCallback);
                new GraphRequestManager().addRequest(infoRequest).start();
            } else {
                return resolve(-1);
            }
        },
        (error) => {
            return reject(error);
        });
    })
}

export function getItem(category) {
    return new Promise((resolve, reject) => {
        let firebaseCatelogy = FireBase.database().ref('content').orderByChild('category').equalTo(category);
        firebaseCatelogy.once('value').then((snap) => {
            let data = [];
            snap.forEach((child) => {
                data.push({
                    key: child.key,
                    items: child.val()
                })
            })
            let items = {
                items: data,
                category: category
            }

            return resolve(items)
        }).catch((error)=> {
            return reject(error);
        })
    })
}


export function getFollowItemSuccess (userID, callBack) {
    let fireBaseFollow = FireBase.database().ref('follow/' + userID);
    let firebaseCount = FireBase.database().ref('followContent');
    fireBaseFollow.on('value', (snap) => {
        let items = [];
        snap.forEach((data) => {
            items.push({
                key: Object.keys(data.val())[0],
                data: Object.values(data.val())[0]
            });
        })
        firebaseCount.on('value', (snapCount) => {
            _.forEach(items,  (data) => {
                let count = snapCount.child(data.key).numChildren();
                data.data['count'] = count;
                data.data['follow'] = true
            })
        })

        callBack(items);
    })

}

export function getProfile(userID){
    return new Promise((resolve, reject) => {
        let fireBasePosts = FireBase.database().ref('userPost/'+userID);
        let fbCountFollow = FireBase.database().ref('followContent');
        let fbFollower = FireBase.database().ref('userFollowers');
        let fbFollowing = FireBase.database().ref('userFollowing');
        Promise.all([
            fireBasePosts.once('value'),
            fbCountFollow.once('value'),
            fbFollower.once('value'),
            fbFollowing.once('value')
        ]).then((snaps) => {
            let items = [];
            snaps[0].forEach((data) => {
                let follow = snaps[1].child(data.key).numChildren();
                items.push({
                    key: data.key,
                    data: data.val(),   
                    countFollow: follow
                });
            });
            let countFollowers = snaps[2].child(userID).numChildren();
            let countFollowing = snaps[3].child(userID).numChildren();
            let data = {
                data: items,
                countFollowers: countFollowers,
                countFollowing: countFollowing,
                countPosts: snaps[0].numChildren()
            }
            return resolve(data);
        }).catch((error) => {
            return reject(error);
        })
    });
}

export function sendFeedbackData(userID, data) {
    
    return new Promise ((resolve, reject) => {
        let fbSendFeedback = FireBase.database().ref('feedback/' + userID);
        fbSendFeedback.push(data, (error) => {
            if (error) {
                return reject(error);
            }
            else {
                return resolve('Successfully.')
            }
        })
    })
    
}   


export function getProfileUser(userID) {
    return new  Promise ((resolve, reject) => {
        let fbProfileUser = FireBase.database().ref('users/'+ userID);
        let fireBasePosts = FireBase.database().ref('userPost/'+userID);
        let fbCountFollow = FireBase.database().ref('followContent');
        let fbFollower = FireBase.database().ref('userFollowers');
        let fbFollowing = FireBase.database().ref('userFollowing');
        Promise.all([
            fireBasePosts.once('value'),
            fbCountFollow.once('value'),
            fbFollower.once('value'),
            fbFollowing.once('value'),
            fbProfileUser.once('value')
        ]).then((snaps) => {
            let items = [];
            snaps[0].forEach((data) => {
                let follow = snaps[1].child(data.key).numChildren();
                items.push({
                    key: data.key,
                    data: data.val(),   
                    countFollow: follow
                });
            });
            let countFollowers = snaps[2].child(userID).numChildren();
            let countFollowing = snaps[3].child(userID).numChildren();
            let profileUser = snaps[4].val();

            let data = {
                data: items,
                countFollowers: countFollowers,
                countFollowing: countFollowing,
                countPosts: snaps[0].numChildren(),
                profileUser: profileUser
            }

            return resolve(data);
        }).catch ((error) => {
            return reject(error)
        }); 
    })
}

export function getFollowData(items, userID, callBack) {
    let fbFollowData = FireBase.database().ref('followContent');
    let fbFollow = FireBase.database().ref('follow/'+ userID);
    fbFollowData.on('value', (snap) => {
        let follow = [];
        fbFollow.on('value', (snapFollow) => {
            snapFollow.forEach((data) => {
                let key = Object.keys(data.val())[0];
                follow.push({
                    data: data.val(),
                    key: key
                })
            })
            _.forEach(items.data, (data) => {
                let count = snap.child(data.key).numChildren();
                let boolFollow = _.some(follow, {'key': data.key});
                if (boolFollow) {
                    data.data['follow'] = true
                } else {
                    data.data['follow'] = false
                }
                data.data['count'] = count;
            });
            callBack(items);
        })
    })
}


export function onChangeFollowFB(bool, userID, key) {
    if (bool) {
        FireBase.database().ref('followContent/' + key).push({userId: userID});
        let fbContent = FireBase.database().ref('content/' + key);
        fbContent.on('value', (snap) => {
            let temp = [];
            temp[key] = snap.val();
            FireBase.database().ref('follow/' + userID).push(temp);
        })
    } else if(!bool) {
        let fb =  FireBase.database().ref('followContent/' + key);
        let fbContent = FireBase.database().ref('follow/'+ userID);
        fbContent.once('value', (snap) => {
            snap.forEach((child) => {
                let keyContent = Object.keys(child.val())[0];
                if (keyContent === key) {
                    fbContent.child(child.key).set(null);
                }
            })
        })
        fb.once('value', (snap) => {
            snap.forEach((child) => {
                if (child.val().userId === userID) {
                    fb.child(child.key).set(null);
                }
            })
        })
    }
}