import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Alert,Button, Platform } from "react-native";
import { Marker, Circle } from "react-native-maps";
import * as Location from "expo-location";


var setState;

var setStatePermission ;


var startLocation = {
  latitude: 37.78825,
  longitude: -122.4324,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};

export var userLat = 37.78825;
export var userLong = -122.4324;
var userLatDel = 0.000522;
var userLongDel =0.000521;

export default function Map({ location }) {
  const [restRoom, setRestRoom] = React.useState([]);
  
  setState = setRestRoom;

    return (
      <MapView
        //ref={ref => { this.map = ref }}
        provider={Platform.iOS ? "undefined" : "google"}
        style={styles.map}
        showsUserLocation
        region={{
          latitude: userLat,
          longitude: userLong,
          latitudeDelta: userLatDel,
          longitudeDelta: userLongDel,
        }}
        showsMyLocationButton
        userLocationUpdateInterval={5000}
        followsUserLocation={Platform.iOS ? true : false}
        loadingEnabled
        onUserLocationChange={props => {
          userLat = props.nativeEvent.coordinate.latitude;
          userLong = props.nativeEvent.coordinate.longitude;
          
        }}
        
      >
       
        {restRoom.map((res) => {
          return (
            <Marker
              key={res.id}
              coordinate={{ latitude: res.latitude, longitude: res.longitude }}
              pinColor="blue"
              title={res.name}
              description={res.comment}
            />
          );
        })}
      </MapView>
    );

}



export async function addMarker(data) {
  setState(data);
}





const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    height: Dimensions.get("window").height,
    marginBottom: 30,
  },
  
});
