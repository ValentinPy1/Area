import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Svg, Path } from 'react-native-svg';
import { NavigationProp } from '@react-navigation/native';

interface NavbarProps {
    navigation: NavigationProp<any>;
    id: string;
    code: string;
    index: number;
    apiData?: any;
}

export default class Navbar extends React.Component<NavbarProps, {}> {
    render() {
        return (
            <View style={styles.navbar}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Home")} style={styles.navbaritem}>
                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M12.5,2.5 L2.5,12.5 L12.5,22.5 L22.5,12.5 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.navbaritem} onPress={() => this.props.navigation.navigate("Research")}>
                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M2.5,2.5 L22.5,2.5 L12.5,22.5 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Research</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("IfThisThenThatPage", {apiData: this.props.apiData})} style={styles.navbaritem}>

                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M2.5,12.5 L22.5,12.5 L12.5,2.5 L12.5,22.5 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Create</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Activities")} style={styles.navbaritem}>
                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M2.5,2.5 L12.5,12.5 L22.5,2.5 L2.5,22.5 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Activities</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Profile")} style={styles.navbaritem}>
                    <Svg width="25" height="25" viewBox="0 0 25 25" fill="white">
                        <Path d="M12.5,2.5 L12.5,22.5 L22.5,12.5 Z" />
                    </Svg>
                    <Text style={styles.txtnavbar}>Profile</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    navbar: {
        width: "100%",
        height: "8%",
        backgroundColor: "#222222",
        position: "absolute",
        bottom: 0,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        borderWidth: 1,
    },
    navbaritem: {
        borderRadius: 25,
        alignItems: "center",
        justifyContent: "center",
    },
    txtnavbar: {
        marginTop: 5,
        fontSize: 12,
        fontWeight: "bold",
        color: "white"
    },
});
