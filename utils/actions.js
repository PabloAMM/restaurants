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