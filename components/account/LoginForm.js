import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'

import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'
import { isEmpty } from 'lodash'


export default function LoginForm() {

    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [formData, setFormData] = useState(defaultFormValues())
    const [loadin, setLoadin] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({ ...formData, [type]: e.nativeEvent.text })


    }
    const doLogin = async() => {
        if (!validateData()) {
             return
        }

        setLoadin(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoadin(false)
        if (!result.statusResponse) {
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

        navigation.navigate("account")

    }

    const validateData = () => {
        setErrorEmail("")
        setErrorPassword("")

        let isValid = true
        if (!validateEmail(formData.email)) {
            setErrorEmail("You must enter a valid email!")
            isValid = false
        }

        if (isEmpty(formData.password)) {
            setErrorPassword("You must enter a password")
            isValid = false
        }
        return isValid
    }

    return (
        <View style={styles.container}>
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
            <Button
                title="Log In"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={ () => doLogin() }
            />
            <Loading
                isVisible={loadin}
                text="Logging in..."
            />
        </View>
    )
}

const defaultFormValues = () => {
    return {
        email: "",
        password: ""
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 30
    },
    input: {
        width: "100%"
    },
    ico: {
        color: "#c1c1c1"
    },
    btnContainer: {
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn: {
        backgroundColor: "#442484"

    }
})
