import { NavigationAction } from "react-navigation";



let navigator


export const setNavigator = nav => {

    navigator = nav
}

export const navigate = (screenName, params) => {
    navigator.dispatch(
        NavigationAction.navigate({
            screenName,
            params
        })
    )
}