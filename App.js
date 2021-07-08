import * as React from "react";
import MapView from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Button, Alert } from "react-native";
import Map from "./components/map";
import * as Location from "expo-location";
import { Marker } from "react-native-maps";
import MainScreen from "./components/MainScreen"
export default class App extends React.Component {
 
  state = {
    permission: "denied"
  }

  
  async componentDidMount() {
    await this.getUserPermission();
    
    if (this.state.permission !== "granted") {
      return Alert.alert("Location access is denied", "Please allow it in your phone app setting.")
    } else {
      return Alert.alert("Notices", "If the app location does not work correctly,\nCheck your location permission again.\nThe app used public database.\nThere might not any available restroom near you.");
    }
  }
  
  async getUserPermission(){
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        status  = await Location.getForegroundPermissionsAsync();
        return;
      }
      
      this.setState({ permission: "granted" })
     
    } catch (error) {
      alert("There are some error while trying to get access to your location permission.")
    }
  }

  // main()
  render() {
    
    return (
      <MainScreen ></MainScreen>
    );

  }
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
