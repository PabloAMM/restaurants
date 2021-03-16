import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { map } from 'lodash'

import Modal from '../Modal'
import ChangeDisplayNameForm from './ChangeDisplayNameForm'

export default function AccountOptions({ user, toastRef,setReloadUser }) {

    const [showModal, setShowModal] = useState(true)
    const [renderComponet, setRenderComponet] = useState(null)

    const generateOptions = () => {
        return [
            {
                title: "Change Name and last name",
                iconNameleft: "account-circle",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("displayName")
            },
            {
                title: "Change Email",
                iconNameleft: "at",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("email")
            },
            {
                title: "Change Password",
                iconNameleft: "lock-reset",
                iconColorLeft: "#a7bfd3",
                iconNameRight: "chevron-right",
                iconColorRight: "#a7bfd3",
                onPress: () => selectedComponet("password")
            },
        ]
    }

    const selectedComponet = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponet(
                    <ChangeDisplayNameForm 
                    displayName={user.displayName}
                    setShowModal={setShowModal}
                    toastRef={toastRef}
                    setReloadUser={setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponet(
                    <Text>email</Text>
                )
                break;
            case "password":
                setRenderComponet(
                    <Text>password</Text>
                )

                break;
        }
        setShowModal(true)
    }


    const menuOptions = generateOptions();

    return (
        <View>
            {
                map(menuOptions, (menu, index) => (
                    <ListItem
                        key={index}
                        style={styles.menuItem}
                        onPress={menu.onPress}
                    >
                        <Icon
                            type="material-community"
                            name={menu.iconNameleft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="material-community"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponet
                }
            </Modal>
        </View>

    )

}





const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})