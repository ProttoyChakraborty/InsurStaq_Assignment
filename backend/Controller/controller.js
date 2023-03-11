import express from 'express'
const router = express.Router();
import { app } from '../firebaseconfig.js'
import { addFile, getAll, getbyId,getUnverified, setbyId } from '../Service/fileService.js';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import multer from 'multer';


const storage = getStorage();
const upload = multer({ storage: multer.memoryStorage() });

//process the file from request using multer
router.post("/upload", upload.single("pdf"), async (req, res) => {
    if (!req.file) {
        console.log("Error: No file found");
        res.status(500).send({message:"server error"});
    }
    const dateTime = Date.now();
    console.log("upload req received");
    
    //create unique reference for file
    const storageRef = ref(storage, `files/${req.file.originalname}-${dateTime}`);
    
    //defines the type of file
    const metadata = {
        contentType:req.file.mimetype,
    }

    //snapshot is a reference to the file while its's being uploaded, we can pause , cancel upload using this object
    const snapshot = await uploadBytesResumable(storageRef, req.file.buffer, metadata);


    //get the public url of file to store in database
    const downloadUri = await getDownloadURL(snapshot.ref);

    //create file object in the database
    const obj = {
        id:dateTime,
        name: req.file.originalname,
        status: "unverified",
        url: downloadUri,
    }
    try {
        await addFile(obj).then((obj) => {
            console.log("added document");
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).send({message:"server error"});
    }

    res.status(200).send("success!");

});

//get a file object by it's id
router.route("/file/:id").get(async (req, res) => {
    console.log("request for file with id: ", req.params.id);
    const id = req.params.id;
    if (!id || id == "") {
        res.status(404).send({ message: "missing ID parameter" });
    }
    try {
        const data = (await getbyId(id));
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Intenal Server Error" });
    }
});

//verfiy a file object by it's id
router.route("/verify/:id").put(async (req, res) => {
    const id = req.params.id;
    const { message } = req.body;
    try {
        const data = await setbyId(id,message);
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Intenal Server Error" });
    }
    
});

//get all file objects in collection
router.route("/getAll").get(async (req,res) => {
    try {
        const data = await getAll();
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Intenal Server Error" });
    }
});

//get all file objects whose status is unverified
router.route("/getNew").get(async (req, res) => {
    try {
        const data = await getUnverified();
        res.status(200).send(data);
    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Intenal Server Error" });
    }
});

export default router;