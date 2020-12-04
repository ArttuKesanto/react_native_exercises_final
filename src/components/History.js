import React,
{ useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList
} from 'react-native';
import {
  NavigationContainer,
  StackActions
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CalculatorHistory({ route, navigation: { goBack } }) {
  const { data } = route.params;

  const styles = StyleSheet.create({
    main: {
      //flexDirection: 'row',
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    input: {
      borderColor: 'gold',
      width: 100,
      height: 50,
      borderWidth: 3,
    }
  });

  return (
    <SafeAreaView style={styles.main}>
      <Text>History</Text>
      <FlatList data={data} renderItem=
        {({ item }) => <Text> {item} </Text >} />
      <View style={{ padding: '1%' }}>
        <Button color="#f194ff" onPress={() => goBack()} title='Go back to the previous page ->'></Button>
      </View>

    </SafeAreaView>
  )
}