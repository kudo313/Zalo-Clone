import apiClient from './client';
import fakeData from '../fakeData'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getAll = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: "token " + userToken,
        }
      };
    try{
        const response = await apiClient.get('/posts/list', axiosConfig)
        // response.data
        if (response.data){
            console.log("abc, ",response.data.data)
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when getting posts', error.message)
        return fakeData;
    }
}
const getUser = async () => {
    const userToken = await AsyncStorage.getItem('userToken');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: "token " + userToken,
        }
      };
    try{
        const response = await apiClient.get('/users/show', axiosConfig)
        // response.data
        if (response.data){
            console.log("abc, ",response.data.data)
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when getting user', error.message)
        return fakeData;
    }
}
const likePost = async postId => {
    const userToken = await AsyncStorage.getItem('userToken');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: "token " + userToken,
        }
      };
    try{
        console.log('postId', postId)
        const response = await apiClient.post(`/postLike/action/${postId}`, axiosConfig)
        if (response.data){
            console.log("abc, ",response.data.data)
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when like post', error.message)
        return [];
    }
}


export default {getAll, getUser, likePost};