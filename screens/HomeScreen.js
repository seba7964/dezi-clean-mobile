import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as React from 'react';
import { Alert, Keyboard, Image, View, StyleSheet, ImageBackground, Text } from 'react-native';
import { Header } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';


const initialValues = {
  //ime: '',
  image: ''
}


export default function HomeScreen() {
  askPermissionsAsyncCamera = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.LOCATION);
  };



  /*async function takeAndUploadPhotoAsync() {
    // Display the camera to the user and wait for them to take a photo or to cancel
    // the action
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });
  
    if (result.cancelled) {
      return;
    }
  
    // ImagePicker saves the taken photo to disk and returns a local URI to it
    let localUri = result.uri;
    let filename = localUri.split('/').pop();
  
    // Infer the type of the image
    let match = /\.(\w+)$/.exec(filename);
    let type = match ? `image/${match[1]}` : `image`;
  
    // Upload the image using the fetch and FormData APIs
    let formData = new FormData();
    // Assume "photo" is the name of the form field the server expects
    formData.append('photo', { uri: localUri, name: filename, type: type});
    
    
  
     fetch("http://dezi-clean.me/api/FileUploading/UploadFile", {
      method: 'POST',
      body: formData,
      header: {
        'content-type': 'multipart/form-data',
        
      },
      
    }).catch(error => console.log(error))
  } */


  function onSubmit(values){
// ImagePicker saves the taken photo to disk and returns a local URI to it

//console.log("seba",values);
//console.log("seba1",image);
debugger;
//TODO
/*_getLocationAsync();*/

//var seba1 = this.setState.location.latitude.toString();
//var seba = locationResult.location;
var index = [];

// build the index
for (var x in values) {
   index.push(x);
}
//console.log("seba1",values[index[1]]);
let localUri = values[index[0]];
let filename = localUri.split('/').pop();

// Infer the type of the image
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;

// Upload the image using the fetch and FormData APIs
let formData = new FormData();
// Assume "photo" is the name of the form field the server expects
formData.append('photo', { uri: localUri, name: filename, type: type});
formData.append('ime', values.ime);
formData.append('latitude', '345345345345345');
formData.append('longitude', '34535345');
formData.append('prezime', values.prezime);
formData.append('opis', values.opis);



 fetch("http://74378608.ngrok.io/api/FileUploading/UploadFile", {
  method: 'POST',
  body: formData,
  header: {
    'content-type': 'multipart/form-data',
    
  },
  
}).catch(error => console.log(error))
  }

  async function _pickImage(handleChange) {
    await this.askPermissionsAsyncCamera();
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3]
    })

    
    console.log(result)
    if (!result.cancelled) {
      handleChange(result.uri)
    }
  }

  useCameraHandler = async () => {
    await this.askPermissionsAsyncCamera();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result });
  };
//TODO
  /*_getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        locationResult: 'Permission to access location was denied',
        location,
      });
    }
 
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ locationResult: JSON.stringify(location), location, });
  };*/
  return (

    
    
    <View style={[styles.container]}>
      <Header
      statusBarProps={{ barStyle: 'light-content' }}
      barStyle="light-content" // or directly
      centerComponent={{ text: 'Prijava problema', style: { color: '#fff', fontStyle:'normal', fontSize:20 } }}
      containerStyle={{
      backgroundColor: '#32CD32',
      justifyContent: 'space-around',
      }}
      />
      <ImageBackground
          resizeMode={'stretch'} // or cover
          style={{flex: 1,width:'100%',height:'100%'}} // must be passed from the parent, the number may vary depending upon your screen size
          source={require('../assets/images/EQSm0O-WkAAbCfe.jpg')}
        >
        <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit.bind(this)}>
          {({ handleChange, handleSubmit, values}) => (
            <View>
              <TextInput
                style={[styles.textinputime]}
                onChangeText={handleChange('ime')}
                value={values.ime}
                label="Unesite ime"
                placeholder="npr. Pero"
              />
              <TextInput
                style={[styles.textinputprezime]}
                onChangeText={handleChange('prezime')}
                value={values.prezime}
                label="Unesite prezime"
                placeholder="npr. Perić"
              />
              <TextInput
                style={[styles.textinputopis]}
                multiline={true}
                numberOfLines={4}
                onChangeText={handleChange('opis')}
                value={values.opis}
                label="Opišite problem"
                placeholder="npr. Ovo je mjesto zagađenja"
              />
              
              <Button
                icon="add-a-photo" mode="contained" style={styles.button}
                onPress={() => {_pickImage(handleChange('image'))}}
              >Odaberi sliku</Button>
              
              {values.image && values.image.length > 0 ?
                <Image source={{ uri: values.image }} style={styles.imagesubmit} /> : null}
              <Button onPress={handleSubmit} style={styles.button}><Text style={style={color:'#fff'}}>Pošalji</Text></Button>
            </View>
          )}
        </Formik>
        </ImageBackground>
        
      </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use
        useful development tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/development-mode/'
  );
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/workflow/up-and-running/#cant-see-your-changes'
  );
}

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
}); */

const styles = StyleSheet.create({
  container: {
    // remove width and height to override fixed static size
    width: null,
    height: null,
    flex: 1,
    //backgroundColor: 'red',
  },
  content: {
  //paddingTop: 0,
   //padding: 0,
   //marginTop: 20,
   //width: '80%',
   //alignSelf: "center"
  },
  textinputime: {
    paddingTop: 0,
   padding: 0,
   marginTop: 15,
   width: '80%',
   alignSelf: "center",
   color:'red'
  },
  textinputprezime: {
    paddingTop: 0,
   padding: 0,
   marginTop: 25,
   width: '80%',
   alignSelf: "center"
  },
  textinputopis: {
    marginTop: 28,
   width: '80%',
   alignSelf: "center",
   height: 150,
  justifyContent: "flex-start"
  },
  button: {
    marginTop: 15,
    width: '80%',
    alignSelf: "center",
    backgroundColor: '#32CD32',
    color: 'red',
    textDecorationColor: 'red'
  },
  imagesubmit: {
    width: '80%',
    height:100,
    alignSelf: "center",
    marginTop: 10,
  }
});
