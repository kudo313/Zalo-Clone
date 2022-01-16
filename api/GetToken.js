import AsyncStorage from '@react-native-async-storage/async-storage';

const GetToken =  AsyncStorage.getItem('userToken');
export default GetToken;
