import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';
import { AuthSession } from 'expo';
import Constants from 'expo-constants';

//const deviceId = Expo.Constants.deviceId;

export default class LinksScreen extends React.Component {
  //export default function LinksScreen() {

  state = {
    markers: []
  }

 

  componentDidMount() {
    this.findCoordinates().then(setInterval(() => {
      this.findCoordinates();
    }, 100000))
  }

  findCoordinates = async () => {
    try {
      let response = await fetch('https://735170e247e4.ngrok.io/api/GetLocation/Location');
      let responseJson = await response.json();
      this.state.markers = responseJson;
      console.log(this.state.markers);
      this.setState({ markers: this.state.markers })
    } catch (error) {
      console.error(error);
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Header
          statusBarProps={{ barStyle: 'light-content' }}
          barStyle="light-content" // or directly
          centerComponent={{ text: 'Mapa prijava', style: { color: '#fff', fontStyle: 'normal', fontSize: 20 } }}
          containerStyle={{
            backgroundColor: '#32CD32',
            justifyContent: 'space-around',
          }}
        />
        <MapView style={styles.container}
          showsUserLocation={true}
          showsMyLocationButton={true}
          initialRegion={{
            latitude: 45.218818,
            longitude: 13.928048,
            latitudeDelta: 1,
            longitudeDelta: 1
          }}
        >
          {this.state.markers.map(marker => (
            <React.Fragment key={marker.id}>
              <MapView.Marker
                coordinate={marker.coordinates}
                title={marker.title}
                pinColor={marker.color}
              >
              </MapView.Marker>
            </React.Fragment>
          ))}
        </MapView>
          <Image source={require('../assets/images/legenda2.png')} style={styles.legend} />
      </View>
    );
  }
}

LinksScreen.navigationOptions = {
  //title: 'Mapa prijava',
  header: null
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //  paddingTop: 15,
    // backgroundColor: '#fff',
  },
  legendContainer: {
    position: 'absolute',
    left: 200,
    right: 0,
    bottom: 0,
    height: 65,
    width: 210,
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: 'transparent'
  },
  legend: {
    bottom: 0,
    right: 0,
    margin: 'auto',
    //top: 0,
    //right: 0,
    height: 125,
    width: 125,
    flexDirection: 'column',
   // width: '100%',
   // flexDirection: 'row',
   // resizeMode: 'contain',
    position: "absolute"
  }
});

