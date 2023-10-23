import React,{ useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { NavigationProp, useFocusEffect } from '@react-navigation/native';
import NavBar from './../Components/Navbar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiGET, apiPOST } from '../Components/apiHelper';



let id: string = "0";
let code: string = "0";

type IfThisThenThatPageProps = {
    navigation: NavigationProp<Record<string, object>>;
    route: any;
};

function IfThisThenThatPage({ navigation, route }: IfThisThenThatPageProps) {

  const [selectedTrigger, setSelectedTrigger] = useState<{guildId?: string, channelName?: string, message?: string, gasPrice?: string} | null>(null);
  const [selectedAction, setSelectedAction] = useState<{guildId?: string, channelName?: string, message?: string, gasPrice?: string} | null>(null);
  const [selectedTriggerId, setSelectedTriggerId] = useState<string | null>(null);
  const [selectedActionId, setSelectedActionId] = useState<string | null>(null);
  
  const handleContinue = async () => {
    try {
      console.log('1 ' + selectedTriggerId);
      console.log('2 ' + selectedActionId);
      console.log('3 ' + selectedTrigger?.message);
      console.log('4 ' + selectedAction);
        const body = {
            name: 'test',
            triggerid: selectedTriggerId,
            actionid: selectedActionId,
            triggerdata: selectedTrigger,
            actiondata: selectedAction
        };
  
        const response = await apiPOST('/task/new', body);
        console.log(response); // To see the response data, you can remove it if you don't need it
  
    } catch (error) {
        console.error('Error posting data:', error);
    }
  };
  
    useEffect(() => {
      const fetchData = async () => {
        const storedTrigger = JSON.parse(await AsyncStorage.getItem('selectedTrigger') || 'null');
        const storedAction = JSON.parse(await AsyncStorage.getItem('selectedAction') || 'null');
        const storedTriggerId = await AsyncStorage.getItem('selectedTriggerId') || null;
        const storedActionId = await AsyncStorage.getItem('selectedActionId') || null;
        setSelectedTrigger(storedTrigger);
        setSelectedAction(storedAction);
        setSelectedTriggerId(storedTriggerId);
        setSelectedActionId(storedActionId);
      };
    
      fetchData();
    }, []);
  
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      setSelectedTrigger(null);
      setSelectedAction(null);
      setSelectedTriggerId(null);
      setSelectedActionId(null);
    });
  
    return unsubscribe;
  }, [navigation]);
  
  useFocusEffect(
    React.useCallback(() => {
      const loadSelectedValues = async () => {
        try {
          const storedTriggerValue = JSON.parse(await AsyncStorage.getItem("selectedTrigger") || "null");
          if (storedTriggerValue !== null) {
            setSelectedTrigger(storedTriggerValue);
          }

          const storedActionValue = JSON.parse(await AsyncStorage.getItem("selectedAction") || "null");
          if (storedActionValue !== null) {
            setSelectedAction(storedActionValue);
          }
          const storedActionIdValue = await AsyncStorage.getItem("selectedActionId") || null;
          if (storedActionIdValue !== null) {
            setSelectedActionId(storedActionIdValue);
          }

          const storedTriggerIdValue = await AsyncStorage.getItem("selectedTriggerId") || null;
          if (storedTriggerIdValue !== null) {
            setSelectedTriggerId(storedTriggerIdValue);
          }
        } catch (error) {
          console.error("Error loading values from AsyncStorage:", error);
        }
      };
  
      loadSelectedValues();
  
      return () => {}; // This is equivalent to the componentWillUnmount in a class component. 
                      // If you have cleanup logic, you can include it here. Otherwise, just return an empty function.
    }, [])
  );  

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('Create', {})}>
                <Text style={styles.text}>If This</Text>
                {selectedTrigger && <Text style={styles.smallText}></Text>}
            </TouchableOpacity>
            
            <View style={styles.line} />

            <TouchableOpacity style={styles.box} onPress={() => navigation.navigate('TTCreate', {})}>
                <Text style={styles.text}>Then That</Text>
                {selectedAction && <Text style={styles.smallText}></Text>}
            </TouchableOpacity>

        <TouchableOpacity 
          style={styles.continueButton} 
          onPress={handleContinue}>
          <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>


            <NavBar id={id} code={code} index={3} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5'
  },
  box: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 20,
    height: 100,
    width: '80%', 
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: -1,
    backgroundColor: '#222222',
    borderRadius: 10,
    elevation: 3, // adds shadow on Android
    shadowOffset: { width: 1, height: 1 }, // adds shadow on iOS
    shadowOpacity: 0.3, // adds shadow on iOS
    shadowRadius: 2, // adds shadow on iOS
  },
  text: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white'
  },
  line: {
    height: '5%',
    width: 2,
    backgroundColor: 'black',
    marginBottom: -1,
  },
  smallText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 10,
  },
  continueButton: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#222222', // Green color
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

export default IfThisThenThatPage;
