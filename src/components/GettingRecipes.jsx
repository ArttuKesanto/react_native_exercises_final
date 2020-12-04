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
  FlatList
} from 'react-native';
import {
  NavigationContainer,
  StackActions
} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function FetchRecipes() {

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
    }
  });

  const url = 'http://www.recipepuppy.com/api/?i=';
  const [isReady, setReadyState] = useState(false);
  const [input, setInput] = useState('cheese');
  const [data, setData] = useState([]);

  const mockUpData = [{
    "title": "Stringy Chicken Nuggets \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n",
    "href": "http:\/\/www.kraftfoods.com\/kf\/recipes\/stringy-chicken-nuggets-53567.aspx", "ingredients": "chicken, cheese",
    "thumbnail": "http:\/\/img.recipepuppy.com\/627220.jpg", "id": 1
  },
  {
    "title": "Quick Taco Quesadillas \r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\t\r\n\t\r\n\t\r\n\r\n",
    "href": "http:\/\/www.kraftfoods.com\/kf\/recipes\/quick-taco-quesadillas-50996.aspx",
    "ingredients": "ground beef, cheese", "thumbnail": "http:\/\/img.recipepuppy.com\/630067.jpg", "id": 2
  }
  ]
  // const [thumbnail, setThumbnail] = useState('');
  // console.log(mockUpData);

  /*app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  }); DEBUGGING. */

  const fetchRecipes = async () => {
    try {
      const response = await fetch(url + input);
      const json = await response.json();
      setData(json.results);
      setReadyState(true);
      //alert('LOL');
    } catch (error) {
      setData([]);
      Alert.alert("Could not fetch recipes...");
    }
  };
  //useEffect: kun komponentti on latautunut -> Suoritetaan.
  useEffect(() => {
    fetchRecipes();
  }, []); // Hakasulkeiden sisään voi laittaa mitä vaan, jotta voidaan muuttujaa käsitellä, jos state-muuttuu. Parametriton.

  console.log(data);
  //console.log(mockUpData);

  if (!isReady) { // Returns the waiting text if the list is not ready.
    return (
      <View style={styles.main}>
        <Text>Loading the list of recipes...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.main}>
      <Text>Recipes</Text>
      <FlatList data={data} renderItem=
        {({ item }) =>
          <View>
            <Text> {item.title} </Text>
            <Image source={{ uri: item.thumbnail }} style={styles.tinyLogo} />
          </View>}
        keyExtractor={(_, index) => index.toString() // Possible to imply with "_" that the first paramter is not needed / not used / something is private as in do not touch this, only inside the Class etc.
        }
      />
      <View style={{ justifyContent: 'center' }}>
        <TextInput style={styles.input} onChangeText={input => setInput(input)} value={input} />
        <Button color="#f194ff" onPress={() => fetchRecipes()} title='Fetch recipes with the desired keyword.'></Button>
      </View>

    </SafeAreaView>
  )
}