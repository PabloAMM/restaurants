import { size } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'
import { getMoreRestaurants } from '../../utils/actions'
import { formatPhone } from '../../utils/helpers'


export default function ListRestaurants({ restaurans, navigation, hanleLoadMore }) {
    return (
        <View>
            <FlatList
                data={restaurans}
                keyExtractor={(item, index) => index.toString()}
                onEndReachedThreshold={0.5}
                onEndReached={hanleLoadMore}
                renderItem={(restaurant) => (
                    <Restaurant restaurant={restaurant} navigation={navigation}
                    />
                )}
            />
        </View>
    )
}

function Restaurant({ restaurant, navigation }) {
    const { id, images, name, address, description, phone, callingCode } = restaurant.item
    const imageRestaurant = images[0]

    const goRestaurant = () => {
        navigation.navigate("restaurant", { id, name })
    }
    return (
        <TouchableOpacity onPress={goRestaurant}>
            <View style={styles.viewRestaurant}>
                <View style={styles.viewRestaurantsImage}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: imageRestaurant }}
                        style={styles.imageRestaurant}
                    />
                </View>
                <View>
                    <Text style={styles.restauranTitle}>{name}</Text>
                    <Text style={styles.restaurantInformation}>{address}</Text>
                    <Text style={styles.restaurantInformation}>{formatPhone(callingCode, phone)}</Text>
                    <Text style={styles.restaurantDescription}>

                        {
                            size(description) > 60
                                ? `${description.substr(0, 60)}...`
                                : description
                        }

                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    )

}
const styles = StyleSheet.create({
    viewRestaurant: {
        flexDirection: "row",
        margin: 10
    },
    imageRestaurant: {
        width: 90,
        height: 90
    },
    restauranTitle: {
        fontWeight: "bold"
    },
    restaurantInformation: {
        paddingTop: 2,
        color: "grey"

    },
    restaurantDescription: {
        paddingTop: 2,
        color: "grey",
        width: "75%"
    },
    viewRestaurantsImage: {
        marginRight: 15
    }
})
