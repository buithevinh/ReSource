/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';

import Controller from './router/Controller';

import {
  AppRegistry,
} from 'react-native';

export default class Vipo extends React.Component {
    render() {
        return (
           <Controller />
        )
    }
}

AppRegistry.registerComponent('Vipo', () => Vipo);
