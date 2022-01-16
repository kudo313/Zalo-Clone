import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { FlatList, TouchableHighlight, TouchableOpacity } from "react-native-gesture-handler";
import { Avatar } from 'react-native-elements';
import apiClient from '../api/client'
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Receiver({ route, navigation }) {

    const [state, setState] = useState({});
    const [data, setData] = useState();
    const [isLoading, setLoading] = useState(true);
    const [del, setDel] = useState('');
   

    const listRequest = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        try {

            const response = await apiClient.post('/friends/get-requested-friend',
                {

                },
                {
                    headers: {
                        authorization: "token " + userToken,
                    }
                }
            );
            if (response.status == 200)

                return response.data.data.friends;

            // }
        }
        catch (e) {
            console.log("ga", e.message)
        }
    }

    useEffect(() => {
        setTimeout(() => { setLoading(false) }, 1000)


        let isMounted = true;               // note mutable flag
        listRequest().then(setData)
        return () => {
            setState({}); // This worked for me
          };
    }, [del]); // Or [] if effect doesn't need props or state

    

    const setAccept = async (id, is_accept) => {
        const userToken = await AsyncStorage.getItem('userToken');
        try {

            const res = await apiClient.post('/friends/set-accept',
                {
                    user_id: id,
                    is_accept: ('1' === is_accept) ? '1' : '2'
                },
                {
                    headers: {
                        authorization: "token " + userToken,
                    }
                }
            );
            // console.log("123", res.data);
            if (res.status == 200) {
                Alert.alert('Thông báo!', res.data.message, [
                    { text: 'Okay' }
                ])
            }
            setDel(id);
            // }
        }
        catch (e) {
            console.log(e.message)
        }
    }
    const [isRefreshing, setIsRefreshing] = useState(false)

    const onRefresh = () => {
        //set isRefreshing to true
        setIsRefreshing(true)
        // listRequest().then(data => {
        //     setData(data);
        //     setIsRefreshing(false)
        // })

        // and set isRefreshing to false at the end of your callApiMethod()
    }
    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large"></ActivityIndicator>
            </View>
        );
    }
    return (

        <View>

            <FlatList
                keyExtractor={item => `${item._id}`}
                data={data}

                renderItem={({ item }) => (
                  
                    <View style={{ flex: 1, flexDirection: 'row' }}>
                        <View style={{ width: '10%', marginRight: 20, marginTop: 18 }}>
                            <Avatar
                                rounded
                                source={{ uri: `http://192.168.1.4:8000/files/${item.avatar.fileName}` }}
                                size="medium"
                            />
                        </View>
                        <View style={{ marginBottom: 10 }}>
                            <Text style={{
                                fontSize: 16,
                                color: '#000',
                                marginBottom: 5,
                                marginTop: 15,
                                fontWeight: 'bold'
                            }}>{item.username}</Text>
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => 
                                { setAccept(item._id, '1') }
                            }
                                >
                                    <View style={{
                                        backgroundColor: 'dodgerblue',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 100,
                                        height: 30,
                                    }}>

                                        <Text style={{
                                            color: '#fff',
                                            marginTop: 2,
                                            marginBottom: 2,
                                            fontWeight: 'bold'
                                        }}>ĐỒNG Ý</Text>
                                    </View>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setAccept(item._id, '2') }}

                                >
                                    <View style={{
                                        backgroundColor: '#eeeeee',
                                        borderWidth: 1,
                                        borderRadius: 5,
                                        borderColor: '#fff',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        width: 100,
                                        height: 30,
                                        marginLeft: 18
                                    }}>

                                        <Text style={{
                                            color: '#000',
                                            marginTop: 2,
                                            marginBottom: 2,
                                            fontWeight: 'bold',
                                        }}>TỪ CHỐI</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                )}
                ListEmptyComponent={<Text style={{ fontSize: 20, marginTop: 5 }}>Không có yêu cầu kết bạn nào</Text>}
                // onRefresh={onRefresh}
                // refreshing={isRefreshing}
            />



        </View>


    )

}