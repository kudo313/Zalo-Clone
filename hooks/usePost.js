import { useState, useEffect } from 'react';
import newApi from '../api/newApi';
import fakeData from '../fakeData'
const usePost = () => {
    const [dataPost, setDataPost]  = useState(false)
    const [loading, setLoading] = useState(true);    
    const [dataUser, setDataUser] = useState(false);
    const getAllPosts = async () => {
        // setLoading(true);
        const allPost = await newApi.getAll().then((data) => {
            console.log('dataPosst', data)
            return data
        });
        setDataPost(allPost)
        const userInfo = await newApi.getUser().then((data) => {
            console.log('user data', data)
            return data
        });
        setDataUser(userInfo)
        if (allPost && userInfo) {
            setLoading(false)
        }
        
    }
    useEffect(() => {
        getAllPosts()
        return () => {
            setState([]); // This worked for me
          };
    }, []);
    return [dataPost, dataUser, loading,];

};
export default usePost;