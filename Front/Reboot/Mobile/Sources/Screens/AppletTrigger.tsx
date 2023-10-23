import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, TextInput, Image} from 'react-native';
import NavBar from '../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { SearchBar, colors } from 'react-native-elements';
import { apiGET, apiPOST } from '../Components/apiHelper';
// import { Image } from 'react-native-svg';
// import CreateApplet from './CreateAppletScreen';

const { width } = Dimensions.get('window');

type CreateYourAppletProps = {
    navigation: NavigationProp<Record<string, object>>;
    route: any;
};

let id: string = "0";
let code: string = "0";

function CreateYourAppletScreen({ navigation, route }: CreateYourAppletProps) {
    const [services, setServices] = useState<any[]>([]);

    type ServiceImageKeys = 'instagram' | 'discord' | 'gmail'; // Add more keys as necessary

    const serviceImages: Record<ServiceImageKeys, any> = {
        instagram: require('./../../assets/instagram.png'),
        discord: require('./../../assets/discord.png'),
        gmail: require('./../../assets/gmail.png'),
        // Add more services here...
    };
      

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await apiGET('/actrig/getservices');
                setServices(data);
            } catch (error) {
                console.error('Error fetching services:', error);
            }
        };
    
        fetchData();
    }, []);

    const boxes = ['Automatically save public track by artist you follow', 'Automatically sync your Soundcloud likes to your Spotify', 'Automatically create a Disciver Weekly archive'];

    const [searchQuery, setSearchQuery] = useState('');

    const updateSearch = (search: string) => {
      setSearchQuery(search);
    };

    const handlePress = (source: any, title: string, color: string, description: string) => {
        navigation.navigate('Detail', {
          source: source,
          title: title,
          color: color,
          description: description
        });
      };
  
      return (
        <View style={styles.container}>
            {services.length > 0 && (
                <Text style={styles.title}>If This</Text>
            )}
            <View style={styles.searchbarcontainer}>
                <TextInput style={styles.searchbar} placeholder="Search" value={searchQuery} onChangeText={updateSearch}></TextInput>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.row}>
                    {services.map(service => (
                        <TouchableOpacity 
                            key={service.id} 
                            style={[styles.box, {backgroundColor: service.color}]}
                            onPress={() => handlePress(
                                serviceImages[service.name.toLowerCase() as ServiceImageKeys],
                                service.name, 
                                service.color, 
                                service.description
                            )}
                        >
                            <Image source={{ uri: service.logo }} style={styles.icon} />
                            <Text style={styles.boxText}>{service.name}</Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </ScrollView>
            {/* <NavBar id={id} code={code} index={3} navigation={navigation} /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1,

    },
    scrollContainer: {
    },
    title: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    inputContainer: {
        backgroundColor: '#EDEDED',  // Light gray background for the input
        borderRadius: 15,  // Rounded corners
    },
    searchbarcontainer: {
        width: "90%",
        height: 50,
        borderRadius: 50,
        backgroundColor: "#fff",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000000",
        shadowOffset: {width: -2, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginLeft: "5%",
    },
    searchbar: {
        width: "90%",
        height: "100%",
        marginLeft: "5%",
        alignItems: "center",
        fontSize: 20,
        fontWeight: "bold",
        color: "#6B6B6B"
    },
    box: {
        width: width * 0.45,
        height: 165,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        borderRadius: 10,
        marginVertical: 10,
        margin: "2.5%",
    },
    icon: {
        width: 40,
        height: 40,
    },
    boxText: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white'
    },
    row: {
        flexDirection: 'row',
        flexWrap: 'wrap',
      },
});

export default CreateYourAppletScreen;