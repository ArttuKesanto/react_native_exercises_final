import  React, 
        {useState} from 'react';
import { StyleSheet, 
        Text, 
        View, 
        Button, 
        TextInput, 
        FlatList } from 'react-native';
import { NavigationContainer, 
        StackActions } from '@react-navigation/native';
import { createStackNavigator} from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';
// import CalculatorHistory from './History';

export default function CalculatorExample({ navigation }) {
    // const Stack = createStackNavigator();

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

    const[numbers, setNumbers] = useState({
        num1: '',
        num2: ''
    });
    const[answer, setAnswer] = useState(0);
    const[history, setHistory] = useState(['123','testing']);
    const[answerReal, setAnswerReal] = useState(''); // Trying to get rid of the first answer that is ZERO.
    

    const sum = () => {
        //setAnswer(null);
        //setAnswerReal(setAnswer(parseInt(numbers.num1) + parseInt(numbers.num2)));
        setAnswer(parseInt(numbers.num1) + parseInt(numbers.num2));
        setHistory([...history, numbers.num1 + ' + ' + numbers.num2 + ' = ' + answer]);
    }
    const subst = () => {
        setAnswer(numbers.num1 - numbers.num2);
        setHistory([...history, numbers.num1 + ' - ' + numbers.num2 + ' = ' + answer]);
    }
    const times = () => {
        setAnswer(numbers.num1 * numbers.num2);
        setHistory([...history, numbers.num1 + ' * ' + numbers.num2 + ' = ' + answer]);
    }
    const divide = () => {
        setAnswer(numbers.num1 / numbers.num2);
        setHistory([...history, numbers.num1 + ' / ' + numbers.num2 + ' = ' + answer.toFixed(2)]);
    }

    {/*const inputChanged = (event) => {
        setNumbers({...numbers, [event.target.name]: event.target.value}); THERE IS ALWAYS TEXT IN AN onChangeText! No value needed?
    }; */}

    return(
        <SafeAreaView style={styles.main}>
            <Text>Calculator for YOU</Text>
            <Text>{answer}</Text>
            <View style = {{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput keyboardType='numeric' style={styles.input} name ='num1' onChangeText = {text => setNumbers({...numbers, num1: text })} value={numbers.num1}/> 
            <TextInput keyboardType='numeric' style={styles.input} name ='num2' onChangeText = {text => setNumbers({...numbers, num2: text })} value={numbers.num2}/>
            </View>
            {/*<TextInput keyboardType='numeric' style={styles.input} onChange = {inputChanged} name='num2' value={numbers.num2}/>*/}
                {/* <TextInput
                onChange={(event) =>
                this.setState({numbers: {...this.state.numbers,
                title: event.nativeEvent.text}}
                )}
                value={this.state.numbers.num1}
                /> */}
            <View style={{flex: 1,  flexDirection: 'row  ',  alignItems: 'center', justifyContent: 'space-around'}}>
            <Button color='#007AFF' title="+ Add" onPress={() => sum()}></Button>
            <Button color='#007AFF' title="- Minus" onPress={() => subst()}></Button>
            <Button color='#007AFF' title="* Multiply" onPress={() => times()}></Button>
            <Button color='#007AFF' title="/ Divide" onPress={() => divide()}></Button>
            </View>
            <View>
            <Button color='#007AFF' onPress={() => navigation.navigate('History', {data: history})} title='History' />
            </View>
            <Text>Constantly updated history</Text>
                    <FlatList data={ history } renderItem=
                    { ({item}) => <Text>{item}</Text > } /> 
        </SafeAreaView>
    )
}