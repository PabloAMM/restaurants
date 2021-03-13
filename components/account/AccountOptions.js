import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem } from 'react-native-elements'
import { map } from 'lodash'
import Modal from '../Modal'

export default function AccountOptions({ user, toastRef }) {

    const menuOptions = generateOptions()

    const [showModal, setShowModal] = useState(true)
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
                <Text>Hola Mundo Modal</Text>
                <Text>Hola Mundo Modal</Text>
                <Text>Hola Mundo Modal</Text>
                <Text>Hola Mundo Modal</Text>
                <Text>Hola Mundo Modal</Text>
            </Modal>

        </View>

    )

}

generateOptions = () => {
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

}

const styles = StyleSheet.create({
    menuItem: {
        borderBottomWidth: 1,
        borderBottomColor: "#a7bfd3"
    }
})
