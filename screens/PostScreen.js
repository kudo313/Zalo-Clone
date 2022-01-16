import React from 'react'

import { StatusBar, ScrollView, FlatList } from 'react-native'

import styled from 'styled-components/native'

import AppBar from '../components/AppBar'
import ToolBar from '../components/ToolBar'
import Users from '../components/Users'
import Story from '../components/Story'
import Feed from '../components/Feed'
import Menu from '../components/Menu'
import fakeData from '../fakeData'
import { useState, useEffect } from 'react'
import usePost from '../hooks/usePost'
import ActivityIndicator from '../components/ActivityIndicator'
import { useIsFocused } from '@react-navigation/native';
import newApi from '../api/newApi';

const Container = styled.SafeAreaView`
	flex: 1;
`

export default PostScreen = ({navigation}) => {
	// const [dataPost, userInfo, loading,] = usePost();
	const [dataPost, setDataPost]  = useState(false)
    const [loading, setLoading] = useState(true);    
    const [userInfo, setDataUser] = useState(false);
	const isFocused = useIsFocused();
	const [isDel, setDel] = useState()
    const getAllPosts = async () => {
        const allPost = await newApi.getAll().then((data) => {
            return data
        });
        setDataPost(allPost)
        const userInfo = await newApi.getUser().then((data) => {
            return data
        });
        setDataUser(userInfo)
        if (allPost && userInfo) {
            setLoading(false)
        }
    }
    useEffect(() => {
		setDataPost(false)
		setDataUser(false)
		setLoading(true)
        getAllPosts()
    }, [isFocused]);

	return (
		<>
			<ActivityIndicator visible = {loading} />
			{/* <StatusBar
				backgroundColor='#FFFFFF'
				barStyle='dark-content'
			/> */}
			<Container>
				<AppBar />
				{/* <ScrollView> */}
					{/* <ToolBar /> */}
					{/* {dataPost && <Feed data = {dataPost} />} */}
					{userInfo &&
					<ToolBar data = {userInfo} navigation={navigation}/>}
					{dataPost &&
					<FlatList
					 	data = {dataPost}
						//  keyExtractor={item => item._id}
						 renderItem={({ item }) => (
							<Feed
							//   onPress={() => navigation.push('NewsDetail', { item })}
							  data={item}
							  myPost={userInfo._id === item.author._id ? true : false}
							/>
						  )}
						/>}
				{/* </ScrollView> */}
			</Container>
		</>
	);
	
};

