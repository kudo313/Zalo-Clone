import React from 'react'

import { FlatList, View } from 'react-native'

import styled from 'styled-components/native'

import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from './Avatar'
import { useState } from 'react'
import newApi from '../api/newApi'
import ActionSheet from 'react-native-actionsheet';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Container = styled.View`
	flex: 1;
	background-color: #fff;
`
const Header = styled.View`
	height: 50px;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
	margin-top: 6px;
	padding: 0 11px;
`
const Row = styled.View`
	align-items: center;
	flex-direction: row;
`
const User = styled.Text`
	font-size: 12px;
	font-weight: bold;
	color: #222121;
`
const Time = styled.Text`
	font-size: 9px;
	color: #747476;
`
const Post = styled.Text`
	font-size: 12px;
	color: #222121;
	line-height: 16px;
	padding: 0 11px;
`
const Photo = styled.Image`
	margin-top: 9px;
	width: 100%;
	height: 300px;
`
const Footer = styled.View`
	padding: 0 11px;
`
const FooterCount = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 9px 0;
`
const IconCount = styled.View`
	background: #fff;
	width: 25px;
	height: 20px;
	border-radius: 10px;
	align-items: center;
	justify-content: center;
	margin-right: 6px;
`
const TextCount = styled.Text`
	font-size: 11px;
	color: #424040;
	margin-right: 24px;
`
const Separator = styled.View`
	width: 100%;
	height: 1px;
	background: #f9f9f9;
`
const FooterMenu = styled.View`
	flex-direction: row;
	justify-content: space-between;
	padding: 9px 0;
`
const Button = styled.TouchableOpacity`
	flex-direction: row;
	margin-right: 6px;
`
const Icon = styled.View`
	margin-right: 6px;
`
const Text = styled.Text`
	font-size: 12px;
	color: #424040;
`
const BottomDivider = styled.View`
	width: 100%;
	height: 9px;
	background: #f0f2f5;
`

const Container1 = styled.View`
	width: 100%;
	height: 92px;
`
const Row1 = styled.View`
	flex-direction: row;
	background: #ffffff;
	width: 100%;
	padding: 0 11px;
	align-items: center;
`
const Input1 = styled.TextInput`
	height: 50px;
	width: 100%;
	padding: 0 8px;
`
const Divider1 = styled.View`
	width: 100%;
	height: 0.5px;
	background: #f0f0f0;
`
const Menu1 = styled.TouchableOpacity`
	flex: 1;
	flex-direction: row;
	align-items: center;
	justify-content: center;
	height: 42px;
`
const MenuText1 = styled.Text`
	padding-left: 11px;
	font-weight: 500;
	font-size: 12px;
`
const Separator1 = styled.View`
	width: 1px;
	height: 26px;
	background: #f0f0f0;
`
const BottomDivider1 = styled.View`
	width: 100%;
	height: 9px;
	background: #f0f2f5;
`
import { TouchableOpacity } from 'react-native'
const Feed = ({data, myPost}) => {
	console.log('data In feed1: ', data._id)
	const [isLike, setLike] = useState(data.isLike)
	showMyPostOption = () => {
		console.log("thiS id:", data._id)
		this.myActionSheet.show()
	}
	showAnotherPostOption = () => {
		this.anotherActionSheet.show()
	}
	onActionMyPost = index => {
		switch (index) {
			case 0:
				console.log("delete id:", data._id)
				const res = newApi.deletePost(data._id)
			default:
				break
		}
	}
	const [numLike, setNumLike] = useState(Object.keys(data.like).length)
	return (
		<>
			<Container>
				<Header>
					<Row>
						<Avatar
							source={data.author.avatar.fileName}
						/>
						<View style={{ paddingLeft: 10 }}>
							<User>{data.author.username}</User>
							<Row>
								<Time>{data.createdAt}</Time>
							</Row>
						</View>
					</Row>
					<TouchableOpacity onPress={myPost ? this.showMyPostOption.bind(this) : this.showAnotherPostOption.bind(this)}>
					<Entypo
						name='dots-three-horizontal'
						size={15}
						color='#222121'
					/>
					</TouchableOpacity>
				</Header>
				<Post>
					{data.described}
				</Post>
				<FlatList
					data = {data.images}
					renderItem={({item}) => (
						<Photo source = {{uri:`http://192.168.1.4:8000/files/${item.fileName}`}}/>
					)}
				/>
				{/* <Photo source={{uri:`http://192.168.1.4:8000/files/${data.images[0].fileName}`}}/> */}
				<Footer>
					<FooterCount>
						<Row>
							<Button onPress = {  () => {
								const likePost = newApi.likePost(data._id).then((data) => {
									console.log('id like:', data._id)
									return data
								})
								.catch(function(error){
									console.log(error.message)
								})
								console.log('likepost', likePost)
								if (likePost && isLike) {
									setLike(false)
									setNumLike(numLike -1 )
								}
								else{
									setLike(true)
									setNumLike(numLike +  1)
								}
							}}>
								<AntDesign 
								name={isLike == false ? "hearto" : "heart" }
								size={24} 
								color= {isLike == false ? "gray" : "red" }/>
							</Button>
							<TextCount>{numLike}</TextCount>
							<Button>
								<MaterialCommunityIcons name="comment-multiple-outline" size={24} color="gray" />
							</Button>
							<TextCount>{data.countComments}</TextCount>
						</Row>
					</FooterCount>
					{/* <TouchableOpacity onPress={() => {AsyncStorage.removeItem('userToken');}}><Text>abc</Text></TouchableOpacity> */}
				</Footer>
				<BottomDivider />
			</Container>
			<ActionSheet
				ref={o => (this.myActionSheet = o)}
				options={['Xoá bài viết...', 'Sửa bài viết...', 'Huỷ...']}
				cancelButtonIndex={2}
				destructiveButtonIndex={1}
				onPress={index => {
					onActionMyPost(index)
				}}
			/>
			<ActionSheet
				ref={o => (this.anotherActionSheet = o)}
				options={['Báo cáo bài viết...', 'Huỷ... ']}
				cancelButtonIndex={1}
				destructiveButtonIndex={0}
				onPress={index => {
					this.showMyPostOption();
				}}
			/>
		</>
	
	)
}

export default Feed
