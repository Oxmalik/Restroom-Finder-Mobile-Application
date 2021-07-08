import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import { Marker, Circle } from "react-native-maps";
import * as Location from 'expo-location';

export default function Map({ location }) {
   
  return (
    <View style={styles.container}>
      <MapView
        provider = "google"
        showUserLocation
        style={styles.map}
        initialRegion={location}
        userLocationUpdateInterval={100}
        followsUserLocation
        showsCompass
        showsBuildings
        showsTraffic
        loadingEnabled
        
      >
        <Marker
          key={0}
          coordinate={{ latitude: location.latitude, longitude: location.longitude }}
          title='You are here!'
        />
        <Circle center={{ latitude: location.latitude, longitude: location.longitude }}
          radius={300}
          fillColor= '#0FF'/>
        {location.data.map((res) => {
          return (
            <Marker
              key={res.id}
              coordinate={{ latitude: res.latitude, longitude: res.longitude }}
              pinColor='blue'
              title={res.name}
              description={ res.comment}
            />
          );
        })}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
