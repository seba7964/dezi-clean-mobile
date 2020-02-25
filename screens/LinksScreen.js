import React from 'react';
import { ScrollView, StyleSheet, Text, View, Dimensions } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import MapView from 'react-native-maps';
import { Header } from 'react-native-elements';

export default class LinksScreen extends React.Component {
//export default function LinksScreen() {
  render() {
    this.state = {
      markers: [{
        id:1,
        title: 'hello1',
        coordinates: {
          latitude: 45.278818,
          longitude: 13.998048
        },
      },
      {
        id:2,
        title: 'hello',
        coordinates: {
          latitude: 45.238818,
          longitude: 13.948048
        },  
      }]
    }
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
    />
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
