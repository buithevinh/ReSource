
import  firebase from 'firebase';
let config = {
    apiKey: "AIzaSyCe-5Rq4ruIByFAHjrNk5z4HoBBSJsJ2cw",
    authDomain: "vipo-92a5a.firebaseapp.com",
    databaseURL: "https://vipo-92a5a.firebaseio.com/"
  };

export const FireBase = new firebase.initializeApp(config); 
export var provider = new firebase.auth.FacebookAuthProvider();
