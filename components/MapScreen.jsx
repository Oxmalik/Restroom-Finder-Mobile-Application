import React, { useState } from "react";
import { SafeAreaView } from "react-navigation";
import Map, { addMarker, userLat, userLong } from "./map";
import { View, Text, Button, StyleSheet, TouchableOpacity, Alert , Image} from "react-native";
import RestroomListScreen, { updateRestroom} from "./RestroomListScreen";
const MapScreen = () => {
  const [initialLocation, setinitialLocation] = useState({
    data: [],
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.015,
    longitudeDelta: 0.0121,
  });
  const backLoc = () =>{
    var data = [];
    return addMarker(data);
     
  }
  const getData = () => {
    
    var data = [];
    var found = false;
    let latitude = userLat;
    let longitude = userLong;
    return fetch(
      `https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${latitude}&lng=${longitude}`
    )
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
        data.map((res) => {
          if (res.distance < 0.05) {
            found = true;
          }
        });
        
        if (found === true) {
          alert("I have found some nearest restroom for you.");
        } else {
          alert("There are no restrooms around you.");
        }
        addMarker(data);
       
        updateRestroom(data);
      })
      .catch((error) => {
        Alert.alert('Alert',"There are some error while trying to get data.")
        console.error(error);
      });
  };

  return (
    <>
      <View
        style={{
          backgroundColor: "blue",
          paddingHorizontal: 25,
          paddingVertical: 12,
          borderRadius: 25,
          justifyContent: "center",
          alignItems: "center",
          marginTop: 30
        }}
      >
        <Text style = {styles.container}>Mason Public Restroom Finder</Text>
      </View>
      <SafeAreaView style={styles.container}>
        <View style={styles.map}>
          <Map location={initialLocation}></Map>
        </View>
        <TouchableOpacity onPress={backLoc}>
          <View style={styles.icon}>
            <Image source = {{uri:'../assets/icon.png'}}/>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={getData}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>》 》 》 》GO《 《 《 《</Text>
          </View>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  map: {
    flex: 1,
    justifyContent: "center",
  },
  buttonStyle: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },

  button: {
    marginTop: -1,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: "black",
    borderRadius: 8,
    backgroundColor: "green",
    color: "#20232a",
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    alignItems: "center",
  },
  buttonText: {
    color: "yellow",
    fontWeight: "bold",
    fontSize: 30,
  },
  icon:{
    color: "black",
    paddingHorizontal: 25,
    paddingVertical: 102,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default MapScreen;
