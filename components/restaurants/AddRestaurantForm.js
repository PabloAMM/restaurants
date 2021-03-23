import React, { useState, useEffect } from 'react'
import { StyleSheet, ScrollView, View, Alert, Dimensions, Text } from 'react-native'
import { Button, Input, Icon, Avatar, Image, ButtonGroup } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import MapView from 'react-native-maps'

import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import Modal from '../../components/Modal'


const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm({ toastRef, setLoading, navigation }) {
    const [formData, setFormData] = useState(defaultFormValues())
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorName, setErrorName] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [imageSelected, setImageSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)

    const addRestaurant = () => {

        if (!validForm()) {
            return

        }
    }

    const validForm = () => {
        clearErrors()
        let isValid = true
        if (isEmpty(formData.name)) {
            setErrorName("You must enter name of the restaurant")
            isValid = false
        }

        if (isEmpty(formData.address)) {
            setErrorAddress("You must enter address of the restaurant")
            isValid = false
        }

        if (size(formData.phone) < 10) {
            setErrorPhone("You must enter valid phone of the restaurant")
            isValid = false
        }

        if (!validateEmail(formData.email)) {
            setErrorEmail("You must enter a valid email of the restaurant")
            isValid = false
        }
        if (isEmpty(formData.description)) {
            setErrorDescription("You must enter a description of the restaurant")
            isValid = false
        }

        if (!locationRestaurant) {
            toastRef.current.show("You must locate the restaurant on the map", 3000)
            isValid = false
        } else if (size(imageSelected[0])<1) {
            toastRef.current.show("You must add at least one image to the restaurant", 3000)
            isValid = false
        }

        return isValid
    }

    const clearErrors = () => {

        setErrorDescription(null)
        setErrorEmail(null)
        setErrorName(null)
        setErrorPhone(null)
        setErrorAddress(null)

    }

    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imageSelected[0]}
            />
            <FormAdd
                formData={formData}
                setFormData={setFormData}
                errorName={errorName}
                errorEmail={errorEmail}
                errorPhone={errorPhone}
                errorAddress={errorAddress}
                errorDescription={errorDescription}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
            />
            <UploadImage
                toastRef={toastRef}
                imageSelected={imageSelected}
                setImageSelected={setImageSelected}
            />
            <Button
                title="Create Restaurant"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                locationRestaurant={locationRestaurant}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapRestaurant({
    isVisibleMap,
    setIsVisibleMap,
    setLocationRestaurant,
    toastRef
}) {
    const [newRegion, setNewRegion] = useState(null)
    useEffect(() => {
        (async () => {
            const response = await getCurrentLocation()
            if (response.status) {
                setNewRegion(response.location)

            }
        })()
    }, [])

    const confirmLocation = () => {
        setLocationRestaurant(newRegion)
        toastRef.current.show("Location saved correctly", 3000)
        setIsVisibleMap(false)
    }
    return (
        <Modal isVisible={isVisibleMap} setIsVisible={setIsVisibleMap}>
            <View>
                {
                    newRegion && (
                        <MapView
                            style={styles.mapStyle}
                            initialRegion={newRegion}
                            showsUserLocation
                            onRegionChange={(region) => setNewRegion(region)}
                        >
                            <MapView.Marker
                                coordinate={{
                                    latitude: newRegion.latitude,
                                    longitude: newRegion.longitude
                                }}
                                draggable
                            />


                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Save Location"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMpaBtnSave}
                        onPress={confirmLocation}
                    />
                    <Button
                        title="Cancel Location"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMpaBtnCancel}
                        onPress={() => setIsVisibleMap(false)}
                    />
                </View>
            </View>
        </Modal>
    )
}

function ImageRestaurant({ imageRestaurant }) {
    return (
        <View
            style={styles.viewPhoto}
        >
            <Image
                style={{ width: widthScreen, height: 200 }}
                source={
                    imageRestaurant ? { uri: imageRestaurant } : require("../../assets/no-image.png")
                }
            />

        </View>
    )
}

function UploadImage({ toastRef, imageSelected, setImageSelected }) {
    const imageSelect = async () => {
        const response = await loadImageFromGallery([4, 3])
        if (!response.status) {
            toastRef.current.show(" You have not selected any image", 3000)
            return
        }
        setImageSelected([...imageSelected, response.image])
    }

    const removeImage = (image) => {
        Alert.alert(
            "Delete Image",
            "Are you sure to delete this image?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                {
                    text: "Yes",
                    onPress: () => {
                        setImageSelected(filter(imageSelected, (imageUrl) => imageUrl !== image))
                    }
                }
            ],
            {
                cancelable: false
            }
        )
    }

    return (
        <ScrollView
            horizontal
            style={styles.viewImages}
        >
            {
                size(imageSelected) < 10 && (
                    <Icon
                        type="material-community"
                        name="camera"
                        color="#7a7a7a"
                        containerStyle={styles.containerIcon}
                        onPress={imageSelect}
                    />
                )
            }
            {
                map(imageSelected, (imageRestaurant, index) => (
                    <Avatar
                        key={index}
                        style={styles.miniatureStyle}
                        source={{ uri: imageRestaurant }}
                        onPress={() => removeImage(imageRestaurant)}
                    />
                ))
            }
        </ScrollView>
    )
}

function FormAdd({
    formData,
    setFormData,
    errorName,
    errorEmail,
    errorPhone,
    errorAddress,
    errorDescription,
    setIsVisibleMap,
    locationRestaurant
}) {
    const [country, setCountry] = useState("CO")
    const [callingCode, setCallingCode] = useState("57")
    const [phone, setPhone] = useState("")

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Name of the restaurant"
                defaultValue={formData.name}
                onChange={(e) => onChange(e, "name")}
                errorMessage={errorName}
            />
            <Input
                placeholder="Addres of the  restaurant"
                defaultValue={formData.address}
                onChange={(e) => onChange(e, "address")}
                errorMessage={errorAddress}
                rightIcon={{
                    type: "material-community",
                    name: "google-maps",
                    color: locationRestaurant ? "#442484" : "#c2c2c2",
                    onPress: () => setIsVisibleMap(true)
                }}
            />
            <Input
                keyboardType="email-address"
                placeholder="Email of the  restaurant"
                defaultValue={formData.email}
                onChange={(e) => onChange(e, "email")}
                errorMessage={errorEmail}
            />
            <View style={styles.phoneView}>
                <CountryPicker
                    withFlag
                    withCallingCode
                    withFilter
                    withCallingCodeButton
                    containerStyle={styles.countryPicker}
                    countryCode={country}
                    onSelect={(country) => {
                        setFormData({
                            ...formData,
                            "country": country.cca2,
                            "callingCode": country.callingCode[0]
                        })

                    }}
                />
                <Input
                    placeholder="WhatsApp of the restaurant"
                    keyboardType="phone-pad"
                    containerStyle={styles.inputPhone}
                    defaultValue={formData.phone}
                    onChange={(e) => onChange(e, "phone")}
                    errorMessage={errorPhone}
                />

            </View>
            <Input
                placeholder="Description of the restaurant"
                multiline
                containerStyle={styles.textArea}
                defaultValue={formData.description}
                onChange={(e) => onChange(e, "description")}
                errorMessage={errorDescription}
            />
        </View>


    )
}

const defaultFormValues = () => {
    return {
        name: "",
        description: "",
        email: "",
        phone: "",
        address: "",
        country: "CO",
        callingCode: "57"
    }
}

const styles = StyleSheet.create({
    viewContainer: {
        height: "100%"
    },
    btnAddRestaurant: {
        margin: 20,
        backgroundColor: "#442484"
    },
    viewForm: {
        marginHorizontal: 10
    },
    phoneView: {
        width: "80%",
        flexDirection: "row"
    },
    countryPicker: {

    },
    inputPhone: {
        width: "80%"
    },
    textArea: {
        height: 100,
        width: "100%"
    },
    viewImages: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30
    },
    containerIcon: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 79,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle: {
        width: 70,
        height: 70,
        marginRight: 10
    },
    viewPhoto: {
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle: {
        width: "100%",
        height: 550
    },
    viewMapBtn: {
        flexDirection: "row",
        justifyContent: "center",
        marginTop: 10
    },
    viewMapBtnContainerSave: {
        paddingRight: 5
    },
    viewMpaBtnSave: {
        backgroundColor: "#442484"
    },
    viewMapBtnContainerCancel: {
        paddingLeft: 5
    },
    viewMpaBtnCancel: {
        backgroundColor: "#a65273"
    }
})
