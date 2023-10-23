import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import NavBar from './../Components/Navbar';
import { NavigationProp } from '@react-navigation/native';
import { apiGET } from '../Components/apiHelper';

const { width } = Dimensions.get('window');

type ActivitiesProps = {
    navigation: NavigationProp<Record<string, object>>;
};

let id: string = "0";
let code: string = "0";

function ActivitiesScreen({ navigation }: ActivitiesProps) {
    const [activities, setActivities] = useState<string[]>([]);

    useEffect(() => {
        const fetchActivities = async () => {
            try {
                const data = await apiGET('/task/mytasks');
                setActivities(data); // Assuming the response is an array of strings.
            } catch (error) {
                console.error("Error fetching activities:", error);
            }
        };

        fetchActivities();
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Activities</Text>

            {activities.map((activity, index) => (
                <TouchableOpacity key={index} style={styles.box}>
                    {/* <Text style={styles.boxText}>ID Activities: {activity.id}</Text>
                    <Text style={styles.boxText}>userId: {activity.userId}</Text>
                    <Text style={styles.boxText}>triggerId: {activity.triggerId}</Text>
                    <Text style={styles.boxText}>triggerData: {activity.triggerData}</Text>
                    <Text style={styles.boxText}>actionId: {activity.actionId}</Text>
                    <Text style={styles.boxText}>actionData: {activity.actionData}</Text> */}
                </TouchableOpacity>
            ))}

            <NavBar id={id} code={code} index={4} navigation={navigation} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#222222',
        flex: 1,
    },
    title: {
        fontSize: 24,   
        fontWeight: "700",
        marginVertical: 10,
        color: 'white',
        margin: "5%",
    },
    box: {
        margin: 10,
        padding: 10,
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 10,
    },
    boxText: {
        color: 'white',
        fontSize: 16,
    },
});

export default ActivitiesScreen;
