import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen';
import UserListScreen from '../screens/UsersScreen';

const Stack = createStackNavigator();
const BottomStack = createBottomTabNavigator()

const Navigation = () => (
  <NavigationContainer>
    <BottomStack.Navigator initialRouteName="Home">
      <BottomStack.Screen name="Home" component={HomeScreen} />
      <BottomStack.Screen name="Users" component={UserListScreen} />
    </BottomStack.Navigator>
  </NavigationContainer>
);

export default Navigation;
