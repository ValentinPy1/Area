import React, { useState } from 'react';
import { View, TextInput, Alert, StyleSheet, Text, Dimensions, Button } from 'react-native';
import Logo from '../Components/Logo';
import { LinearGradient } from 'expo-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import this

    const API_URL = 'http://10.0.2.2:8080/auth/login';

    const LoginScreen: React.FC = () => {
        const navigation = useNavigation();
        const windowWidth = Dimensions.get('window').width;
        const styles = getStyles(windowWidth);

        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');

        const handleLogin = async () => {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.Bearer) {
                  await AsyncStorage.setItem('authorization', 'Bearer ' + data.Bearer);
        
                  // Navigate to the HomeScreen with data after successful login
                  navigation.navigate('Home', { apiData: data });
                } else {
                    console.error('Bearer token is missing in the API response.');
                    Alert.alert('Error', 'Authentication failed. Please try again.');
                }
                
                console.log(data);
            } else {
                Alert.alert('Error', 'Incorrect email or password. Please try again.');
            }
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'Something went wrong. Please try again.');
        }
    };
        

    return (
        <LinearGradient colors={['#6C5B7B', '#C06C84', '#F67280']} style={styles.container}>
            <View style={styles.logoContainer} >
                <Logo color='#FFFFFF' />
            </View>
            <Text style={styles.title}>TITS</Text>
            <Text style={styles.subtitle}>Task Integration & Technology System</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Nom d'utilisateur"
                    placeholderTextColor="#FFF"
                    onChangeText={setEmail}
                    value={email}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Mot de passe"
                    placeholderTextColor="#FFF"
                    secureTextEntry={true}
                    onChangeText={setPassword}
                    value={password}
                />
                <Button title="Log in" onPress={handleLogin} color="#6C5B7B" />
                    {/* <Pressable style={styles.button}>
                        <Text style={styles.buttonText}>
                            Connect
                        </Text>
                    </Pressable> */}
            </View>
        </LinearGradient >
    );
};

const getStyles = (windowWidth: number) => StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 16,
    },
    logoContainer: {
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 30,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 22,
        marginBottom: 20,
        color: '#FFF',
        textAlign: 'center',
    },
    inputContainer: {
        alignSelf: 'center',
        width: windowWidth > 768 ? '20%' : '80%',
        textAlign: 'center',
    },   
    input: {
        height: 40,
        borderColor: '#FFF',
        borderBottomWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
        color: '#FFF',
        textAlign: 'center',
    },
    button: {
        backgroundColor: '#6C5B7B',
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        width: '50%',
        // flex: 1,
        alignSelf: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginScreen;
    