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
import * as Location from 'expo-location';

export default function GetInitialAddress() {


    const [address, setAddress] = useState('')
    const url = ("https://www.mapquestapi.com/geocoding/v1/address?key=[YOUR KEY HERE.]&inFormat=kvp&outFormat=json&location=" + address + "&thumbMaps=false");
    const [location, setLocation] = useState(null)
    const [title, setTitle] = useState('Your current location.')
    const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 })
    const [ready, setReadyState] = useState(false)
    const [region, setRegion] = useState({ // Not in use anymore.
        latitude: '',
        longitude: '',
        latitudeDelta: 0.0322,
        longitudeDelta: 0.0221,
    })

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

    const fetchNewAddress = async () => { // Some issues here with rendering... Need to click 2-3 times for it to refresh...
        try {
            const response = await fetch(url);
            const json = await response.json();
            //setData(json.results[0].locations[0].latLng);
            setTitle(json.results[0].providedLocation.location);
            setCoordinates({ lat: json.results[0].locations[0].latLng.lat, lng: json.results[0].locations[0].latLng.lng });
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
    }

    const fetchAddress = async () => { // Some issues here with rendering... Need to click 2-3 times for it to refresh...
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('No permission to access your device location...');
        } else {
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
            setCoordinates({ lat: location.coords.latitude, lng: location.coords.longitude })
        }
        setReadyState(true);
        //Alert.alert('Data fetched - press the below button to map the coordinates.')
        //
    }

    useEffect(() => {
        fetchAddress();
    }, [])

    // Since {ready} is here, the code will jump here first to check this statement, that is why we get two console prints if console.log...
    // ... is located here.

    if (!ready) {
        return (
            <View style={styles.main}>
                <Text>Searching for the address or populating markers...</Text>
            </View>
        )
    }

    console.log(location)
    console.log(coordinates)
    return (
        <>
            <SafeAreaView>
                <TextInput accessibilityHint='Search for an address' accessibilityRole='search' style={styles.input} onChangeText={(input => setAddress(input))} placeholder='Input an address...' />
                <Button onPress={() => { fetchNewAddress() }} title={'Search for a desired place'} />
            </SafeAreaView>
            <MapView
                style={styles.main}
                region={{ latitude: coordinates.lat, longitude: coordinates.lng, latitudeDelta: 0.0322, longitudeDelta: 0.0221, }}>
                {/*onRegionChange={getInitialState()}*/}
                <Marker coordinate={{ // Possible to .map "push" all the items in a different function if multiple objects. This example... 
                    // ... uses the nearest restaurant as the marker, might need to zoom out a little.
                    latitude: coordinates.lat,
                    longitude: coordinates.lng
                }}
                    title={title}
                    description={'Coordinates: ' + coordinates.lat + ', ' + coordinates.lng} />
            </MapView>
        </>
    )
}