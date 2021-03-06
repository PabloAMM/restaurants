import firebase from 'firebase/app'
import 'firebase/firestore'


const firebaseConfig = {
    apiKey: "AIzaSyB9IGsjVo5_zYeId_W8tM2ws11B_72Jq-0",
    authDomain: "restaurants-f5a5d.firebaseapp.com",
    projectId: "restaurants-f5a5d",
    storageBucket: "restaurants-f5a5d.appspot.com",
    messagingSenderId: "371677559378",
    appId: "1:371677559378:web:8e58b9c039221e398abd8b"
}

export const firebaseApp = firebase.initializeApp(firebaseConfig)