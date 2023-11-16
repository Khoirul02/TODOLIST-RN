/* eslint-disable prettier/prettier */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Formulir from '../screens/Formulir';
import Detail from '../screens/Detail';
const initStack = createNativeStackNavigator();
export default function RouteManager() {
  return (
    <NavigationContainer>
      <initStack.Navigator
        screenOptions={{
          headerShown: false,
        }}>
        <initStack.Screen
          name="Splash"
          component={Splash}
          options={{headerShown: false}}
        />
        <initStack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <initStack.Screen
          name="Formulir"
          component={Formulir}
          options={{headerShown: false}}
        />
        <initStack.Screen
          name="Detail"
          component={Detail}
          options={{headerShown: false}}
        />
      </initStack.Navigator>
    </NavigationContainer>
  );
}
