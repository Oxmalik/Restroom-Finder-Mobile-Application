import * as React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View, Dimensions,Button } from 'react-native';
import  Map  from './map'
import * as Location from 'expo-location'
import { Marker } from 'react-native-maps';
export default class App extends React.Component {
  
 // Data for the class
  state = {
    data: [],
    latitude: undefined,
    longitude: undefined,
    latitudeDelta: 0.00522, // zoom in level
    longitudeDelta: 0.00521 // zoom in level
  };

  
  
  
  
  async componentDidMount() {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        alert('The location permission is now allowed. Please Go to setting and allow it.')
        return
      }
      const location = await Location.getCurrentPositionAsync()
      //this.setState({ latitude: 40.729660, longitude: -73.998053})
      this.setState({ latitude: location.coords.latitude, longitude: location.coords.longitude})
      //alert(`Latitude : ${this.state.latitude}  longtitude:${this.state.longitude}`)
      this.render()
    }
    catch (error) {
     
    }
    this.getData();
  }
  

  getData() {
    var data = {};
    var found = false;
    return fetch(`https://www.refugerestrooms.org/api/v1/restrooms/by_location?page=1&per_page=10&offset=0&lat=${this.state.latitude}&lng=${this.state.longitude}`)
      .then((response) => response.json())
      .then((responseJson) => {
        data = responseJson;
        this.setState({ data: data })
        this.state.data.map(res => {
          if (res.distance < 0.05) {
            found = true;
          } 
        })

        if (found === true) {
          alert("I have found some nearest restroom for you.")
        } else {
          alert("There are not nearest restrooms.")
        }
        
    })
      .catch((error)=> {
      console.error(error);
      });
    

  }

  

  renderMarker = () => {
   
    return (
      //<View style={ styles.container}>
      <Button
        title="Find Public Restrooms near me!"
        onPress={() => this.getData()}
      />
     // </View>
    )
  }
  
  // main()
  render() {
    console.log('render')
    const { latitude, longitude } = this.state
    if (latitude) {
      return (
        <View style={styles.container}>
          <Map location={this.state}></Map>
          {this.renderMarker()}
        </View>
        
      );
      
    }
    return (
      <View style={styles.container}>
        <Text>Waiting for location</Text>
      </View>
    )
    
  }


}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
});