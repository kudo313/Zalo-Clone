import React, {useState, useEffect} from 'react';
import {Image, Text, View, Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/core';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import apiClient from '../../api/client';

export default function ChatRoomItem({chatRoom}) {
  const navigation = useNavigation();
  const [userData, setuserData] = useState();
  const [userId, setUserId] = useState();
  const [state, setState] = useState({});
  let userFriend = '';

  const getUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let userId1 = await AsyncStorage.getItem('userId');
    setUserId(userId1);

    if (chatRoom.member[0] == userId1) userFriend = chatRoom.member[1];
    else userFriend = chatRoom.member[0];

    let auth = {
      headers: {
        authorization: 'token ' + userToken,
      },
    };
    try {
      const response = await apiClient.get(`users/show/${userFriend}`, auth);
      if (response.data) {
        return response.data.data;
      }
    } catch (e) {
      console.log('error when getting data ', e.message);
    }
  };

  useEffect(() => {
    getUser().then(setuserData);
    return () => {
      setState({}); // This worked for me
    };
  }, []);

  const _onPress = () => {
    navigation.navigate('ChatRom', {
      chatId: chatRoom._id,
      userData: userData,
      userId: userId,
    });
  };

  return (
    <>
      {userData && (
        <Pressable style={styles.container} onPress={_onPress}>
          <Image
            source={{
              uri: `http://192.168.1.4:8000/files/${userData.avatar.fileName}`,
            }}
            style={styles.image}></Image>

          {/* { chatRoom.newMessages ? <View style= {styles.badgeContainer}>
                <Text style= {styles.badgeText}>{chatRoom.newMessages} </Text>
            </View> :null} */}

          <View style={styles.rightContainer}>
            <View style={styles.row}>
              <Text style={styles.name}>{userData.username} </Text>
              <Text style={styles.text}>{chatRoom.updatedAt}</Text>
            </View>
            <Text numberOfLines={1} style={styles.text}>
              {chatRoom.content}
            </Text>
          </View>
        </Pressable>
      )}
    </>
  );
}
