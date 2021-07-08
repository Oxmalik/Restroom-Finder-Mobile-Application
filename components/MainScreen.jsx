import React from 'react'
import RestroomListScreen from "./RestroomListScreen";
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import MapScreen from "./MapScreen"
import { setNavigator } from "./navRef";


const switchNavigator = createSwitchNavigator({
    mainFlow: createBottomTabNavigator({
        Map: MapScreen,
        RestList: {
            screen: RestroomListScreen,
            navigationOptions: {
                title: 'Public Restroom',
                headerStyle: {backgroundColor: '#333'}
            }
        }
    })
})

const App = createAppContainer(switchNavigator)


export default function MainScreen() {
    
    return (
        <App
            ref={navigator => { setNavigator(navigator) }}
        />
    )
}