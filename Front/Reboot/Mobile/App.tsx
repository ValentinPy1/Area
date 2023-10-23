import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Sources/Screens/HomeScreen';
import CreateAppletScreen from './Sources/Screens/CreateAppletScreen';
import CreateYourAppletScreen from './Sources/Screens/AppletTrigger';
import ResearchScreen from './Sources/Screens/ResearchScreen';
import ActivitiesScreen from './Sources/Screens/ActivitiesScreen';
import ProfileScreen from './Sources/Screens/ProfileScreen';
import DetailScreen from './Sources/Screens/ChooseTrigger';
import LoginScreen from './Sources/Screens/LoginScreen';
import IfThisThenThatPage from './Sources/Screens/IfThisThenThatPage.tsx';
import TTCreateYourAppletScreen from './Sources/Screens/AppletAction';
import TTDetailScreen from './Sources/Screens/ChooseAction';
import Discord from './Sources/Screens/AppletsScreen/Discord';
import Etherscan from './Sources/Screens/AppletsScreen/Etherscan';

const Stack = createStackNavigator();

const App: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="IfThisThenThatPage" component={IfThisThenThatPage} />
      <Stack.Screen name="Create" component={CreateYourAppletScreen} />
      <Stack.Screen name="CreateApplet" component={CreateAppletScreen} />
      <Stack.Screen name="Research" component={ResearchScreen} />
      <Stack.Screen name="Activities" component={ActivitiesScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="TTCreate" component={TTCreateYourAppletScreen} />
      <Stack.Screen name="TTDetail" component={TTDetailScreen} />
      <Stack.Screen name="Discord" component={Discord} />
      <Stack.Screen name="Etherscan" component={Etherscan} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
