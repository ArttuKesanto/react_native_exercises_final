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
import * as Speech from 'expo-speech';


function TextToSpeech() {
    const [input, setInput] = useState('Hello...');

    const speakTheInput = () => {
        Speech.speak(input)
    }

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
            borderColor: 'blue',
            width: 200,
            height: 50,
            borderWidth: 3,
        }
    });

    return (
        <SafeAreaView style={styles.main}>
            <View style={{alignItems: 'center'}}>
            <TextInput style={styles.input} onChangeText={(input) => setInput(input) } value={input}/>
            </View>
            <View style={{marginTop: 20}}>
            <Button color="#f194ff" onPress={() => speakTheInput()} title='Speak the inputted text'></Button>
            </View>
        </SafeAreaView>

    )
}
export default TextToSpeech;