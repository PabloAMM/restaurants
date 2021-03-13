import React, { useState } from 'react'
import { Alert } from 'react-native'
import { StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements'
import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user, setLoadinText, setLoadin }) {
    const [photoUrl, setPhotoUrl] = useState(user.photoURL)
    const chagePhoto = async () => {
        const result = await loadImageFromGallery([1, 1])
        if (!result.status) {
            return
        }
        setLoadinText("Updating image.....")
        setLoadin(true)
        const resultUploadImage = await uploadImage(result.image, "avatars", user.uid)
        if (!resultUploadImage.statusResponse) {
            setLoadin(false)
            Alert.alert("There was an error saving the profile picture")
            return
        }
        const resultUpdateprofile = await updateProfile({ photoURL: resultUploadImage.url })
        setLoadin(false)
        if (resultUpdateprofile.statusResponse) {
            setPhotoUrl(resultUploadImage.url)

        } else {
            Alert.alert("An error occurred while updating the profile picture.")
        }
        
    }


    return (
        <View style={styles.container}>
            <Avatar
                rounded
                size="large"
                onPress={chagePhoto}
                source={

                    photoUrl ? { uri: photoUrl }
                        : require("../../assets/avatar-default.png")
                }
            />
            <View style={styles.InfoUser}>
                <Text style={styles.displayName}>
                    {
                        user.displayName ? user.displayName : "Anonimous"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        backgroundColor: "#f9f9f9",
        paddingVertical: 30
    },
    InfoUser: {
        marginLeft: 20
    },
    displayName: {
        fontWeight: "bold"
    }
})
