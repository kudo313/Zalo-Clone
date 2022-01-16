
import React from 'react';
import MyFriendList from '../components/MyFriendList';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import 'react-native-gesture-handler';
import MySearchBar from '../components/MySearchBar';
import Receiver from '../components/Receiver';
import HomeChatScreen from '../screens/HomeChatScreen';
import HomeHeader from '../components/HomeHeader/HomeHeader';
import ChatMessengerScreen from '../screens/ChatMessengerScreen';
import MessageSettingScreen from '../screens/MessageSettingScreen';
import Fried from '../screens/Fried';

const Stack = createStackNavigator();

const AddFriend = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen
          name={'Bạn bè'}
          component={MyFriendList}
          options={{ headerShown: false }}
         
        />
        <Stack.Screen
          name={'Lời mời kết bạn'}
          component={Receiver}
          screen
          options={{
            headerStyle: {
              
              backgroundColor: '#6F3DD2'
            }
          }}
        
        />
        <Stack.Screen
          name={'Search'}
          component={MySearchBar}
          screen
          options={{
            headerStyle: {                        
            }
          }}            
        />
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
};



export default AddFriend;