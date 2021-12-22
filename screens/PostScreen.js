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
import { useState } from 'react'
import usePost from '../hooks/usePost'
import ActivityIndicator from '../components/ActivityIndicator'
const Container = styled.SafeAreaView`
	flex: 1;
`

export default PostScreen = ({}) => {
	const [dataPost, userInfo, loading,] = usePost();
	console.log('dataPost', dataPost[0])
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
					<ToolBar data = {userInfo} />}
					{dataPost &&
					<FlatList
					 	data = {dataPost}
						 keyExtractor={item => item._id}
						 renderItem={({ item }) => (
							<Feed
							//   onPress={() => navigation.push('NewsDetail', { item })}
							  data={item}
							/>
						  )}
						/>}
				{/* </ScrollView> */}
			</Container>
		</>
	);
	
};

// import React from "react";
// import { View, Text, StyleSheet } from "react-native";

// export default PostScreen = () => {
//     return (
//         <View style={styles.container}>
//             <Text>Post Screen</Text>
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//     },
// });
