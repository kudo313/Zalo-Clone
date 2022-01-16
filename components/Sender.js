import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Formik } from 'formik';
import apiClient from '../../src/api/client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableHighlight } from "react-native-gesture-handler";
import { Avatar } from 'react-native-elements';



const Sender = () => {
    const [data, setData] = useState();

    const search = async (values) => {
        const userToken = await AsyncStorage.getItem('userToken');
        try {
            const res = await apiClient.post('/friends/search',
                {
                    ...values,
                },
                {
                    headers: {
                        authorization: "token " + userToken,
                    }
                }
            );
            if (res.status == 200) {
                setData(res.data.data.friend);

            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const setRequest = async () => {
        const userToken = await AsyncStorage.getItem('userToken');
        try {
            // console.log(userToken)
            const res = await apiClient.post('/friends/set-request-friend',
                {
                    user_id: data._id,
                },
                {
                    headers: {
                        authorization: "token " + userToken,
                    }
                }
            );
            
            console.log(res)
            if (res.status == 200) {
                Alert.alert('Thông báo!', res.data.message, [
                    { text: 'Okay' }
                ])
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }
    return (
        <View style={{ flex: 1 }}>
            <Formik
                initialValues={{ phonenumber: '0000000015' }}
                // validationSchema={validationSchema}
                onSubmit={search}
            >
                {({ handleChange, handleBlur, handleSubmit, values }) => (
                    <View>
                        <View style={{
                            backgroundColor: '#dddddd',
                            justifyContent: 'center',
                            height: 30
                        }}>
                            <Text style={{ color: '#000', fontSize: 14 }}>Thêm bạn bè bằng số điện thoại</Text>
                        </View>
                        <View style={{
                            flexDirection: 'row',
                            borderBottomWidth: 1,
                            borderBottomColor: '#bbb',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <TextInput
                                style={{ justifyContent: 'center', backgroundColor: '#fff', height: 50 }}
                                placeholder='Nhập số điện thoại'
                                onChangeText={handleChange('phonenumber')}
                                onBlur={handleBlur('phonenumber')}
                                value={values.phonenumber}
                                keyboardType="number-pad"
                            ></TextInput>

                            <TouchableOpacity onPress={handleSubmit}
                            >
                                <View style={{
                                    backgroundColor: 'dodgerblue',
                                    height: 35,
                                    width: 80,
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: 18,
                                    marginRight: 20
                                }}>
                                    <Text style={{ color: '#fff', fontWeight: 'bold' }}>TÌM</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Formik>
            {data &&

                <View style={{ flex: 1, flexDirection: 'row' }}>

                    <View style={{ width: '10%', marginRight: 20, marginTop: 5 }}>
                        <Avatar
                            rounded
                            source={{ uri: `http://192.168.1.4:8000/files/${data.avatar.fileName}` }}
                            size="medium"
                        />
                    </View>
                    <View style={{
                        marginBottom: 10,
                        flex: 1,
                        flexDirection: 'row',
                        justifyContent: "space-between"
                    }}>
                        <Text style={{
                            fontSize: 16,
                            color: 'black',
                            marginTop: 15,
                            fontWeight: 'bold',

                        }}>{data.username}</Text>
                        <View style={{}}>
                            <TouchableOpacity onPress={() => { setRequest() }}
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
                                    marginTop: 15,
                                    marginRight: 20
                                }}>

                                    <Text style={{
                                        color: '#fff',
                                        marginTop: 2,
                                        marginBottom: 2,
                                        fontWeight: 'bold'
                                    }}>KẾT BẠN</Text>
                                </View>
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            }
        </View >
    )
}
export default Sender;