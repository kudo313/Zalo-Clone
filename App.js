import React from 'react'

import { StatusBar, ScrollView } from 'react-native'

import styled from 'styled-components/native'

import AppBar from './components/AppBar'
import ToolBar from './components/ToolBar'
import Users from './components/Users'
import Story from './components/Story'
import Feed from './components/Feed'
import Menu from './components/Menu'
import { NavigationContainer } from "@react-navigation/native";
import MainStackScreens from "./stacks/MainStackScreens";
import { View } from 'react-native';
import newApi from './api/newApi';
import getAll from './api/newApi'
import { useState } from 'react'
import Text from 'react-native'
import { useEffect } from 'react'
import fakeData from './fakeData'
// const Container = styled.SafeAreaView`
// 	flex: 1;
// `

const App = () => {
	// return (
	// 	<>
	// 		<StatusBar
	// 			backgroundColor='#FFFFFF'
	// 			barStyle='dark-content'
	// 		/>
	// 		<Container>
	// 			<AppBar />
	// 			<ScrollView>
	// 				<ToolBar />
	// 				<Feed />
	// 			</ScrollView>
	// 			<Menu />
	// 		</Container>
	// 	</>
	// )
	// const [allPost, setAllPosts] = useState({})
	// const getAllNews = async () => {
	// 	const allPosts = await newApi.getAll()
	// 	setAllPosts(allPosts)
	// }
	// useEffect(() => {
	// 	getAllNews();
	// }, []);
	return (

        <NavigationContainer>
            <MainStackScreens />
        </NavigationContainer>
		// <View>
		// 	<Text>
		// 		{fakeData[0].countComments}
		// 	</Text>
		// </View>
    );
}

export default App
