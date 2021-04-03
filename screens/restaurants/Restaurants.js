import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import firebase from 'firebase/app'
import { useFocusEffect } from '@react-navigation/native'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import { getRestaurants, getMoreRestaurants } from '../../utils/actions'
import ListRestaurants from '../../components/restaurants/ListRestaurants'


export default function Restaurants({ navigation }) {
    const [user, setUser] = useState(null)
    const [startRestaurant, setStartRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)

    const limitRestaurant = 7

    useEffect(() => {
        firebase.auth().onAuthStateChanged((userInfo) => {
            userInfo ? setUser(true) : setUser(false)
        })
    }, [])

    useFocusEffect(
        useCallback(() => {
            async function getData() {
                setLoading(true)
                const response = await getRestaurants(limitRestaurant)
                setLoading(false)
                if (response.statusResponse) {

                    setStartRestaurant(response.startRestaurants)
                    setRestaurants(response.restaurants)
                }
            }

            getData()
        }, [])
    )

    const hanleLoadMore = async () => {
        if (!startRestaurant) {
            return
        }
        setLoading(true)
        const response = await getMoreRestaurants(limitRestaurant, startRestaurant)
        setLoading(false)
        if (response.statusResponse) {
            setStartRestaurant(response.startRestaurant)
            setRestaurants([...restaurants, ...response.restaurants])
        }

        setLoading(false)
    }
    if (user === null) {
        return <Loading Isvisible={true} text="Loading..." />
    }

    return (
        <View style={styles.viewBody}>

            {
                size(restaurants) > 0 ? (
                    <ListRestaurants
                        restaurans={restaurants}
                        navigation={navigation}
                        hanleLoadMore={hanleLoadMore}
                    />
                ) : (
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>There are no registered restaurants.</Text>
                    </View>
                )
            }
            {
                user && (<Icon
                    type="material-community"
                    name="plus"
                    color="#442484"
                    reverse
                    onPress={() => navigation.navigate("add-restaurant")}
                    containerStyle={styles.btnContainer}
                />)
            }
            <Loading isVisible={loading} text="Loading restaurants" />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        flex: 1
    },
    btnContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.5
    },
    notFoundView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText: {
        fontSize: 18,
        fontWeight: "bold"
    }
})

