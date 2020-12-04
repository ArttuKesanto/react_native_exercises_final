import React, { useState, 
                useEffect } from 'react';
import { StyleSheet, 
    Text, 
    View, 
    Button,
    Alert, 
    TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function NumberGuessTheGame() {
    const[counter, setCounter] = useState(1); // Zero times guessed.
    const[answer, setAnswer] = useState(''); // The answer is empty at the start.
    const[number, setNumber] = useState(Math.floor(Math.random() * 100) + 1); // Sets the random number.
    const[text, setText] = useState('');

    const inputChanged = (e) => { // e meaning event. Overwrote this!
        setAnswer(e.target.value);
    };

    const styles = StyleSheet.create({ // For reference.
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

   // console.log(number);

    const makeAGuess = () => {
        console.log(number);
        console.log(counter);
        if (isNaN(answer) || answer.length <= 0) {
            Alert.alert('Only input numbers! This will not count as a try!');
            //setCounter(counter);
        } else{
        
        if (answer < number) {
            setText('Your guess is below the desired number.');
            if (counter === 0) {
                setCounter(1);
            } else {
            setCounter(counter + 1);
            }
        }
        else if (answer > number) {
            setText('Your guess is above the desired number.');
            setCounter(counter + 1);
            if (counter === 0) {
                setCounter(1);
            } else {
            setCounter(counter + 1);
            }
        }
        else {
            Alert.alert('You guessed the number in ' + counter + ' guesses! Well done, I presume!');
            setNumber(Math.floor(Math.random() * 100) + 1);
            setText('A new number has been randomized - guess again!')
            setCounter(1); // Predicts the next input to be a / THE first try.
        } }
    }

    return(
        <SafeAreaView styles={styles.main}> 
            <Text>Guess a random number between 1-100:</Text>
            <Text>{ text }</Text>
            {/*<TextInput keyboardType='numeric' style={{ width:135, borderColor: 'green', borderWidth: 1}} onChange = {inputChanged} value={answer}/>*/}
            <TextInput keyboardType='numeric' style={{ width:135, borderColor: 'green', borderWidth: 1}} onChangeText = {text => setAnswer(text)} value={answer} />
            <Button color="#f194ff" onPress={ () => makeAGuess() } title='Make a guess!'></Button>
        </SafeAreaView>
    )
}

export default NumberGuessTheGame;