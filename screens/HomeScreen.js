import * as WebBrowser from 'expo-web-browser';
import * as ImagePicker from 'expo-image-picker';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as React from 'react';
import { Alert, Keyboard, Image, View, StyleSheet, ImageBackground, Text , Picker, TouchableOpacity, PickerIOS } from 'react-native';
import { Header } from 'react-native-elements';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import SearchableDropdown from 'react-native-searchable-dropdown';


const initialValues = {
  //ime: '',
  image: '',
  location: '',
  kategorija: ''
}


var items = [
  //name key is must.It is to show the text in front
  { id: 1, name: 'Dezinfekcija' },
  { id: 2, name: 'Dezinsekcija' },
  { id: 3, name: 'Deratizacija' },
];


export default function HomeScreen() {
  askPermissionsAsyncCamera = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
    await Permissions.askAsync(Permissions.LOCATION);
  };

  /*
  state = {
    location: '123',
    //errorMessage: ''
  } */
  
function onSubmit(values){
  var index = [];

// build the index
for (var x in values) {
   index.push(x);
}
let localUri = values[index[0]];
let lokacijajson = values[index[1]];
let kategorija = values[index[2]];

let filename = localUri.split('/').pop();
let lokacija = JSON.parse(lokacijajson);

var latitude = lokacija.coords.latitude;
var longitude = lokacija.coords.longitude;
// Infer the type of the image
let match = /\.(\w+)$/.exec(filename);
let type = match ? `image/${match[1]}` : `image`;

// Upload the image using the fetch and FormData APIs
let formData = new FormData();
// Assume "photo" is the name of the form field the server expects
formData.append('photo', { uri: localUri, name: filename, type: type});
formData.append('naslov',values.naslov);
formData.append('ime', values.ime);
formData.append('latitude', latitude);
formData.append('longitude', longitude);
formData.append('prezime', values.prezime);
formData.append('opis', values.opis);
formData.append('kategorija', kategorija.name);

fetch("http://89f3462f.ngrok.io/api/FileUploading/UploadFile", {
  method: 'POST',
  body: formData,
  header: {
    'content-type': 'multipart/form-data',
  },
}).then(res => res.json())
.catch(error => console.log(error))
.then(res => console.log('Sucess:', res))
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

  _getLocation = async () => {
    const {status} = await Permissions.askAsync(Permissions.LOCATION);

    if(status !== 'granted') {
      console.log('PERMISSION NOT GRANTED!');
    }
    const location = await Location.getCurrentPositionAsync({});
    //this.setState({  location, });
    return location;
};

/*findCoordinates = async () => {
  debugger;
 await this.navigator.geolocation.getCurrentPosition(
    
    position => {
      debugger;
      const location = JSON.stringify(position);

      setState({ location });
    },
    error => Alert.alert(error.message),
    { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
  );
}; */

async function findCoordinates (handleChange) {
  await this.navigator.geolocation.getCurrentPosition(
  position => {
    const location = JSON.stringify(position);
    handleChange(location);
  }
  )};


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




    <SearchableDropdown
          onTextChange={text => console.log(text)}
         // onChangeText={handleChange('kategorija')}
          //On text change listner on the searchable input
          onItemSelect={handleChange('kategorija')}
         // onItemSelect={item => alert(JSON.stringify(item))}
          //value={items.name}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 10, width: '85%', alignSelf: "center"}}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //single dropdown item's text style
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '100%',
            
          }}
          items={items}
          //mapping of item array
          defaultIndex={1}
          //default selected item index
          placeholder="Odaberite kategoriju"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />



              <TextInput
                style={[styles.textinputnaslov]}
                onChangeText={handleChange('naslov')}
                value={values.naslov}
                label="Unesite naslov"
                placeholder="npr. ležište komaraca"
              />
                            <TextInput
                style={[styles.textinputopis]}
                multiline={true}
                //numberOfLines={4}
                onChangeText={handleChange('opis')}
                value={values.opis}
                label="Opišite problem"
                placeholder="npr. Ovo je mjesto zagađenja"
              />
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

              <Button
                icon="add-a-photo" mode="contained" style={styles.button}
                onPress={() => {_pickImage(handleChange('image')), findCoordinates(handleChange('location'))}}
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
  textinputnaslov: {
   // paddingTop: 5,
  // padding: 0,
   marginTop: 0,
   width: '80%',
   alignSelf: "center",
   textDecorationColor:"red",
  },
  textinputopis: {
    marginTop: 10,
   width: '80%',
   alignSelf: "center",
  // height: 80,
  justifyContent: "flex-start"
  },
  textinputime: {
  //  paddingTop: 0,
  // padding: 0,
   marginTop: 10,
   width: '80%',
   alignSelf: "center",
   color:'red'
  },
  textinputprezime: {
  //  paddingTop: 0,
 //  padding: 0,
   marginTop: 10,
   width: '80%',
   alignSelf: "center"
  },
  button: {
    marginTop: 10,
    width: '80%',
    alignSelf: "center",
    backgroundColor: '#32CD32',
    color: 'red',
    textDecorationColor: 'red'
  },
  imagesubmit: {
    marginTop: 10,
    width: '80%',
    height:100,
    alignSelf: "center",
    
  }
});
