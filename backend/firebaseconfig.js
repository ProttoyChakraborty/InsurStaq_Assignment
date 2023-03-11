
import { initializeApp } from "firebase/app";
import 'firebase/compat/firestore';
import { getFirestore, collection } from "firebase/firestore";

//config object for initialising firebase instance
const firebaseconfig = {
    apiKey: "AIzaSyC4ESuFcO-rLSOO-vQDFAMlVzB8GvxJlHU",
    authDomain: "documentverify-2b8f0.firebaseapp.com",
    projectId: "documentverify-2b8f0",
    storageBucket: "documentverify-2b8f0.appspot.com",
    messagingSenderId: "1015405678564",
    appId: "1:1015405678564:web:d4d764b3fcbaac3499c1f1",
    measurementId: "G-KKJ15NS05C"
}
//initialising firebase app instance
const app = initializeApp(firebaseconfig);

//initialising firestore instance
const store = getFirestore(app);

//Reference to files collection in firestore
const File = collection(store, "Files");

export {app,File} 