import React, { useMemo } from "react";
import { Component, useState } from "react";
import {
  Text, View, TextInput, Keyboard, TouchableOpacity, StyleSheet, Dimensions, TouchableWithoutFeedback, Alert
} from "react-native";
// import Icon from 'react-native-vector-icons/Feather';
import Icon from 'react-native-vector-icons/AntDesign';
import { AuthContext } from "../components/context";
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from '../components/FormContainer';
import apiClient from '../api/client'

export default function Login({ navigation}) {
  
const validationSchema = Yup.object({
  phonenumber: Yup.string().trim()
    .length(10, 'Invalid phonenumber!')
    .required('Phonenumber is required!')
    .test('Invalid phone', 'Invalid phonenumber!', (val) => {
      try {return val[0] == 0;}
      catch (e) {
        
      }
    })
    ,
  password: Yup.string()
    .trim()
    .min(6, 'Password is too short!')
    .max(10, 'Password is too long!')
    .required('Password is required!')
    .notOneOf([Yup.ref('phonenumber'), null], "SĐT và mật khẩu không được trùng nhau!"),
});

  const userInfo = {
    phonenumber: '0000000000',
    password: ''
  };
  const { signIn } = React.useContext(AuthContext);

  const login = async (values, formikActions) => {
    try {
      const res = await apiClient.post('/users/login', {
        ...values,
      });
      if (res.status == 200) {
        // console.log(res.data.token)
        signIn(res.data);
      }
    }
    catch (e) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        { text: 'Okay' }
      ]);
      
      return;
    }
  }
  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        // validationSchema={validationSchema}
        onSubmit={login}
      >
        {({
          handleChange, handleBlur, handleSubmit, values, touched, errors
        }) => {
          const { phonenumber, password } = values;
          return (
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
              <View style={{ flex: 1 }}>
                <View style={{ flex: 95 }}>
                  <View
                    style={{
                      // flex:1,
                      height: 40,
                      backgroundColor: '#D4D4D4',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 13,
                        fontWeight: 'bold',
                        marginLeft: 15,
                      }}>
                      Vui lòng nhập số điện thoại và tài khoản để đăng nhập
                    </Text>
                  </View>

                  <View style={{ marginLeft: 15, marginRight: 15 }}>

                    <TextInput style={{
                      height: 40,
                      fontSize: 15,
                      borderColor: '#6F3DD2',
                      borderBottomWidth: 1
                    }}
                      keyboardType='numeric'
                      placeholder='Số điện thoại'
                      returnKeyType='done'
                      onSubmitEditing={Keyboard.dismiss}
                      onChangeText={handleChange('phonenumber')}
                      onBlur={handleBlur('phonenumber')}
                      value={phonenumber}
                    />

                    {!touched.phonenumber && !errors.phonenumber ? <View style={{ margin: 10 }}></View> :
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.phonenumber}</Text>

                    }

                    <TextInput style={{
                      height: 40,
                      fontSize: 15,
                      borderColor: '#6F3DD2',
                      borderBottomWidth: 1
                    }}

                      placeholder='Mật khẩu'
                      returnKeyType='done'
                      secureTextEntry={true}
                      onSubmitEditing={Keyboard.dismiss}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={password}

                    />
                    
                    {!touched.password && !errors.password ? null :
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.password}</Text>

                    }
                    {/* {!touched.confirmPassword && !errors.confirmPassword ? <View style={{ margin: 10 }}></View> :
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.confirmPassword}</Text>

                    } */}
                  </View>
                </View>
                <View style={{ flex: 10, flexDirection: 'row-reverse', }}>
                  <TouchableOpacity onPress={handleSubmit}

                  // onPressIn={() => navigation.navigate('OtpSignUp')}
                  >
                    <View style={{ backgroundColor: '#6F3DD2', borderRadius: 20, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
                      <Icon name="arrowright" size={24} color="white" />
                    </View>

                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          )
        }}
      </Formik>
    </FormContainer>

  );

}
//     const [phone, setPhone] = useState('');
//     const [pass, setPass] = useState('');
//     const [hidePass, setHidePass] = useState(true);
//     const [isValidPhone, setValidPhone] = useState(true);
//     const [isValidPassWord, setValidPassWord] = useState(false);

//     const { signIn } = React.useContext(AuthContext);

//     const loginHandle = (phone, password) => {
//         const foundUser = Users.filter( item => {
//             return phone == item.phone && password == item.password;
//         } );

//         if ( phone.length == 0 || password.length == 0 ) {
//             Alert.alert('Wrong Input!', 'Phone or password field cannot be empty.', [
//                 {text: 'Okay'}
//             ]);
//             return;
//         }

//         if ( foundUser.length == 0 ) {
//             Alert.alert('Invalid User!', 'Phone or password is incorrect.', [
//                 {text: 'Okay'}
//             ]);
//             return;
//         }
//         signIn(foundUser);
//     }
//     const handleValidPhone = (val) => {
//         if (val.trim().length >= 12) {

//             setValidPhone(true)

//         } else {
//             setValidPhone(false)
//         }
//     }

//     const handleValidPassWord = (val) => {
//         if (val.trim().length >= 6) {

//             setValidPassWord(true)

//         } else {
//             setValidPassWord(false)
//         }
//     }


//     return (
//         <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
//             <View style={styles.container}>
//                 <View style={{
//                     height: 40,
//                     backgroundColor: '#D4D4D4',
//                     justifyContent: 'center',

//                 }}>
//                     <Text style={{ color: '#000000', fontSize: 13, fontWeight: 'bold', marginLeft: 15 }}>Vui lòng nhập số điện thoại và tài khoản để đăng nhập</Text>
//                 </View>

//                 <View style={{ marginLeft: 15, marginRight: 15, }}>
//                     <TextInput style={styles.textInput}
//                         keyboardType='phone-pad'
//                         placeholder='Số điện thoại'
//                         placeholderTextColor='red'
//                         autoFocus={true}
//                         value={phone}
//                         onChangeText={text => setPhone(text)}
//                         returnKeyType='done'
//                         onSubmitEditing={Keyboard.dismiss}
//                         onEndEditing={(e) => handleValidPhone(e.nativeEvent.text)}
//                     />
//                     {
//                         !!phone && (
//                             <TouchableOpacity style={styles.resetPhone} onPress={() => setPhone('')}>
//                                 <Icon1 name="close" size={20} color="grey" />
//                             </TouchableOpacity>
//                         )
//                     }
//                     {isValidPhone ? <View style={{ margin: 10 }}></View> :
//                         <Animatable.View animation="fadeInLeft" duration={500}>
//                             <Text style={styles.errorMsg}>Số điện thoại sai vui lòng nhập lại</Text>
//                         </Animatable.View>
//                     }
//                     <TextInput style={styles.textInput}
//                         placeholderTextColor='grey'
//                         keyboardType='default'
//                         placeholder='Mật khẩu'
//                         secureTextEntry={true}
//                         value={pass}
//                         onChangeText={text => setPass(text)}
//                         secureTextEntry={hidePass}
//                         onEndEditing={(e) => handleValidPassWord(e.nativeEvent.text)}
//                     />

//                     <TouchableOpacity style={styles.hidePass} onPress={() => setHidePass(!hidePass)}>
//                         <Text>
//                             {hidePass ? <Icon name="eye-off" size={20} color="grey" /> : <Icon name="eye" size={20} color="grey" />}
//                         </Text>
//                     </TouchableOpacity>

//                     {isValidPassWord ? null :
//                         <Animatable.View animation="fadeInLeft" duration={500}>
//                             <Text style={styles.errorMsg}>Password must be 6 characters long.</Text>
//                         </Animatable.View>
//                     }

//                     <Text style={{ marginTop: 15 }}>Lấy lại mật khẩu</Text>
//                 </View>
//                 <View style={{ flex: 10, flexDirection: 'row-reverse', }}>
//                     <TouchableOpacity onPress={() => { loginHandle(phone, pass) }}>
//                         <View style={{ backgroundColor: '#6F3DD2', borderRadius: 20, height: 35, width: 35, justifyContent: 'center', alignItems: 'center', marginRight: 20 }}>
//                             <Icon1 name="arrowright" size={24} color="white" />
//                         </View>

//                     </TouchableOpacity>
//                 </View>

//             </View>
//         </TouchableWithoutFeedback>

//     );

// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    height: 40,
    fontSize: 15,
    borderColor: '#6F3DD2',
    borderBottomWidth: 1
  },
  resetPhone: {
    position: 'absolute',
    right: 5,
    top: 14
  },
  hidePass: {
    position: 'absolute',
    right: 5,
    top: 70
  },
  errorMsg: {
    color: '#FF0000',
    fontSize: 14,
  },
})
