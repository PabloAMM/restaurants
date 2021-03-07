import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {
    let IsLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (IsLogged = true)
    })

    return IsLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const registerUser = async (email, password) => {
    const result = {
        statusResponse: true,
        error: null
    }
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)

    } catch (error) {
        result.error = "This email already exist"
        result.statusResponse = false
    }

    return result

}

