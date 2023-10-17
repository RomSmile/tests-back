import express from "express";
import { DBConnector } from "./db/database";

const cors = require("cors");
require('dotenv-safe').config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", require("./routes/exercise-routes"));


app.listen(port, async () => {
    try {
        await DBConnector.connect();
        return console.log(`Server is listening on ${port}`);
    } catch (err) {
        console.log(err);
        return console.error(`Server error (on ${port})`);
    }
});
