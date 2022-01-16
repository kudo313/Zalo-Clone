import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/client';
import {Alert} from 'react-native';

const sendMessage = async (chatId, senderId, receiverId, msg) => {
  const userToken = await AsyncStorage.getItem('userToken');

  try {
    const response = await apiClient.post(
      '/chats/send',
      {
        receivedId: receiverId,
        chatId: chatId,
        member: [{_id: senderId}, {_id: receiverId}],
        content: msg,
        type: 'PRIVATE_CHAT',
      },
      {
        headers: {
          authorization: 'token ' + userToken,
        },
      },
    );
    if (response.status == 200) {
      return response.data;
    }
  } catch (e) {
    console.log(e.message);
  }
};

const getMessages = async chatId => {
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await apiClient.get(`/chats/getMessages/${chatId}`, {
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

const deleteMessage = async messageIdToDelete => {
  const userToken = await AsyncStorage.getItem('userToken');
  try {
    const response = await apiClient.get(
      `/chats/deleteMessage/${messageIdToDelete}`,
      {
        headers: {
          authorization: 'token ' + userToken,
        },
      },
    );
    if (response.status == 200) {
      Alert.alert('Thông báo!', response.data.message, [{text: 'Okay'}]);
    }
  } catch (e) {
    console.log(e.message);
  }
};

export {getMessages, sendMessage, deleteMessage};
