import React, { useState } from 'react';
import { View, TextInput, Pressable, Alert, StyleSheet, Text, SafeAreaView, Dimensions } from 'react-native';
import Logo from '../Components/Logo';
import { LinearGradient } from 'expo-linear-gradient';

    const API_URL = 'http://localhost:3000/users';

    const LoginScreen: React.FC = () => {
        const [email, setEmail] = useState<string>('');
        const [password, setPassword] = useState<string>('');
        const windowWidth = Dimensions.get('window').width;
        const styles = getStyles(windowWidth);


    const handleLogin = async () => {
        try {
            const response = await fetch(`${API_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email.toLowerCase(),
                    password,
                }),
            });

            const data = await response.json();
            console.log(data);

            if (response.status === 200) {
                await AsyncStorage.setItem('bearer', data.bearer);
                Alert.alert('Success', 'Login successful');
            } else {
                Alert.alert('Error', data.error);
            }
        } catch (error) {
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
                {/* <Button title="Se connecter" onPress={handleLogin} color="#6C5B7B" /> */}
                <Pressable style={styles.button}>
                    <Text style={styles.buttonText}>
                        Connect
                    </Text>
                </Pressable>
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
