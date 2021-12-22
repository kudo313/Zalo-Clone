import React from 'react'

import styled from 'styled-components/native'
import Feather from 'react-native-vector-icons/Feather'
import Ionicons from 'react-native-vector-icons/Ionicons'
const Container = styled.View`
	width: 100%;
	height: 58px;
	padding: 0 0;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	background: #6F3DD2;
`
const Text = styled.Text`
	color: #fff;
	font-size: 16px;
	font-weight: normal;
	letter-spacing: -0.3px;
`
const Row = styled.View`
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
`
const Button = styled.TouchableOpacity`
	width: 42px;
	height: 42px;
	background: #6F3DD2;
	align-items: flex-start;
	justify-content: center;
	margin-left: 16px;
`

const UpPostAppBar = () => {
	return (
		<Container>
			<Row>
				<Button>
					<Ionicons name='arrow-back-outline' size={25} color='white' />
				</Button>
			</Row>
			<Row>
				<Button>
                    <Text>Đăng</Text>
				</Button>
			</Row>
		</Container>
	)
}

export default UpPostAppBar
