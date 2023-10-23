import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView } from 'react-native';
import NavBar from './../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
// import CreateApplet from './CreateAppletScreen';


const { width } = Dimensions.get('window');

type HomeScreenProps = {
    navigation: NavigationProp<Record<string, object>>;
    route: any;  // Add this
  };
  

let id: string = "0";
let code: string = "0";

function HomeScreen({ navigation, route }: HomeScreenProps) {
    const apiData = route.params?.apiData;
    const boxes = ['Automatically save public track by artist you follow', 'Automatically sync your Soundcloud likes to your Spotify', 'Automatically create a Disciver Weekly archive'];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Let's start </Text>
                <Text style={styles.description}>This is a small description.</Text>
                {boxes.map((boxText, index) => (
                    <TouchableOpacity key={index} onPress={() => (navigation.navigate("CreateApplet", { id: index.toString(), code: boxText }), id = index.toString(), code = boxText)}>
                        <View key={index} style={styles.box}>
                            <Text style={styles.boxText}>{boxText}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.applets}>Create yours Applets</Text>
                </TouchableOpacity>
            </ScrollView>
            <NavBar id={id} code={code} index={1} navigation={navigation} apiData={apiData} />
        </SafeAreaView>
    );
}

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
    boxText: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white'
    },
    description: {
        fontSize: 16,
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    box: {
        width: width * 0.9,
        height: 200,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'white',
        // borderWidth: 1,
        borderRadius: 10,
        marginVertical: 10,
        margin: "5%",
        backgroundColor: 'rgb(29, 185, 84)',
    },
    button: {
        backgroundColor: '#2b2727',
        width: width * 0.9,
        height: 75,
        alignItems: 'center',
        borderRadius: 50,
        marginVertical: 20,
        marginBottom: 100,
        margin: "5%",
    },
    applets: {

        fontSize: 24,
        marginVertical: "6%",
        color: 'white',
    },
});

export default HomeScreen;
