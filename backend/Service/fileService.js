import { File } from "../firebaseconfig.js";
import { addDoc, setDoc,getDoc, getDocs, query,where,doc,documentId} from "firebase/firestore";

// database services for file controller

//add a file to the database
const addFile= async (data)=>{
    try {
        const docRef = doc(File,`/${data.id}`);
        await setDoc(docRef, data);
    }
    catch (err) {
        console.log(err);
        return err;
    }                                           
}

//get all files from collection
const getAll = async () => {
    try {
        const snapshot = (await getDocs(File)).docs
        const list = snapshot.map((x) => x.data());
        return list;
    }
    catch (err) {
        console.log(err);
        return err;
    }
}

//get all files with status=unverified
const getUnverified = async () => {
    try {
        const q = query(File, where('status', '==', 'unverified'));
        const snapshot = (await getDocs(q)).docs
        const list = snapshot.map((x) => x.data());
        return list;
    }
    catch (err) {
        console.log(err);
        return err;
    }  
};

//get a file by it's id
const getbyId=async (id)=>{
    try {
        const docRef = doc(File, `/${id}`);
        let data = (await getDoc(docRef)).data();
        return data;
    }
    catch (err) {
        console.log(err);
        return err;
    }  
}


//update the file by adding a message field and change it's status.
const setbyId = async (id, text)=>{
    try {
        const docRef = doc(File, `/${id}`);
        let data = (await getDoc(docRef)).data();
        data["message"] = text;
        data["status"] = "verified";
        await setDoc(docRef, data);
        return { message: "Success!" };
    }
    catch (err) {
        console.log(err);
        return err;
    }
}


export {addFile,getAll,getbyId,getUnverified,setbyId}