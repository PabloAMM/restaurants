import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import Toast from 'react-native-easy-toast'


import { closeSession, getCurrentUser } from '../../utils/actions'
import Loadin from '../../components/Loading'
import InfoUser from '../../components/account/InfoUser'
import AccountOptions from '../../components/account/AccountOptions'

export default function UserLogged() {
    const navigation = useNavigation()
    const toastRef = useRef()
    const [loadin, setLoadin] = useState(false)
    const [loadinText, setLoadinText] = useState("")
    const [user, setUser] = useState(null)
    useEffect(() => {
        setUser(getCurrentUser())
    }, [])


    return (
        <View style={styles.container}>
            {

                user && (
                    <View>
                        <InfoUser
                            user={user}
                            setLoadinText={setLoadinText}
                            setLoadin={setLoadin}
                        />
                        <AccountOptions
                            user={user}
                            toastRef={toastRef}
                        />
                    </View>
                )

            }


            <Button
                title="Sign off"
                buttonStyle={styles.btnClaseSession}
                titleStyle={styles.btnClaseSessionTitle}
                onPress={() => {
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9} />
            <Loadin isVisible={loadin} text={loadinText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        minHeight: "100%",
        backgroundColor: "#f9f9f9"
    },
    btnClaseSession: {
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#442484",
        borderBottomWidth: 1,
        borderBottomColor: "#442484",
        paddingVertical: 10

    },
    btnClaseSessionTitle: {
        color: "#442484"
    }

})
