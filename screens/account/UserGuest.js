import React from 'react'
import { StyleSheet, Text, ScrollView, Image } from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation}  from '@react-navigation/native'



export default function UserGuest() {
const navigation = useNavigation()

    return (
        <ScrollView
            centerContent
            style={styles.viewBody}
        >
            <Image
                source={require("../../assets/restaurant-logo.png")}
                resizeMode="contain"
                style={styles.image}
            />
            <Text style={styles.title}>Check your profile in restaurants</Text>
            <Text style={styles.description}>
                How would you describe your best restaurant? Search and view the best restaurants in a simple way, vote which one you liked the most and comment on how your experience has been.
            </Text>
            <Button
                buttonStyle={styles.button}
                title="See your profile"
                onPress={() => navigation.navigate("login")}
            />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    viewBody: {
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10

    },
    title: {
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        marginVertical: 10,
        textAlign: "center"
    },
    description: {
        textAlign: "justify",
        marginBottom: 2,
        color: "#a65273"
    },
    button: {
        backgroundColor: "#442484"
    }

})
