import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Restaurants from '../screens/restaurants/Restaurants'
import Restaurant from '../screens/restaurants/Restaurant'
import AddRestaurant from '../screens/restaurants/AddRestaurant';


const Stack = createStackNavigator()
export default function RestaurantsStack() {

    return (
        <Stack.Navigator>
            <Stack.Screen
                name="restaurants"
                component={Restaurants}
                options={{ title: "Restaurants" }}
            />
            <Stack.Screen
                name="add-restaurant"
                component={AddRestaurant}
                options={{ title: "Create restaurant" }}
            />
            <Stack.Screen
                name="restaurant"
                component={Restaurant}
                
            />
        </Stack.Navigator>
    )
}
