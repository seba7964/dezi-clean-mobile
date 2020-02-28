import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions, Image } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';

export default class LinksScreen extends React.Component {
//export default function LinksScreen() {

state = {
  markers: []
}

componentDidMount () {
  console.log(this.findCoordinates());
} 

    findCoordinates = async() => {
      try {
        let response = await fetch('https://01daf74a.ngrok.io/api/GetLocation/Location');
        let responseJson = await response.json();
        this.state.markers = responseJson;
        console.log(this.state.markers);
        this.setState({markers: this.state.markers}) 
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
      centerComponent={{ text: 'Mapa prijava', style: { color: '#fff', fontStyle:'normal', fontSize:20 } }}
      containerStyle={{
      backgroundColor: '#32CD32',
      justifyContent: 'space-around',
      }}
      />
      <MapView style={styles.container}
      showsUserLocation = {true}
      showsMyLocationButton = {true}
      initialRegion={{
        latitude:45.218818,
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
    >
    
    </MapView.Marker>
    </React.Fragment>
  ))}
      </MapView>
      
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
});
