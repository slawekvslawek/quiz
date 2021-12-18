import React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/Home'
import TestScreen from './screens/Test'
import ResultsScreen from './screens/Results'
import SplashScreen from 'react-native-splash-screen'
import {LogBox } from 'react-native'
LogBox.ignoreLogs(['Reanimated 2'])




const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const MyStack = () => {
    SplashScreen.hide();

    return (
        <NavigationContainer>
            <Drawer.Navigator initialRouteName="Home"
            screenOptions={{headerTitleAlign: 'center'}}>
                <Drawer.Screen name="Home" component={HomeScreen} />
                <Drawer.Screen name="Results" component={ResultsScreen} />
                <Drawer.Screen name="Test #1" component={TestScreen} />
                <Drawer.Screen name="Test #2" component={TestScreen} />
                <Drawer.Screen name="Test #3" component={TestScreen} />
                <Drawer.Screen name="Test #4" component={TestScreen} />
            </Drawer.Navigator>
        </NavigationContainer>
    );
};

export default MyStack;