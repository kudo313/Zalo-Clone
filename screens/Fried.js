import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';
import {useRoute, useNavigation} from '@react-navigation/core';

export default function Fried() {
  const [userId, setUserId] = useState();
  const navigation = useNavigation();
  const [state, setState] = useState({});

  const [data, setdata] = useState();

  const listFriends = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    const userId1 = await AsyncStorage.getItem('userId');
    setUserId(userId1);
    try {
      const response = await apiClient.post(
        '/friends/list',
        {},
        {
          headers: {
            authorization: 'token ' + userToken,
          },
        },
      );
      if (response.status == 200) {
        return response.data.data.friends;
      }
    } catch (e) {
      console.log('ga', e.message);
    }
  };

  useEffect(() => {
    listFriends().then(setdata);
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const checkChat = async userId => {
    const userToken = await AsyncStorage.getItem('userToken');
    try {
      const response = await apiClient.get(`/chats/checkChat/${userId}`, {
        headers: {
          authorization: 'token ' + userToken,
        },
      });
      if (response.status == 200) {
        return response.data.data;
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  const _onChat = async item => {
    let chatIdcall = null;
    chatIdcall = await checkChat(item._id);

    if (chatIdcall) {
      chatIdcall = chatIdcall._id;
    }

    // console.log(chatIdcall);

    navigation.navigate('ChatRom', {
      chatId: chatIdcall,
      userData: item,
      userId: userId,
    });
  };
  return (
    <>
      {data && (
        <FlatList
          data={data}
          keyExtractor={item => `${item._id}`}
          renderItem={({item}) => (
            <TouchableOpacity onPress={() => _onChat(item)}>
              <Text style={{marginTop: 10, color: 'red'}}>{item.username}</Text>
            </TouchableOpacity>
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
    </>
  );
}
