import React from 'react';
import { Component, useState } from 'react';
import { Text, View, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { Formik } from 'formik';
import * as Yup from 'yup';
import FormContainer from '../components/FormContainer';
import apiClient from '../api/client'
import { AuthContext } from "../components/context";

const validationSchema = Yup.object({
  username: Yup.string()
    .trim()
    // .min(3, 'Invalid name!')
    .required('Name is required!'),
  phonenumber: Yup.string().trim()
  .length(10, 'Invalid phonenumber!')
    .required('Phonenumber is required!')
    .test('Invalid phone', 'Invalid phonenumber!', (val) => {
      try {return val[0] == 0;}
      catch (e) {

      }
    }),
    password: Yup.string()
    .trim()
    .min(6, 'Password is too short!')
    .max(10, 'Password is too long!')
    .required('Password is required!')
    .notOneOf([Yup.ref('phonenumber'), null], "SĐT và mật khẩu không được trùng nhau!"),
  confirmPassword: Yup.string().equals(
    [Yup.ref('password'), null],
    'Password does not match!'
  ),
});

export default function RegisterName({ navigation }) {

  const userInfo = {
    username: '',
    phonenumber: '',
    password: '',
    confirmPassword: '',
  };
  const { signUp } = React.useContext(AuthContext);
  const register = async (values, formikActions) => {
    try {
      const res = await apiClient.post('/users/register', {
        ...values,
      });
      // console.log(res.data)
      if (res.status == 201) {
        console.log(res.data)
        signUp(res.data);
      }
    } catch (e) {
      Alert.alert('Invalid!', 'SĐT đã được đăng ký', [
        { text: 'Okay' }
      ]);
      return;
    }
  };
  return (
    <FormContainer>
      <Formik
        initialValues={userInfo}
        validationSchema={validationSchema}
        onSubmit={register}
      >
        {({
          handleChange, handleBlur, handleSubmit, values, touched, errors
        }) => {
          const { username, phonenumber, password, confirmPassword } = values;
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
                      Vui lòng điền đầy đủ thông tin của bạn
                    </Text>
                  </View>

                  <View style={{ marginLeft: 15, marginRight: 15 }}>
                    <TextInput
                      style={{
                        height: 40,
                        fontSize: 15,
                        borderColor: '#6F3DD2',
                        borderBottomWidth: 1,
                      }}
                      placeholder="Tên đầy đủ"
                      autoFocus={true}
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={username}
                      returnKeyType="done"
                      onSubmitEditing={Keyboard.dismiss}

                    />
                    {!touched.username && !errors.username ? <View style={{ margin: 10 }}></View> :
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.username}</Text>

                    }


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
                    {!touched.password && !errors.password ? <View style={{ margin: 10 }}></View> :
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.password}</Text>

                    }
                    <TextInput style={{
                      height: 40,
                      fontSize: 15,
                      borderColor: '#6F3DD2',
                      borderBottomWidth: 1
                    }}
                      placeholder='Xác nhận mật khẩu'
                      returnKeyType='done'
                      secureTextEntry={true}
                      onSubmitEditing={Keyboard.dismiss}
                      onChangeText={handleChange('confirmPassword')}
                      onBlur={handleBlur('confirmPassword')}
                      value={confirmPassword}
                    />
                    {!touched.confirmPassword && !errors.confirmPassword ? <View style={{ margin: 10 }}></View> :
                      // <Animatable.View animation="fadeInLeft" duration={500}>
                      <Text style={{ fontSize: 14, color: 'red' }}>{errors.confirmPassword}</Text>

                    }
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

