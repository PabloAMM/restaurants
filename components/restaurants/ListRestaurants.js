import { size } from 'lodash'
import React from 'react'
import { FlatList, StyleSheet, Text, View, TouchableOpacity, ActivityIndicator } from 'react-native'
import { Image } from 'react-native-elements'


export default function ListRestaurants({ restaurans, navigation }) {
    return (
        <View>
            <FlatList
                data={restaurans}
                keyExtractor={(item, index) => index.toString()}
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

    return (
        <TouchableOpacity>
            <View style={styles.viewRestaurantsImage}>
                <View style={styles.viewRestaurant}>
                    <Image
                        resizeMode="cover"
                        PlaceholderContent={<ActivityIndicator color="#fff" />}
                        source={{ uri: imageRestaurant }}
                        style={styles.imageRestaurant}
                    />
                </View>
            </View>
            <View>
                <Text style={styles.restauranTitle}>{name}</Text>
                <Text style={styles.restaurantInformation}>{address}</Text>
                <Text style={styles.restaurantInformation}>+{callingCode}-{phone}</Text>
                <Text style={styles.restaurantDescription}>

                    {
                        size(description) > 0
                            ? `${description.substr(0, 60)}...`
                            : description
                    }

                </Text>
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
