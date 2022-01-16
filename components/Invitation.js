import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Sender from './Sender';
import Receiver from './Receiver';
import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';


const Tab = createMaterialTopTabNavigator();

const Invitation = () => {
    return(
        <Tab.Navigator>
          <Tab.Screen
            name={"ĐÃ NHẬN"}
            component={Receiver}
          />
          <Tab.Screen
            name={"KẾT BẠN"}
            component={Sender}
          />
        </Tab.Navigator>
    )
  }

export default Invitation;