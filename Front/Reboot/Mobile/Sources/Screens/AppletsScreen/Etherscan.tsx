import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Dimensions, ScrollView, SafeAreaView, TextInput, Image, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const { width, height } = Dimensions.get('window');

const Etherscan = ({ route,  navigation }: any) => {

    const { actionOrTrigger } = route.params;


    const [gasPrice, setGasPrice] = useState('');
  
    const handleContinue = async () => {
        console.log("actionOrTrigger", actionOrTrigger);
      const actionData = {
        gasPrice: gasPrice,
      };
      
      try {
        if (actionOrTrigger === "trigger") {
            await AsyncStorage.setItem('selectedTrigger', JSON.stringify(actionData));
        } else {
            await AsyncStorage.setItem('selectedAction', JSON.stringify(actionData));
        }
        // I'm not sure what data you want for selectedAction and selectedActionId, but you can similarly set them here.
        navigation.navigate('IfThisThenThatPage');
      } catch (error) {
        console.error("Error saving values to AsyncStorage:", error);
        Alert.alert("Error", "There was an error saving the data. Please try again.");
      }
    };

  
  return (
    <View style={styles.container}>
        <View style={[styles.header, { backgroundColor: "#7289da" }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Image source={require('./../../../assets/backArrow.png')} style={styles.arrow} />
              </TouchableOpacity>
              <Text style={styles.trigger}>Select the trigger</Text>
          </View>

          <View style={[styles.mainContainer, { backgroundColor: "#7289da" }]}>
              <Image style={styles.icon} source={require('./../../../assets/discord.png')} />
              <Text style={styles.name}>Discord  {actionOrTrigger}</Text>
              
              {/* <Text style={styles.description}>Discord</Text> */}
          </View>
          <View style={styles.mainBox}>
        <Text style={styles.label}>GasPrice:</Text>
        <TextInput 
            style={styles.input}
            placeholder="gasPrice"
            value={gasPrice}
            onChangeText={setGasPrice}
        />
        <TouchableOpacity 
            style={styles.continueButton} 
            onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
        </View>
      {/* You can add more UI elements or functionality as needed */}
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7289da",
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        borderColor: '#ddd',
        padding: 10,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 15,
        width: "80%",
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
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
    mainBox: {
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
        textAlign: 'cenblackter',
        marginHorizontal: 20,
    },
    continueButton: {
        marginTop: 30,
        padding: 15,
        backgroundColor: 'rgb(16 46 149)', // Green color
        borderRadius: 50,
        elevation: 3, // adds shadow on Android
        shadowOffset: { width: 1, height: 1 }, // adds shadow on iOS
        shadowOpacity: 0.3, // adds shadow on iOS
        shadowRadius: 2, // adds shadow on iOS
        width: '80%',
        height: 60,
      },
    continueButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 20,
      },
});

export default Etherscan;
