import React,
{ useState, useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Button,
    TextInput,
    Image,
    Alert,
    Picker,
    Container,
    FlatList
} from 'react-native';
import {
    NavigationContainer,
    StackActions
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function EuroConverter() {

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
            justifyContent: 'center',
            alignContent: 'center',
        },
        tinyLogo: {
            width: 100,
            height: 100,
        },
        casesNumbers: {
            marginBottom: 10,
        }
    });

    const url = 'http://data.fixer.io/api/latest?access_key=312eb4d2e0611ec6c9f75cfdd41c9f80';
    const [isReady, setReadyState] = useState(false);
    const [input, setInput] = useState(0);
    const [data, setData] = useState();
    const [result, setResult] = useState('');
    const [value, setValue] = useState(0);


    const fetchGlobalCorInfo = async () => {
        try {
            const response = await fetch(url);
            const json = await response.json();
            setData(json);
            setReadyState(true);
            //alert('LOL');
        } catch (error) {
            setData([]);
            Alert.alert("Could not fetch the desired data...");
        }
    };
    //useEffect: kun komponentti on latautunut -> Suoritetaan.
    useEffect(() => {
        fetchGlobalCorInfo();
    }, []); // Hakasulkeiden sisään voi laittaa mitä vaan, jotta voidaan muuttujaa käsitellä, jos state-muuttuu. Parametriton.

    //console.log(data);
    //console.log(mockUpData);

    if (!isReady) { // Returns the waiting text if the list is not ready.
        return (
            <View style={styles.main}>
                <Text>Populating the Picker...</Text>
            </View>
        );
    }

    //console.log(data); DEBUGGING.

    //const dataList = [Object.keys(data.rates)];

    //console.log(dataList)

    //Object.keys(data.rates).map( (k) => {console.log(data.rates[k])} );

    let pickerPopulated = Object.keys(data.rates).map((mapped, index) => {
        return (
            <Picker.Item label={mapped} value={data.rates[mapped]} key={index} />
        )
    });

    //console.log(pickerPopulated())

    const calculate = () => {
        return (
            setResult(((input) * (value)).toFixed(2))
        )
    }

    return (
        <View style={styles.main}>
            <Button style={{ borderWidth: 2, borderColor: 'gold' }} title={'Convert'} onPress={() => calculate()} />
            <Image source={{ uri: 'https://www.fleur-de-coin.com/images/eurocoins/euro-coins-version-ii.jpg' }} style={styles.tinyLogo} />
            <Text>{result} €</Text>
            <Text> Current conversation rate: {value}</Text>
            <TextInput onChangeText={(input) => setInput(input)} placeholder='Input an amount...' />
            <View>
                <Picker
                    selectedValue={value}
                    style={{ height: 50, width: 70, marginTop: 20 }}
                    onValueChange={(value, _) => setValue(value)} // Index not needed, thus '_'.
                >
                    {pickerPopulated}
                </Picker>
            </View>
        </View >
    )
}