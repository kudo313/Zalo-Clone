import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/core';
import {Avatar} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import {Alert} from 'react-native';


import Entypo from 'react-native-vector-icons/Entypo';

export default function MessageSettingScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const chatId = route.params?.chatId;
  const userData = route.params?.userData;

  const deleteChat = async chatId => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await apiClient.get(
        `/chats/deleteChat/${chatId}`,
        {
          headers: {
            authorization: 'token ' + userToken,
          },
        },
      );
      if (response.status == 200) {
        Alert.alert('Thông báo!', response.data.message, [{text: 'Okay'}]);
      // console.log(response.data.message)
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const _onDelete = async () => {
    try {
        const deleteChats = await deleteChat(chatId);
      navigation.navigate('HomeChat');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      {/* <Avatar
        rounded
        source={{
          uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
        }}
      /> */}

      <View
        style={{
          alignItems: 'center',
          margin: 20,
        }}>
        <Avatar
          rounded
          size={100}
          source={{
            uri: `http://192.168.1.13:8000/files/${userData.avatar.fileName}`,
          }}
        />
      </View>

      <Text
        style={{
          textAlign: 'center',
          fontSize: 24,
          fontWeight: 'bold',
          color: 'black',
          margin: 5,
        }}>
        {userData.username}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          fontSize: 22,
          fontWeight: 'bold',
          color: 'black',
          margin: 5,
        }}>
        Chặn người dùng
      </Text>
      <View style={{}}>
        {/* <Entypo name="block" size={22} color="blue" /> */}
        <TouchableOpacity onPress={_onDelete}>
          <Text
            style={{
              textAlign: 'center',
              fontSize: 22,
              fontWeight: 'bold',
              color: 'black',
              margin: 5,
            }}>
            Xóa cuộc hội thoại
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
