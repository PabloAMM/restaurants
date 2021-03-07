import { DrawerContentScrollView } from '@react-navigation/drawer'
import { size } from 'lodash'
import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { validateEmail } from '../../utils/helpers'





export default function RegisterForm() {

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirm, setErrorConfirm] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())


    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })


    }
    const registerUser = () => {
        if (!validateData()) {
            return
        }
        console.log("Fuck")
    }

    const validateData = () => {
        setErrorConfirm("")
        setErrorEmail("")
        setErrorPassword("")

        let isValid = true
        if (!validateEmail(formData.email)) {
            setErrorEmail("You must enter a valid email!")
            isValid = false
        }
        if (size(formData.password)<6) {
            setErrorPassword("You must enter a password greater than 6 characters")
            isValid = false
        }
        if (size(formData.confirm)<6) {
            setErrorConfirm("You must enter a password confirm greater than 6 characters")
            isValid = false
        }
        if (formData.confirm !== formData.confirm) {
            setErrorConfirm("The password and confirm is not equal")
            setErrorPassword("The password and confirm is not equal")
            isValid = false
        }
        return isValid
    }
    return (
        <View
            style={styles.form}
        >
            <Input
                containerStyle={styles.input}
                placeholder="Enter your email.."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage={errorEmail}
                defaultValue={formData.email}
            />
            <Input
                containerStyle={styles.input}
                placeholder="Enter your password.."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.ico}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Input
                containerStyle={styles.input}
                placeholder="Confirm your password.."
                password={true}
                secureTextEntry={!showPassword}
                onChange={(e) => onChange(e, "confirm")}
                errorMessage={errorConfirm}
                defaultValue={formData.confirm}
                rightIcon={
                    <Icon
                        type="material-community"
                        name={showPassword ? "eye-off-outline" : "eye-outline"}
                        iconStyle={styles.ico}
                        onPress={() => setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title="Register new user"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={() => registerUser()}
            />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "",
        password: "",
        confirm: ""
    }
}
const styles = StyleSheet.create({
    form: {
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"

    },
    ico: {
        color: "#c1c1c1"
    }
})
