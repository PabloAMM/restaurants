import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

const Tab = createBottomTabNavigator()

export default function Navigation() {
    return (
        <NavigationContainer>
            <Tab.Navigator>
                <Tab.Screen
                    name="restaurants"
                    component={RestaurantsStack}
                    options={{ title:"Restaurants"}}
                />
                <Tab.Screen
                    name="Favorites"
                    component={FavoritesStack}
                    options={{ title:"Favorites"}}
                />
                <Tab.Screen
                    name="TopRestaurants"
                    component={TopRestaurantsStack}
                    options={{ title:"TopRestaurants"}}
                />
                <Tab.Screen
                    name="Search"
                    component={SearchStack}
                    options={{ title:"Search"}}
                />
                <Tab.Screen
                    name="Account"
                    component={AccountStack}
                    options={{ title:"Account"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
    )
}
