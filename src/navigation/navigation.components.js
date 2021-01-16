import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import  HomeScreen  from '../components/Home.component'
import  DetailsScreen  from '../components/Details.component'
import FavorisScreen from '../components/FavorisScreen'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const stackNav = createStackNavigator();
const Tab = createBottomTabNavigator();

const HomeNavigator = () => (
  <stackNav.Navigator headerMode='none'>
    <stackNav.Screen name='Home' component={HomeScreen}/>
    <stackNav.Screen name='Details' component={DetailsScreen}/>
  </stackNav.Navigator>
);

export const AppNavigator = () => (
  <NavigationContainer>
   <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeNavigator} />
        <Tab.Screen name="Watched" component={FavorisScreen} />
      </Tab.Navigator>
  </NavigationContainer>
);
