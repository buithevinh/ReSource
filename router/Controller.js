import React, { Component } from 'react';
import {
  Navigator
} from 'react-native';


import {Scene, Router, ActionConst, Actions} from 'react-native-router-flux';

import Login from '../component/Login';
import News from '../component/News';
import App from '../component/App';
import Item from '../component/Item';
import ProfileUser from '../component/ProfileUser';
import ShowListItem from '../component/ShowListItem';
import Category from '../component/Category';
import Follow from '../component/Follow';
import FeedBack from '../component/FeedBack';
import Contact from '../component/Contact';
import Profile from '../component/Profile';



import SplashScreen from 'react-native-smart-splash-screen';

import { Provider } from 'react-redux';
import storeData from '../stores/storeData';

const store = storeData();



export default class Controller extends Component {
  constructor() {
    super();
  }

  componentWillMount(){
   
    SplashScreen.close({
      animationType: SplashScreen.animationType.scale,
      duration: 850,
      delay: 500,
    });
  }

  render() {
      return (            
        <Provider store = {store}>
          <Router>
            <Scene key="root">
              <Scene key="app" type={ActionConst.RESET} direction="vertical" component={App} title="App"  hideNavBar={true} initial/>
              <Scene key="login" type={ActionConst.RESET} component={Login} title="Login"  hideNavBar={true}/>
              <Scene key="news"  type={ActionConst.RESET} component={News} title="News"  hideNavBar={true}/>
              <Scene key="item" component={Item} title="Item"  hideNavBar={true}/>
              <Scene key="profileUser" component={ProfileUser} title="ProfileUser"  hideNavBar={true}/>
              <Scene key="show" component={ShowListItem} title="ListItem"  hideNavBar={true}/>
              <Scene key="category" component={Category} title="Category"  hideNavBar={true}/>
              <Scene key="follow" component={Follow} title="Follow"  hideNavBar={true}/>
              <Scene key="feedback" component={FeedBack} title="FeedBack"  hideNavBar={true}/>
              <Scene key="contact" component={Contact} title="Contact"  hideNavBar={true}/>
              <Scene key="profile" component={Profile} title="Profile"  hideNavBar={true}/>
            </Scene>
          </Router>
        </Provider>
      );
  }
}