import * as React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationRef } from './routeNavigations';

import ColorTheme from '../pages/color-theme';
import Type from '../pages/type';
import Login from '../pages/login';
import Car from '../pages/car';
import Register from '../pages/register';
import Home from '../pages/home';
import Ride from '../pages/ride';
import RideLocation from '../pages/ride-location';
import CodeConfirmation from '../pages/code-confirmation';

const Stack = createStackNavigator();

const Routes = () => (
  <NavigationContainer ref={navigationRef}>
    <Stack.Navigator initialRouteName="ColorTheme">
      <Stack.Screen
        options={{ headerShown: false }}
        name="ColorTheme"
        component={ColorTheme}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Type"
        component={Type}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Login"
        component={Login}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Car"
        component={Car}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="RideLocation"
        component={RideLocation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Register"
        component={Register}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="CodeConfirmation"
        component={CodeConfirmation}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Home"
        component={Home}
      />
      <Stack.Screen
        options={{ headerShown: false }}
        name="Ride"
        component={Ride}
      />
    </Stack.Navigator>
  </NavigationContainer>
);

export default Routes;
