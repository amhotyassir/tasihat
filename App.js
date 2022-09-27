import React from "react";
import {StatusBar} from 'expo-status-bar';
import {View,Text} from "react-native";
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import Calculate from "./screens/calculate";
import Record from "./screens/record";

function RecordScreen({ navigation, route }) { return <Record navigation={navigation} /> }
function CalcScreen({ navigation, route }) { return <Calculate navigation={navigation} /> }
const Stack = createStackNavigator();
export default function App() {
  

  return <View style={{ flex: 1 }}>
    
  <NavigationContainer >
    
    <Stack.Navigator initialRouteName='calculate'>
      <Stack.Screen name="calculate" options={{
        headerTitle: '',
        headerBackTitle: false,
        headerTransparent: true
      }} component={CalcScreen} />
      <Stack.Screen options={{
        headerTitleAlign:'center'
      }} name="record" component={RecordScreen} />
      

    </Stack.Navigator>
  </NavigationContainer>
  <StatusBar  style='dark' />
</View>

}