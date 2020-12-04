import React,
{
    useState,
    useEffect
} from 'react';
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
import * as Contacts from 'expo-contacts';
//import * as SMS from 'expo-sms';

function ContactsList() {
    const [contactsList, setContactsList] = useState([]);

    // const { status } = awaitContacts.requestPermissionsAsync();

    const styles = StyleSheet.create({ // For reference.
        main: {
            //flexDirection: 'row',
            flex: 1,
            backgroundColor: '#fff',
            // alignItems: 'center',
            justifyContent: 'center',
        },
        main2: {
            //flexDirection: 'row',
            flex: 3,
            backgroundColor: '#fff',
            //alignItems: 'center',
            //justifyContent: 'center',
        },
        input: {
            borderColor: 'gold',
            width: 100,
            height: 50,
            borderWidth: 3,
        }
    });

    const getContacts = async () => {
        const { status } = await Contacts.requestPermissionsAsync();
        if (status === 'granted') {
            const { data } = await Contacts.getContactsAsync({
                fields:
                    [Contacts.Fields.Name,
                    Contacts.Fields.PhoneNumbers], // Adding both sections to the fields.
                //sort: Contacts.SortTypes.LastName,
                sort: Contacts.SortTypes.FirstName // Sorting by firstname-basis.
            });
            if (data.length > 0) {
                setContactsList(data);
                console.log(data[0].phoneNumbers[0].number)
                console.log(data[1])
            }
        }
    }

    const separatorComponent = () => {
        return (
            <View style={{ height: 10 }}></View>
        )
    }

    const showContacts = ({ item }) => {
        if (item.phoneNumbers) { // Checking if the phoneNumbers Array of Objects does exist. Otherwise undefined errors appear.
            //console.log(item.phoneNumbers[0])
            return (
                <View style={{ alignContent: 'center', justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                    <Text>
                        {item.phoneNumbers[0].number}
                    </Text>
                </View>
            )
        }
    }


    return (
        <SafeAreaView style={styles.main}>
            <Button color="#f194ff" onPress={() => getContacts()} title='Get contacts'></Button>

            <View style={styles.main2}>
                <FlatList
                    onEndReachedThreshold={0.5}
                    ItemSeparatorComponent={separatorComponent}
                    data={contactsList}
                    renderItem={showContacts}
                    keyExtractor={(_, index) => index.toString()} // first parameter not needed, just the index with a string-type.
                />

            </View>

        </SafeAreaView>

    )
}
export default ContactsList;