import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, TextInput, Image, Alert} from 'react-native';
import NavBar from '../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET, apiPOST } from '../Components/apiHelper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WebView } from 'react-native-webview';

const getBearerToken = async (): Promise<string | null> => {
  return await AsyncStorage.getItem('authorization');
};

const { width, height } = Dimensions.get('window');

const DetailScreen: React.FC = ({ route, navigation }: any) => {

  const [showWebView, setShowWebView] = React.useState(false);

  const { source, title, color, description } = route.params;

  const [bearerToken, setBearerToken] = useState<string | null>(null); // added type string | null to the useState hook


  useEffect(() => {
    const fetchToken = async () => {
      const token = await getBearerToken();
      setBearerToken(token);
    };
  
    fetchToken();
  }, []);
  


  // State for storing the triggers fetched from the API.
  const [triggers, setTriggers] = useState<any[]>([]); // added type any[] to the useState hook

  useEffect(() => {
    const fetchData = async () => {
        try {
            const data = await apiGET('/actrig/gettriggers/' + title);
            setTriggers(data);
        } catch (error) {
            console.error('Error fetching services:', error);
        }
    };

    fetchData();
  }, []);


    const handleTriggerPress = async (trigger) => {
      console.log("bearerToken", bearerToken);
      console.log("ID", trigger.id);
      await AsyncStorage.setItem('selectedTriggerId', trigger.id);
      if (title === "Discord") {
        Alert.alert(
          "Connect to Discord",
          "Do you want to connect to Discord?",
          [
            { 
              text: "OK", 
              onPress: () => setShowWebView(true) 
            },
            { 
              text: "Cancel", 
              onPress: () => console.log("Cancelled") 
            },
          ],
          { cancelable: false }
        );
      } else {
        // await AsyncStorage.setItem('selectedTrigger', JSON.stringify(trigger));
        navigation.navigate('Etherscan', {actionOrTrigger: "trigger"});
      }
    };

    if (showWebView) {
      return (
          <WebView 
              source={{ uri: 'http://10.0.2.2:8080/oauth2/discordbot/redirect',
              headers: {'Authorization': bearerToken, 'Caca' : 'fsdfdsf' }}}
              onNavigationStateChange={(navState) => {
                  // This condition checks if the URL signifies that the auth process is done. Modify as necessary.
                  if (navState.url.includes("?code")) {
                      setShowWebView(false);
                      navigation.navigate('Discord', {actionOrTrigger: "trigger"});
                  }
              }}
          />
      );
  }


  return (
      <View style={styles.container}>
          <View style={[styles.header, { backgroundColor: color }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('./../../assets/backArrow.png')} style={styles.arrow} />
              </TouchableOpacity>
              <Text style={styles.trigger}>Select the trigger</Text>
          </View>

          <View style={[styles.mainContainer, { backgroundColor: color }]}>
              <Image style={styles.icon} source={source} />
              <Text style={styles.name}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
          </View>

          {/* Map over the triggers associated with the given service and display each */}
          {triggers.map((trigger, index) => (
          <TouchableOpacity 
            key={index} 
            style={[styles.triggerChoice, { backgroundColor: color }]} 
            onPress={ () => { 
            console.log("ID", trigger.id);
            handleTriggerPress(trigger)}}
          >
            <Text style={styles.textContainer}>{trigger.name}</Text>
          </TouchableOpacity>
        ))}

          <TouchableOpacity style={styles.triggerIdea}>
              <Text style={styles.textTrggierIdea}>Give Trigger Idea</Text>
          </TouchableOpacity>
      </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
      flexDirection: 'row',
      alignItems: 'center',
      width: '100%',
      height: 0.075 * height,
  },
  arrow: {
      tintColor: 'white',
      width: 30,
      height: 25,
      marginLeft: 20,
  },
  trigger: {
      color: 'white',
      fontSize: 20,
      fontWeight: 'bold',
      marginLeft: 30,
  },
  icon: {
    width: 75,
    height: 75,
  },
  mainContainer: {
    width: '100%',
    height: '50%',
    alignItems: 'center', // centers children horizontally
  },
  name: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
  description: {
    color: 'white',
    fontSize: 16.5,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: 'center',
    marginHorizontal: 20,
  },
  textContainer: {
    width: "90%",
    height: "100%",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    marginTop: 10,
  },
  triggerChoice: {
      width: "90%",
      height: 50,
      borderRadius: 5,
      backgroundColor: "#fff",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      shadowColor: "#000000",
      justifyContent: "center",
      shadowOffset: {width: -2, height: 4},
      shadowOpacity: 0.3,
      shadowRadius: 3,
      marginLeft: "5%",
      marginTop: 20,
  },
  triggerIdea: {
    width: "90%",
    height: 50,
    borderRadius: 5,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    marginLeft: "5%",
    marginTop: 20,
  },
  textTrggierIdea: {
    width: "90%",
    height: "100%",
    marginLeft: "5%",
    alignItems: "center",
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginTop: 20,
  },

});

export default DetailScreen;