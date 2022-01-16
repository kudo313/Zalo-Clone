import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons  from "react-native-vector-icons/Ionicons";

import  PostScreen   from "../screens/PostScreen";
import Menu from "../components/Menu";
import Story from "../components/Story";
import Feed from "../components/Feed";
import UploadPostScreen from "../screens/UploadPostScreen";
import TestScreen from "../screens/TestScreen";
import PostStackScreen from "./PostStackScreen";
import ChatNavigation from "../navi/ChatNavigation";
import AddFriend from "../screens/AddFriend";
export default MainStackScreens = () => {
    const MainStack = createBottomTabNavigator();
    const screenOptions1 = ({ route }) => ({
        tabBarIcon: ({ focused }) => {
            let iconName = "ios-chatbox-ellipses-outline";
            switch (route.name) {
                case "Message":
                    iconName = "ios-chatbox-ellipses-outline";
                    break;
                case "Call":
                    iconName = "ios-call-outline";
                    break;
                case "Diary":
                    iconName = "ios-brush-outline";
                    break;
                case "Profile":
                    iconName = "ios-person-outline";
                    break;
                default:
                    iconName = "ios-chatbox-ellipses-outline";
            }

            return <Ionicons name={iconName} size={24} color={focused ? "#ffffff" : "#666666"} />;
        },
    });

    return (
        <MainStack.Navigator 
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused  }) => {
                  const icons = {
                    Message: 'ios-chatbox-ellipses-outline',
                    Diary: 'ios-brush-outline',
                    Call: 'ios-call-outline',
                    Profile: 'ios-person-outline',
                  };
            
                  return (
                    <Ionicons
                      name={icons[route.name]}
                      color={focused ? "#582138" : "#666666"}
                      size={24}
                    />
                  );
                },
                "tabBarShowLabel": false,
                "tabBarStyle": [
                    {
                    "display": "flex"
                    },
                    null
                ],
                backgroundColor: "#124122",
                headerShown: false,
              })}
        >
            <MainStack.Screen name="Message" component={PostStackScreen} />
            <MainStack.Screen name="Call" component={ChatNavigation} />
            <MainStack.Screen name="Diary" component={AddFriend} />
            <MainStack.Screen name="Profile" component={PostScreen} />

        </MainStack.Navigator>
    );
};
