// import React from 'react'
import UpPostAppBar from '../components/UpPostAppBar'
import styled from 'styled-components/native'
import newApi from '../api/newApi';

// import { MenuProvider } from 'react-native-popup-menu';
// // somewhere in your app
// import {
//   Menu,
//   MenuOptions,
//   MenuOption,
//   MenuTrigger,
// } from 'react-native-popup-menu';
// import { View } from 'react-native';
// import { Text } from 'react-native';
const Input = styled.TextInput`
	height: 200px;
	width: 100%;
	padding: 0 8px;
    textAlign: 'left';
`
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
const Text1 = styled.Text`
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

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-crop-picker';
import ActionSheet from 'react-native-actionsheet';
import { useState, useEffect } from 'react'
import { useIsFocused } from '@react-navigation/native';

export default UploadPostScreen =  ({navigation}) =>{
  
  // constructor(props) {
  //   super(props)
  //   this.state = {
  //     logs: 'ahihi',
  //     selectedPhotoIndex: 0,
  //     localPhotos: [],
  //     described: ''
  //   };
  //   this.onDoUploadPress = this.onDoUploadPress.bind(this);
  // }
  const [selectedPhotoIndex, setSelected] = useState(0)
  const [localPhotos, setLocalPhotos] = useState([])
  const [described, setDescribed] = useState('')
  onPressAddPhotoBtn = () => {
    this.ActionSheetSelectPhoto.show();
  };
  showActionSheet = index => {
    setSelected(index)
    this.ActionSheet.show();
  };

  onDoUploadPress = () => {
    // const { localPhotos } = this.state;
    if (localPhotos && localPhotos.length > 0) {
      const images = localPhotos.map((image) => {
        return "data:image/jpeg;base64," + image.data
      })
      // console.log(this.state.described)
      // const res = newApi.upPost(this.state.described, images)
      console.log(described)
      const res = newApi.upPost(described, images)
      navigation.navigate('post')
      // axios
      //   .post('https://api.tradingproedu.com/api/v1/fileupload', formData)
      //   .then(response => {
      //     this.setState({ logs: JSON.stringify(response.data) });
      //   })
      //   .catch(error => {
      //     alert(JSON.stringify(error));
      //   });
      
    } else {
      alert('No photo selected');
    }
  }

  onActionDeleteDone = index => {
    if (index === 0) {
      // const array = [...this.state.localPhotos];
      const array = [...localPhotos];
      // array.splice(this.state.selectedPhotoIndex, 1);
      array.splice(selectedPhotoIndex, 1);
      // this.setState({ localPhotos: array });
      setLocalPhotos(array)
    }
  };
  onActionSelectPhotoDone = index => {
    switch (index) {
      case 0:
        ImagePicker.openCamera({
          includeBase64: true,
        }).then(image => {
          // this.setState({
          //   localPhotos: [...this.state.localPhotos, image]
          // });
          setLocalPhotos([...localPhotos, image])
        });
        break;
      case 1:
        ImagePicker.openPicker({
          maxFiles: 10,
          mediaType: 'photo',
          includeBase64: true,
        }).then(image => {
          // this.setState({
          //   localPhotos: [...this.state.localPhotos, image]
          // });
          setLocalPhotos([...localPhotos, image])
          ;
        }).catch(error => {
          alert(JSON.stringify(error));
        });
        break;
      default:
        break;
    }
  };

  renderListPhotos = localPhotos => {
    const photos = localPhotos.map((photo, index) => (
      <TouchableOpacity key={index}
        onPress={() => {
          this.showActionSheet(index);
        }}
      >
        <Image style={styles.photo} source={{ uri: photo.path }} />
      </TouchableOpacity>
    ));

    return photos;
  };

  renderSelectPhotoControl = localPhotos => {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionTitle}>Select photos</Text>
        <ScrollView style={styles.photoList} horizontal={true}>
          {this.renderListPhotos(localPhotos)}
          <TouchableOpacity onPress={this.onPressAddPhotoBtn.bind(this)}>
            <View style={[styles.addButton, styles.photo]}>
              <Text style={styles.addButtonText}>+</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
      </View>
    );
  };

    return (
      <Fragment>
            {/* <UpPostAppBar/>
            <Input placeholder = "Bạn đang nghĩ gì?"/> */}
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <Container>
            <Row>
              <Button  onPress={() => navigation.navigate('post')}>
                <Ionicons name='arrow-back-outline' size={25} color='white' />
              </Button>
            </Row>
            <Row>
              <Button onPress={this.onDoUploadPress}>
                <Text1>Đăng</Text1>
              </Button>
            </Row>
          </Container>
          <TextInput placeholder = "Bạn đang nghĩ gì?" 
            textAlignVertical='top' textAlign='left' style = {styles.input}
            // onChangeText={text => this.setState({described: text})}
            onChangeText={text => setDescribed(text)}
          />
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              {/* {this.renderSelectPhotoControl(this.state.localPhotos)} */}
              {this.renderSelectPhotoControl(localPhotos)}
              {/* <View style={styles.sectionContainer}>
                <TouchableOpacity onPress={this.onDoUploadPress}>
                  <Text style={styles.sectionTitle}>Upload now</Text>
                </TouchableOpacity>
              </View> */}
              {/* <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Logs</Text>
                <TextInput multiline numberOfLines={10} style={{ height: 250, borderColor: 'gray', borderWidth: 1 }}
                  value={this.state.logs}
                />
              </View> */}
            </View>
          </ScrollView>
          <ActionSheet
            ref={o => (this.ActionSheet = o)}
            title={'Confirm delete photo'}
            options={['Confirm', 'Cancel']}
            cancelButtonIndex={1}
            destructiveButtonIndex={0}
            onPress={index => {
              this.onActionDeleteDone(index);
            }}
          />
          <ActionSheet
            ref={o => (this.ActionSheetSelectPhoto = o)}
            title={'Select photo'}
            options={['Take Photo...', 'Choose from Library...', 'Cancel']}
            cancelButtonIndex={2}
            destructiveButtonIndex={1}
            onPress={index => {
              this.onActionSelectPhotoDone(index);
            }}
          />
        </SafeAreaView>
      </Fragment>
    );
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  section: {
    backgroundColor: Colors.white
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10
  },
  addPhotoTitle: {

    fontSize: 15,

    fontWeight: 'bold'
  },
  photoList: {
    height: 70,
    marginTop: 15,
    marginBottom: 15,
    marginRight: 10
  },
  photo: {
    marginRight: 10,
    width: 70,
    height: 70,
    borderRadius: 10
  },

  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3399cc'
  },
  photoIcon: {
    width: 50,
    height: 50
  },
  addButtonContainer: {
    padding: 15,
    justifyContent: 'flex-end'
  },
  addButtonText: {
    color: Colors.white,
    fontWeight: 'bold',
    fontSize: 48
  },
  input: {
    height: 200,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

