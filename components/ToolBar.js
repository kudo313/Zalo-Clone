import React from 'react'

import styled from 'styled-components/native'

import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import Avatar from './Avatar'
import { TouchableOpacity } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
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
const Input1 = styled.TouchableOpacity`
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
const MenuText2 = styled.Text`
	padding-left: 11px;
	padding-top: 17px;
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
const ToolBar = ({data, navigation}) => {
	return (
		<>
			
			<Container1>
				<Row1>
					<Avatar source={data.avatar.fileName} />
					<Input1 onPress={() => navigation.navigate('upPost')}>
						<MenuText2>
							Hôm nay bạn thế nào
						</MenuText2>
					</Input1>
				</Row1>
				
				<Divider1 />
				<Row1>
					<Menu1 onPress={() => navigation.navigate('upPost')}>
						<MaterialIcons
							name='photo-size-select-actual'
							size={20}
							color='#4CAF50'
						/>
						<MenuText1>Đăng ảnh</MenuText1>
					</Menu1>
					<Separator1 />
					<Menu1 onPress={() => navigation.navigate('upPost')}>
						<Ionicons name='ios-videocam' size={22} color='#F44337' />
						<MenuText1>Đăng video</MenuText1>
					</Menu1>
					<Separator1 />
				</Row1>
			</Container1>
			<BottomDivider1 />
		</>
	)
}

export default ToolBar
