import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {useIsFocused} from '@react-navigation/native';

import ChatRoomItem from '../components/ChatRoomItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../api/client';

export default function HomeChatScreen() {
  const isFocused = useIsFocused();

  const [data, setData] = useState();
  const [state, setState] = useState({});

  const getListChats = async () => {
    const userToken = await AsyncStorage.getItem('userToken');

    let auth = {
      headers: {
        authorization: 'token ' + userToken,
      },
    };

    try {
      const response = await apiClient.get('chats/getListChats', auth);
      if (response.data) {
        let data = response.data.data;
        data = await data.sort(function (a, b) {
          return new Date(b.updatedAt) - new Date(a.updatedAt);
        });

        return data;
      }
    } catch (e) {
      console.log('error when getting data ', e.message);
    }
  };

  useEffect(() => {
    getListChats().then(setData);
    return () => {
      setState({}); // This worked for me
    };
  }, [isFocused]);

  return (
    <>
      {data && (
        <SafeAreaView style={styles.page}>
          <FlatList
            data={data}
            keyExtractor={item => `${item._id}`}
            renderItem={({item}) => <ChatRoomItem chatRoom={item} />}
            showsVerticalScrollIndicator={false}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: 'white',
    flex: 1,
  },
});
