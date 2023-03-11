import express from 'express';
import bodyParser from 'body-parser'
import controller from './Controller/controller.js';
import cors from 'cors'
const app = express();

app.use(cors(
    {
        origin: "*"
    }
));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api", controller);
app.listen(4000, () =>
    console.log("Backend Running on Port 4000 !!!"));