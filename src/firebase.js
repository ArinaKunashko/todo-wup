import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'


const firebaseConfig = {
    apiKey: 'AIzaSyDFdpp81g4r-y0Rxp4kNX3oTuueqsskaoI',
    authDomain: 'todos-68335.firebaseapp.com',
    projectId: 'todos-68335',
    storageBucket: 'todos-68335.appspot.com',
    messagingSenderId: '921788531372',
    appId: '1:921788531372:web:902aacec5015c225a61509',
    measurementId: 'G-GQSFSH7D9K'
  }

  const app = initializeApp(firebaseConfig)
  const db = getFirestore(app)
  const storage = getStorage(app)

  export {db, storage}
