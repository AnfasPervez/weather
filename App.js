import React, { Component } from 'react';
import { StyleSheet, ScrollView,Text, View, TextInputComponent ,AppRegistry} from 'react-native';
import {TextInput,List,Card} from 'react-native-paper';
import SearchScreen from './components/SearchScreen'
import HomeScreen from './components/HomeScreen';
import {createAppContainer} from 'react-navigation'
import { createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons';



const TabNavigator=createBottomTabNavigator({
  "current city":HomeScreen,
  "select city":SearchScreen,
},
{
  defaultNavigationOptions:({navigation})=>({
    tabBarIcon:({ focused,tintColor})=>{
      const {routeName}= navigation.state;
      let IconComponent=Ionicons;
      let iconName;
      if(routeName==='current city'){
        iconName=`md-cloud`
      }
      else if(routeName==='select city'){
        iconName=`md-options`
      }
      return <IconComponent name={iconName} size={25} color={tintColor}/>
    },
  }),
  tabBarOptions:{
    activeTintColor:'white',
    inactiveTintColor:'gray',
    activeBackgroundColor:"#6200ee",
        inactiveBackgroundColor: "#6200ee"

  },
});
export default createAppContainer(TabNavigator);
