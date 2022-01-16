import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeChatScreen from '../screens/HomeChatScreen';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import ChatMessengerScreen from '../screens/ChatMessengerScreen';
import MessageSettingScreen from '../screens/MessageSettingScreen';
import Fried from '../screens/Fried';
const Stack = createNativeStackNavigator();

export default function ChatNavigation() {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="HomeChat"
          component={HomeChatScreen}
          options={{headerTitle: props => <HomeHeader {...props} />}}
        />

        <Stack.Screen
          name="ChatRom"
          component={ChatMessengerScreen}
          options={{
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="MessageSetting"
          component={MessageSettingScreen}
          options={{
            headerBackTitleVisible: false,
          }}
        />

        <Stack.Screen
          name="Fried"
          component={Fried}
          options={{
            headerBackTitleVisible: false,
          }}
        />
      </Stack.Navigator>
  );
}