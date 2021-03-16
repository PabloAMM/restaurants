import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Input } from 'react-native-elements'
import { isEmpty } from 'lodash'

import { updateProfile } from '../../utils/actions'

export default function ChangeDisplayNameForm({ displayName, setShowModal, toastRef, setReloadUser }) {
    const [newDisplayName, setNewDisplayName] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const onSubmit = async () => {
        if (!validateForm()) {
            return
        }

        setLoading(true)
        const result = await updateProfile({ displayName: newDisplayName })
        setLoading(false)
        if (!result.statusResponse) {
            setError("Error to update name and last name")
            return

        }
        setReloadUser(true)
        toastRef.current.show("Name and last name have been updated", 3000)
        setShowModal(false)


    }

    const validateForm = () => {
        setError(null)
        if (isEmpty(newDisplayName)) {
            setError("You must enter name and last name")
            return false
        }
        if (newDisplayName === displayName) {
            setError("You must enter name and last name different from currect ones. ")
            return false
        }
        return true
    }
    return (
        <View style={styles.view}>
            <Input
                placeholder="Enter name and last name"
                containerStyle={styles.input}
                defaultValue={displayName}
                onChange={(e) => setNewDisplayName(e.nativeEvent.text)}
                errorMessage={error}
                rightIcon={{
                    type: "material-community",
                    name: "account-circle-outline",
                    color: "#c2c2c2"
                }}
            />
            <Button
                title="Change Name and Last Name"
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
