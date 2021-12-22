import React from "react";
import { Component } from "react";
import {
    Text, View, TouchableOpacity
} from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';

import apiClient from '../api/client'

export default function Screen({navigation}){
    // const getAll = async () => {
    //     try {
    //       const response =  await apiClient.get('users/show/60c45284ae8c0f00220f462b');
    //       console.log("ga", response.data.data);
    //     } catch(e){
    //       console.log(e.message)
    //     }
    //   }
    
        return (
            <View style={{
                flex: 1,

            }}
            >
                <View style={{
                    marginTop: 35,
                    flex: 40,
                    // justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <Text style={{fontSize: 40, color: '#6F3DD2'}}>Yahallo</Text>
                  <Icon name="video-camera" size={100} color="#6F3DD2" style={{marginTop: 25}}/>
                    
                </View>

                <View style={{
                    flex: 55,
                    // justifyContent: 'center',
                    alignItems: 'center',
              
                }}>
                    
                    <Text style={{ color: 'black', fontWeight: 'bold'}}>Gọi video ổn định</Text>
                    <Text  style={{fontSize:12, color: 'gray' }}>Trò chuyện thật đã với chất lượng video ổn định mọi lúc mọi nơi</Text>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('Login')}
                    activeOpacity={0.7}
                >
                    <View style={{ width: 150, height: 50, backgroundColor: '#6F3DD2', borderRadius: 30, marginTop: 50 }}>
                        <Text style={{ margin: 10, fontSize: 20, color: 'white', textAlign: 'center' }}>Đăng nhập</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={
                        () => navigation.navigate('Register')
                        // () => getAll()
                }
                    activeOpacity={0.7}
                >
                    <View style={{ width: 150, height: 50, backgroundColor: '#D4D4D4', borderRadius: 30, marginTop: 30 }}>
                        <Text style={{ margin: 10, fontSize: 20, color: 'black', textAlign: 'center' }}>Đăng ký</Text>
                    </View>
                </TouchableOpacity>

                </View>
                <View style={{
                    flex: 10,
                    // justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    justifyContent: "space-evenly"
                }}>
                <Text style={{borderBottomWidth: 1, fontSize: 15}}>Tiếng Việt</Text>
                <Text style={{fontSize: 15}}>English</Text>
                </View>
            </View>

        );
}