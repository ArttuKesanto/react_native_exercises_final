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
import MapView, { Marker, PROVIDER_GOOGLE, MAP_TYPES } from "react-native-maps"; // Option/ALT + Shift + F - AUTO-FORMAT.

export default function GetAddress() {

    const styles = StyleSheet.create({
        main: {
            //flexDirection: 'row',
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',
            alignContent: 'center',
        },
        input: {
            borderColor: 'gold',
            height: 40,
            borderWidth: 3,
            //justifyContent: 'center',
            //alignContent: 'center',
            //alignItems: 'center',
        },
        tinyLogo: {
            width: 100,
            height: 100,
        },
        casesNumbers: {
            marginBottom: 10,
        }
    });

    const [coordinates, setCoordinates] = useState({ latitude: 0, longitude: 0 });
    const [address, setAddress] = useState('Marsinkuja 1, Finland');
    const [data, setData] = useState([]);
    const [title, setTitle] = useState('')
    const [ready, setReadyState] = useState(false);
    const url = ("https://www.mapquestapi.com/geocoding/v1/address?key=[YOUR KEY HERE.]&inFormat=kvp&outFormat=json&location=" + address + "&thumbMaps=false");
    const urlForRestaurant = ('https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=ravintola%20bar&inputtype=textquery&fields=' +
        'geometry,photos,formatted_address,name,opening_hours,rating&locationbias=circle:2000@' +
        coordinates.latitude + ','
        + coordinates.longitude +
        '&key=[YOUR KEY HERE.')
    const [markerData, setMarkerData] = useState([])

    const [region, setRegion] = useState({
        latitude: 60.34115,
        longitude: 25.09898,
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

    const setDataCoords = () => {
        //setCoordinates({ latitude: data.lat, longitude: data.lng });
        setRegion({/*...region,*/
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: 0.0322,
            longitudeDelta: 0.0221
        }
        );
    }

    // API-key needs to be inputted by the user.

    const fetchAddress = async () => { // Some issues here with rendering... Need to click 2-3 times for it to refresh...
        try {
            const response = await fetch(url);
            const json = await response.json();
            //setData(json.results[0].locations[0].latLng);
            setTitle(json.results[0].providedLocation.location);
            setCoordinates({ latitude: json.results[0].locations[0].latLng.lat, longitude: json.results[0].locations[0].latLng.lng });
            //setMarkerData(json2.candidates)
            //console.log(data)
            //setCoordinates({latitude: data.results.locations.latLng.lat, longitude: data.results.locations.latLng.lng})
            //Alert.alert('Data fetched - press the below button to map the coordinates.')
            setReadyState(false);
            //Alert.alert('Data fetched - press the below button to map the coordinates.')
        } catch (error) {
            setData([]);
            Alert.alert("Could not fetch the desired data...");
        }
        try {
            setMarkerData([])
            const response2 = await fetch(urlForRestaurant);
            const json2 = await response2.json();
            setMarkerData(json2.candidates)
            //setMarkerData(json2.candidates)
            //console.log(data)
            //setCoordinates({latitude: data.results.locations.latLng.lat, longitude: data.results.locations.latLng.lng})
            //Alert.alert('Data fetched - press the below button to map the coordinates.')
            setReadyState(true);
            //Alert.alert('Data fetched - press the below button to map the coordinates.')
        } catch (error) {
            setData([]);
            Alert.alert("Could not fetch the desired data...");
        }
        //
    }


    useEffect(() => {
        fetchAddress();
    }, [urlForRestaurant]) // When the second parameter changes, a re-render will happen. Need to keep it as the restaurant-url, so it will input new details.

    // Since {ready} is here, the code will jump here first to check this statement, that is why we get two console prints if console.log...
    // ... is located here.

    if (!ready) {
        return (
            <View style={styles.main}>
                <Text>Searching for the address or populating markers...</Text>
            </View>
        )
    }

    // Debugging.
    console.log(markerData)
    //console.log(markerData)
    //console.log(data)
    //console.log(data.lat)
    //console.log(data.lng)
    console.log(markerData[0].geometry.location.lat)
    console.log(markerData[0].geometry.location.lng)
    console.log(markerData[0].name)
    console.log(urlForRestaurant)
    //console.log(markerData)


    return (
        <>
            <SafeAreaView>
                <TextInput accessibilityHint='Search for an address' accessibilityRole='search' style={styles.input} onChangeText={(input => setAddress(input))} placeholder='Input an address...' />
                <Button onPress={() => { fetchAddress() }} title={'Search for a desired place'} />
            </SafeAreaView>
            <MapView
                style={styles.main}
                region={{ latitude: coordinates.latitude, longitude: coordinates.longitude, latitudeDelta: 0.0322, longitudeDelta: 0.0221, }}>
                {/*onRegionChange={getInitialState()*/}
                <Marker coordinate={{ // Possible to .map "push" all the items in a different function if multiple objects. This example... 
                    // ... uses the nearest restaurant as the marker, might need to zoom out a little. .map is in place for multiple markers.
                    latitude: coordinates.latitude,
                    longitude: coordinates.longitude
                }}
                    title={address}
                    description={'You searched for this specific address.'} />
                {markerData.map((item, index) => (
                    <Marker key={index} coordinate={{ latitude: item.geometry.location.lat, longitude: item.geometry.location.lng }} title={'Tunnus: ' + item.name}
                        description={item.formatted_address} />))}
            </MapView>
        </>
    )
}