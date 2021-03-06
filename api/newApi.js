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
            authorization: "token " + userToken,
        }
      };
    try{
        console.log('postId', postId)
        const response = await apiClient.post(`/postLike/action/${postId}`, null, axiosConfig)
        if (response.data){
            console.log("abc, ",response.data.data)
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when like post', error.message)
        return [];
    }
}
const upPost = async (described, images) => {
    const userToken = await AsyncStorage.getItem('userToken');
    
    let axiosConfig = {
        headers: {
            authorization: "token " + userToken,
        },
        data :{
            'described': described,
            'images': images,
        }
      };
    try{
        const response = await apiClient.post('/posts/create', {
            'described': described,
            'images': images
        },
        {
            headers: {
                'Content-Type': 'application/json;charset=UTF-8',
                authorization: "token " + userToken,
            }
        })
        if (response.data){
            console.log("efg, ",response.data.data)
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when up post', error.message)
        return [];
    }
}
const deletePost = async postId => {
    const userToken = await AsyncStorage.getItem('userToken');
    let axiosConfig = {
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            authorization: "token " + userToken,
        }
      };
    try{
        const response = await apiClient.get(`/posts/delete/${postId}`, axiosConfig)
        // response.data
        if (response.data){
            return response.data.data;
        }
 
    } catch (error) {
        console.log('Error when deleting posts', error.message)
        return fakeData;
    }
}

export default {getAll, getUser, likePost, upPost, deletePost};