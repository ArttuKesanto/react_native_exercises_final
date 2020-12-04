import React,
{
    useState,
    useEffect
} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    FlatList
} from 'react-native';
import {
    NavigationContainer,
    StackActions
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
    Header,
    Icon,
    Input,
    Button,
    ListItem
} from 'react-native-elements';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as SQLite from 'expo-sqlite';

function ShoppingListWithDB() {
    const [item, setItem] = useState('');
    const [amount, setAmount] = useState('');
    const [shoppingList, setShoppingList] = useState([]);

    const db = SQLite.openDatabase('shoppingDB.db');

    const styles = StyleSheet.create({ // For reference.
        main: {
            //flexDirection: 'row',
            flex: 1,
            backgroundColor: '#fff',
            //alignItems: 'center',
            justifyContent: 'center',
        },
        main2: {
            //flexDirection: 'row',
            flex: 3,
            backgroundColor: '#fff',
            //alignItems: 'center',
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

    useEffect(() => { // Creates the table if it does not exist.
        db.transaction(tx => {
            tx.executeSql(
                'create table if not exists shopList(id integer primary key not null, title text, amount text);');
        },
            null, updateList);
    }, []);

    const saveItemToList = () => { // Saves items to the SQL list by specified parameters.
        db.transaction(tx => {
            tx.executeSql('insert into shopList(title, amount) values (?,?);',
                [item, amount]);
        },
            null,
            updateList,
        )
        setItem('');
        setAmount('');
    }

    const updateList = () => { // Updates the list by getting all the rows from the database.
        db.transaction(tx => {
            tx.executeSql('select * from shopList;', [], (_, { rows }) => setShoppingList(rows._array));
        });
    }

    const deleteItem = (id) => { // Deletes item by its ID.
        db.transaction(tx => {
            tx.executeSql(`delete from shopList where id = ?;`, [id]);
        }, null, updateList)
    }

    const clearTheList = () => {
        db.transaction(tx => {
            tx.executeSql("delete from shopList;") // Deletes all items from the databse, all rows.
        }, null, updateList)
    };

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => {
        return(
            <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.title}
                </ListItem.Title>
                <View style={{marginLeft:'auto'}}>
                <Text style={{fontStyle:'italic'}} onPress={() => deleteItem(item.id)}>Bought</Text>
                </View>
                <ListItem.Subtitle style={{fontSize:17, fontStyle:'italic'}}>{item.amount}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>)
    }

    return (
        <SafeAreaView style={styles.main}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }} />
            <View style={{ height: 20 }}></View>
            <Input label='Product' onChangeText={text => setItem(text)} value={item} placeholder='Input the item name...' />
            <Input label='Amount' onChangeText={text => setAmount(text)} value={amount} placeholder='Input the amount...' />
            {/* <TextInput style={{ width:135, borderColor: 'green', borderWidth: 1}} onChange = {event => setItem({item: event.target.value})} value={item}/> */}
            <View style={{ height: 20 }}></View>
            <Button color="#f194ff" onPress={() => saveItemToList()} title='Add to the list!'></Button>
            <View style={{ height: 20 }}></View>
            <Button color="#f194ff" onPress={() => clearTheList()} title='Clear the list!'></Button>
            <View style={{ height: 20 }}></View>

            <View style={styles.main2}>
                <FlatList
                    keyExtractor={keyExtractor}
                    data={shoppingList}
                    renderItem={renderItem} // Each item in the SQL-DB has an ID, could use it here instead of the second parameter index.
                />

            </View>

        </SafeAreaView>

    )
}

export default ShoppingListWithDB;