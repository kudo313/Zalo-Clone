import React, { useEffect, useState, useMemo } from 'react';
import { ActivityIndicator, View, Text, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import Home from './components/Home'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './screens/Login';
import Screen from './screens/ScreenLoginRegister';
import Register from './screens/Register';
const Stack = createStackNavigator();
import { AuthContext } from './components/context';
import ChangePass from './screens/ChangePassword'
import apiClient from './api/client'
import MainStackScreens from './stacks/MainStackScreens';
export default App = () => {
 
  const initialLoginState = {
    isLoading: true,
    // id: null,
    // phone: null,
    userToken: null,
  };


  const loginReducer = (prevState, action) => {
    switch (action.type) {
      case 'RETRIEVE_TOKEN':
        return {
          ...prevState,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGIN':
        return {
          ...prevState,
          // id: action.id,
          // phone: action.phone,
          userToken: action.token,
          isLoading: false,
        };
      case 'LOGOUT':
        return {
          ...prevState,
          // id: null,
          // phone: null,
          userToken: null,
          isLoading: false,
        };
      case 'REGISTER':
        return {
          ...prevState,
          // id: action.id,
          // phone: action.phone,
          userToken: action.token,
          isLoading: false,
        };
    }
  }

  const [loginState, dispatch] = React.useReducer(loginReducer, initialLoginState);

  const authContext = React.useMemo(() => ({

    signIn: async (data) => {
      
      const userToken = data.token;
      const userId = data.data.id;
      console.log(userId);

      try {
     
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userId', userId);
      } catch (e) {
        console.log(e);
      }

      dispatch({ 
        type: 'LOGIN', 
        token: userToken 
      });
    },

    signOut: async () => {

      try {
        await AsyncStorage.removeItem('userToken');
        await AsyncStorage.removeItem('userId');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'LOGOUT' });
    },

    signUp: async (data) => {
      const userToken = data.token;
      const userId = data.data.id;
      const phone = data.data.phone;
      try {
        await AsyncStorage.setItem('userToken', userToken);
        await AsyncStorage.setItem('userId', userId);
      } catch (e) {
        console.log(e);
      }

      dispatch({ 
      type: 'REGISTER',
       token: userToken });
    },
    
    changePassword: async (data, navigation) => {
      //  L???y user token ????? d??ng Auth trong Server
      // console.log("gads", loginState.userToken, loginState.phone, loginState.id);
      const userToken = await AsyncStorage.getItem('userToken');
      try {
        const res = await apiClient.post('/users/change-password', {
          ...data
        },
          {
            headers: {
              authorization: "token " + userToken,
            }
          }
        );

        if (res.status == 200) {
          Alert.alert('Th??nh c??ng!' , 'B???n ???? ?????i m???t kh???u th??nh c??ng', [
            { text: 'Okay', onPress: () => navigation.navigate('Home') }
          ]);
        }
      }
      catch (e) {

        Alert.alert('Phi??n ???? h???t h???n!', 'Vui l??ng ????ng nh???p l???i', [
          {
            text: 'Okay', 
            onPress: async () => {
              try {
                await AsyncStorage.removeItem('userToken');
              } catch (e) {
                console.log(e);
              }
              dispatch({ type: 'LOGOUT' });
            }
          }

        ]);
      }
    }
  }), []);


  useEffect(() => {
    setTimeout(async () => {
      let userToken;
      userToken = null;
      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        console.log(e);
      }
      dispatch({ type: 'RETRIEVE_TOKEN', token: userToken });
    }, 1000);
  }, []);

  // if (loginState.isLoading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large"></ActivityIndicator>
  //     </View>
  //   );
  // }



  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        {loginState.userToken != null ?
          (<MainStackScreens/>)
          : (<Stack.Navigator>
            <Stack.Screen
              name="ScreenLoginRegister"
              component={Screen}
              options={{
                headerShown: null
              }}
            />


            <Stack.Screen
              name="Login"
              component={Login}
              options={{ title: '????ng nh???p' }}
            />
            <Stack.Screen
              name="Register"
              component={Register}
              options={{ title: 'T???o t??i kho???n' }}
            />
          </Stack.Navigator>)}
      </ NavigationContainer>
    </AuthContext.Provider>
  )
}