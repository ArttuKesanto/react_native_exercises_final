import  React, 
        {useState} from 'react';
import { StyleSheet, 
        Text, 
        View, 
        TextInput, 
        FlatList } from 'react-native';
import { NavigationContainer, 
        StackActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Header, 
    Icon, 
    Input, 
    Button, 
    ListItem } from 'react-native-elements';

function ShoppingList() {
    const [item, setItem] = useState('');
    const [shoppingList, setShoppingList] = useState([]);

    const styles = StyleSheet.create({ // For reference.
        main: {
          //flexDirection: 'row',
          flex: 1,
          backgroundColor: '#fff',
          alignItems: 'center',
          justifyContent: 'center',
        },
        main2: {
            //flexDirection: 'row',
            flex: 3,
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


    {/*const inputChanged = (e) => {
        setItem(e.target.value);
    } */}

    const buttonPressed= () => {
        setShoppingList([...shoppingList, {grocery: item}]); // Could be key. Should be key for React-Native?
        setItem('');
    };

    const clearTheList = () => {
        setShoppingList([]);
    };



    return (
        <SafeAreaView style = {styles.main}>
            <Header 
                leftComponent={{ icon:'menu', color: '#fff' }}
                centerComponent={{ text:'SHOPPING LIST', style: { color: '#fff' } }}
                rightComponent={{ icon:'home', color:'#fff  ' }}/>
            <TextInput style={{ width:135, borderColor: 'green', borderWidth: 1}} onChangeText = {text => setItem(text)} value={item}/>
            {/* <TextInput style={{ width:135, borderColor: 'green', borderWidth: 1}} onChange = {event => setItem({item: event.target.value})} value={item}/> */}
            <Button color="#f194ff" onPress={ () => buttonPressed() } title='Add to the list!'></Button>
            <Button color="#f194ff" onPress={ () => clearTheList() } title='Clear the list!'></Button>

            <View style = {styles.main2}>
            <FlatList 
            keyExtractor={(_, index) => index.toString()} // "_" indicating that the first parameter is not needed, deprecated in a sense.
            data = {shoppingList} 
            renderItem={({item}) => 
            <Text> {item.grocery} 
            </Text >}/>
            </View>

        </SafeAreaView>

    )
}

export default ShoppingList;