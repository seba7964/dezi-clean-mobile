import * as WebBrowser from 'expo-web-browser';
import { ImagePicker } from 'expo';
import { Formik } from 'formik';
import { Button, TextInput } from 'react-native-paper';
import * as React from 'react';
import { Alert, Keyboard, Image, View, StyleSheet } from 'react-native';
//import React from react-native;
import {Permissions} from 'expo';


const initialValues = {
  title: '',
  image: ''
}


export default function HomeScreen() {
  askPermissionsAsync = async () => {
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);
  };
  function onSubmit(values){
       //List of form values
       console.log(values);
       Alert.alert(JSON.stringify(values));
       Keyboard.dismiss();
  }

  async function _pickImage(handleChange) {
    await this.askPermissionsAsync();
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
    await this.askPermissionsAsync();
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      base64: false,
    });
    this.setState({ result });
  };
  return (
    
    <View style={[styles.container, styles.content]}>
        <Formik 
          initialValues={initialValues} 
          onSubmit={onSubmit.bind(this)}>
          {({ handleChange, handleSubmit, values }) => (
            <View>
              <TextInput
                onChangeText={handleChange('title')}
                value={values.title}
                label="Title"
                placeholder="e.g My Awesome Selfie"
              />
              <Button
                icon="add-a-photo" mode="contained" style={styles.button}
                onPress={() => {_pickImage(handleChange('image'))}}
              >Pick an image from camera rolltest</Button>
              <Button onPress={this.useCameraHandler}>Slikaj fotku</Button>
              {values.image && values.image.length > 0 ?
                <Image source={{ uri: values.image }} style={{ width: 200, height: 200 }} /> : null}
              <Button onPress={handleSubmit} style={styles.button}>Submit</Button>
            </View>
          )}
        </Formik>
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
    flex: 1,
    backgroundColor: '#ecf0f1',
  },
  content: {
    paddingTop: 40,
    padding: 16,
  },
  button: {
    marginTop: 16,
  }
});
