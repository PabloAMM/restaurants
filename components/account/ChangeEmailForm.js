import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({ email, setShowModal, toastRef, setReloadUser }) {
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorPassword, setErrorPassword] = useState(null)
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }

        
        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)        
       
        
        if (!resultReauthenticate.statusResponse) {
            setLoading(false)
            setErrorPassword("Incorrect password")
            return

        }

        
        const resultUpdateEmail = await updateEmail(newEmail)
        
        setLoading(false)
        if (!resultUpdateEmail.statusResponse) {
            setErrorEmail("You cannot change this email, it is already in use by another user.")
            return

        }

        setReloadUser(true)
        toastRef.current.show("Email have been updated", 3000)
        setShowModal(false)


    }

    const validateForm = () => {
        setErrorEmail(null)
        setErrorPassword(null)

        let isvalid = true

        if (!validateEmail(newEmail)) {
            setErrorEmail("Your must enter a email valid!")
            isvalid = false
        }
        if (newEmail === email) {
            setErrorEmail("You must enter a email diferent to actual. ")
            isvalid = false
        }

        if (isEmpty(password)) {
            setErrorPassword("You must enter your password. ")
            isvalid = false
        }

        return isvalid
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Enter the new email"
                containerStyle={styles.input}
                defaultValue={email}
                keyboardType="email-address"
                onChange={(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage={errorEmail}
                rightIcon={{
                    type: "material-community",
                    name: "at",
                    color: "#c2c2c2"
                }}
            />
            <Input
                placeholder="Enter your password"
                containerStyle={styles.input}
                defaultValue={password}
                onChange={(e) => setPassword(e.nativeEvent.text)}
                errorMessage={errorPassword}
                password={true}
                secureTextEntry={!showPassword}

                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={{ color: "#c2c2c2" }}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Change email"
                containerStyle={styles.btncontainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                loading={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
        paddingVertical: 10
    },
    input: {
        marginBottom: 10
    },
    btncontainer: {
        width: "95%"
    },
    btn: {
        backgroundColor: "#442484"
    }
})
