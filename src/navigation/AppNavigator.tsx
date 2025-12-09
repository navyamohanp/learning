import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Swipe from '../screens/swipe';
import PostsScreen from '../screens/PostScreen';
import AudioRecorderScreen from '../screens/audio';
import TabNavigator from './TabNavigator';
import Notifications from '../screens/Notifications';
import UserDetailsScreen from '../screens/UserDetails';
import UserDetails from '../screens/user';
import RiveButton from '../screens/rive';
import SkiaGraph from '../screens/skiaGraph';
import Donut from '../screens/donut';
import BarGraph from '../screens/barGraph';
import FiltersScreen from '../screens/filter';

export type RootStackParamList = {
  Main: undefined;
  Swipe: any;
  Posts: any;
  Audio: any;
  Test: any;
  Notifications: undefined;
  User: undefined;
  UserD: undefined;
  Rive: undefined;
  Skia: undefined;
  Donut: undefined;
  Bar: undefined;
  Filtr: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName="Filtr">
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Swipe" component={Swipe} />
        <Stack.Screen name="Posts" component={PostsScreen} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="User" component={UserDetailsScreen} />
        <Stack.Screen name="UserD" component={UserDetails} />
        <Stack.Screen name="Rive" component={RiveButton} />
        <Stack.Screen name="Skia" component={SkiaGraph} />
        <Stack.Screen name="Donut" component={Donut} />
        <Stack.Screen name="Bar" component={BarGraph} />
        <Stack.Screen name="Filtr" component={FiltersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
