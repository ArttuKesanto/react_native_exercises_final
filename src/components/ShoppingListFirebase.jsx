import React,
{ useState, useEffect } from 'react';
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
import * as firebase from 'firebase';

function ShoppingListWithFirebase() {
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList] = useState([]);

    const firebaseConfig = {
        apiKey: "[YOUR CREDENTIALS HERE.]",
        authDomain: "[YOUR CREDENTIALS HERE.]",
        databaseURL: "[YOUR CREDENTIALS HERE.]",
        projectId: "[YOUR CREDENTIALS HERE.]",
        storageBucket: "[YOUR CREDENTIALS HERE.]",
        messagingSenderId: "[YOUR CREDENTIALS HERE.]",
        appId: "[YOUR CREDENTIALS HERE.]",
        measurementId: "[YOUR CREDENTIALS HERE.]"
    };

    if (!firebase.apps.length) { // No need to init the Firebase DB twice, and cannot, since there is an Error if duplicates are made.
        firebase.initializeApp(firebaseConfig);
  }

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

    const saveItem = () => {
        firebase.database().ref('items/').push({ // Pushing the items to the database.
            'product': item, 'amount': amount
        });
    }

    useEffect(() => { // Updates the list.
        firebase.database().ref('items/').on('value', snapshot => {
            const data = snapshot.val();
            const prods = Object.values(data);
            setShoppingList(prods);
        });
    }, []);



    return (
        <SafeAreaView style={styles.main}>

            <TextInput style={{ width: 135, borderColor: 'green', borderWidth: 1 }} onChangeText={text => setItem(text)} value={item} placeholder='Input the item name...' />
            <TextInput style={{ width: 135, borderColor: 'green', borderWidth: 1 }} onChangeText={text => setAmount(text)} value={amount} placeholder='Input the amount...' />
            {/* <TextInput style={{ width:135, borderColor: 'green', borderWidth: 1}} onChange = {event => setItem({item: event.target.value})} value={item}/> */}
            <Button color="#f194ff" onPress={() => saveItem()} title='Add to the list!'></Button>

            <View style={styles.main2}>
                <FlatList
                    data={shoppingList}
                    renderItem={({ item }) =>
                        <View>
                            <Text> {item.product}, {item.amount}</Text>
                        </View>}
                    keyExtractor={(_, index) => index.toString()} // first parameter not needed, just the index with a string-type.
                />

            </View>

        </SafeAreaView>

    )
}

export default ShoppingListWithFirebase;