import React, {useState} from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { AuthContext } from './context';
export default Home = ({navigation}) => {
    const {signOut} = React.useContext(AuthContext);

    return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text>Home</Text>

            <TouchableOpacity onPress={() => {signOut()}}>
                <Text>Sign Out</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Change')}>
                <Text>Change Password</Text>
            </TouchableOpacity>
        </View>
    )
}