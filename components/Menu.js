import React from 'react'

import styled from 'styled-components/native'

import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
const Container = styled.View`
	width: 100%;
	height: 58px;
	padding: 0 0;
	align-items: center;
	flex-direction: row;
	justify-content: space-between;
	background: #fd77e4;
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
	justify-content: center;
    margin-left: 20px;
    margin-right: 20px;
`
const Button = styled.TouchableOpacity`
	width: 42px;
	height: 42px;
	background: #fd77e4;
	align-items: flex-start;
	justify-content: center;
	margin-left: 16px;
`

const Menu = () => {
	return (
		<Container>
			<Row>
				<Button>
                    <AntDesign name="message1" size={25} color="white" />
				</Button>
            </Row>
            <Row>
                <Button>
                    <AntDesign name="contacts" size={25} color="white" />
                </Button>
            </Row>
            <Row>
                <Button>
                    <Feather name="clock" size={25} color="white" />
                </Button>
            </Row>
            <Row>
                <Button>
                    <MaterialCommunityIcons name="face-profile" size={25} color="white" />
                </Button>
			</Row>
		</Container>
	)
}

export default Menu
