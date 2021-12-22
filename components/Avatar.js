import React from 'react'

import styled from 'styled-components/native'

const Container = styled.View`
	width: 40px;
	height: 40px;
	position: relative;
`
const User = styled.Image`
	width: 40px;
	height: 40px;
	border-radius: 20px;
	border-color: #1777f2;
	border-width: ${props => (props.story ? '3px' : 0)};
`
const UserActive = styled.View`
	width: 15px;
	height: 15px;
	border-radius: 8px;
	background: #4bcb1f;
	position: absolute;
	bottom: -2px;
	right: -2px;
	border-width: 2px;
	border-color: #ffffff;
`

const Avatar = ({ source, online, story }) => {
	console.log(`http://192.168.1.4:8000/files/${source}`)
	return (
		<Container>
			<User source={{uri:`http://192.168.1.4:8000/files/${source}`}} story={story} />
			{online && <UserActive />}
		</Container>
	)
}

export default Avatar
