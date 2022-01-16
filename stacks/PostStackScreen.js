import * as React from 'react';
import { View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PostScreen from '../screens/PostScreen'
import UploadPostScreen from '../screens/UploadPostScreen';


const Stack = createNativeStackNavigator()
export default PostStackScreen = () => {
    
    return (
            <Stack.Navigator screenOptions={{
                headerShown: false
              }}>
                <Stack.Screen name = "post" component = {PostScreen} />
                <Stack.Screen name = "upPost" component = {UploadPostScreen} />
            </Stack.Navigator>
    )    
}