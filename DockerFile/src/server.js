import {initializeApp} from "firebase/app"
import {getDatabase} from "firebase/database"
import {getAuth} from 'firebase/auth'
import {getFirestore} from "firebase/firestore"


const firebaseConfig={
    apiKey: "AIzaSyBDd3784IPs3W83zaFUbGw-gLXWD-uywpY",
  authDomain: "iot-project-e5a8a.firebaseapp.com",
  databaseURL: "https://iot-project-e5a8a-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "iot-project-e5a8a",
  storageBucket: "iot-project-e5a8a.appspot.com",
  messagingSenderId: "925866296317",
  appId: "1:925866296317:web:46e9b5c024a12d9f514f94"
}

const app=initializeApp(firebaseConfig)

const database=getDatabase(app);
const auth=getAuth(app);
const db=getFirestore(app);
export  {database,auth,db }