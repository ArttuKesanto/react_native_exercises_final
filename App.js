import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  SafeAreaView
} from 'react-native';
import {
  NavigationContainer,
  StackActions
} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import CalculatorExample from './src/components/CalculatorExample';
import NumberGuessTheGame from './src/components/GuessTheNumber';
import ShoppingList from './src/components/ShoppingList';
import CalculatorHistory from './src/components/History';
import FetchRecipes from './src/components/GettingRecipes';
import EuroConverter from './src/components/EuroConverter';
import GetAddress from './src/components/GetAddress'
import GetInitialAddress from './src/components/GetInitialAddress'
import ShoppingListWithDB from './src/components/ShoppingListWithDB';
import ShoppingListWithFirebase from './src/components/ShoppingListFirebase';
import Contacts from './src/components/Contacts';
import TextToSpeech from './src/components/TextToSpeech';
import AddressBook from './src/components/AddressBook';
import GetAddressFromBook from './src/components/AddressBookMap';

export default function App() {


  const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();


  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'The Number Game') {
              iconName = 'md-home';
            } else if (route.name === 'Calculator Example') {
              iconName = 'md-settings';
            } else if (route.name === 'The Shopping List') {
              iconName = 'md-help-circle';
            } else if (route.name === 'History') {
              iconName = 'md-settings';
            } else if (route.name === 'Recipes') {
              iconName = 'md-help-circle';
            } else if (route.name === 'Currency Converter') {
              iconName = 'md-help-circle';
            } else if (route.name === 'Map') {
              iconName = 'md-map';
            } else if (route.name === 'Map2') {
              iconName = 'md-map';
            } else if (route.name === 'DB - Shopping list') {
              iconName = 'md-map';
            } else if (route.name === 'Firebase') {
              iconName = 'md-map';
            } else if (route.name === 'Contacts') {
              iconName = 'md-map';
            } else if (route.name === 'Text To Speech') {
              iconName = 'md-text';
            } else if (route.name === 'My Places') {
              iconName = 'md-text';
            } else if (route.name === 'Places On Map') {
              iconName = 'md-map';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}>
        <Tab.Screen name="Calculator Example" component={CalculatorExample} />
        <Tab.Screen name="The Number Game" component={NumberGuessTheGame} />
        <Tab.Screen name="The Shopping List" component={ShoppingList} />
        <Tab.Screen name="History" component={CalculatorHistory} />
        <Tab.Screen name="Recipes" component={FetchRecipes} />
        <Tab.Screen name="Currency Converter" component={EuroConverter} />
        <Tab.Screen name="Map" component={GetInitialAddress} />
        <Tab.Screen name="Map2" component={GetAddress} />
        <Tab.Screen name="DB - Shopping list" component={ShoppingListWithDB} />
        <Tab.Screen name="Firebase" component={ShoppingListWithFirebase} />
        <Tab.Screen name="Contacts" component={Contacts} />
        <Tab.Screen name="Text To Speech" component={TextToSpeech} />
        <Tab.Screen name="My Places" component={AddressBook} />
        <Tab.Screen name="Places On Map" component={GetAddressFromBook} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

/* <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
    </View> */