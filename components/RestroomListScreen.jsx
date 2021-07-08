import React from "react";
import { SafeAreaView } from "react-navigation";
import { Text, StyleSheet, View, FlatList,TouchableOpacity,Alert } from "react-native";
import * as Linking from 'expo-linking';


var updateRender;
var dataList;
  const RestroomListScreen = ()  =>{
  const [res, setRes] = React.useState([]);
    updateRender = setRes;
    if (dataList !== undefined) {
      setRes(dataList);
      dataList = undefined;
    }
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
        <Text style={styles.buttonText}>Public Restroom</Text>
      </View>
    <View style={styles.listStyle}>
      <FlatList
          data={res}
          keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => (
            <TouchableOpacity onPress={() => {
              return Alert.alert(
                "Are your sure?",
                "Are you sure you want to navigate to this restroom location?",
                [
                  // The "Yes" button
                  {
                    text: "Yes",
                    onPress: () => {
                     let { street,city } = item;
          
                      let daddr = encodeURIComponent(`${street} , ${city}`);
                    
                      if (Platform.OS === 'ios') {
                        Linking.openURL(`http://maps.apple.com/?daddr=${daddr}`);
                      } else {
                        Linking.openURL(`http://maps.google.com/?daddr=${daddr}`);
                      }
                    },
                  },
                  // The "No" button
                  // Does nothing but dismiss the dialog when tapped
                  {
                    text: "No",
                  },
                ]
              );
            
            
            }}>
              <Text style={styles.textStyle}>{item.name}</Text>
          </TouchableOpacity>
          
        )}
      />
      </View>
    </>
  );
};

export function updateRestroom(data) {
  
  if (updateRender !== undefined) {
    updateRender(data)
  } else if(dataList === undefined) {
    dataList = data
  }
  
}




const styles = StyleSheet.create({
  
  listStyle: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
  },
  textStyle: {
    marginTop: 24,
    padding: 30,
    backgroundColor: 'pink',
    fontSize:18
  },
  buttonText: {
    color: "white",
    fontSize: 18,
  },
});


export default RestroomListScreen;