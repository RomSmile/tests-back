const express = require('express');
import router from './routes/exercise-routes';
import dbRouter from "./routes/database-routes";

const cors = require('cors');
require('dotenv-safe').config();

const port = process.env.PORT;

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/v1", router);
app.use("/api/v1", dbRouter);


app.listen(port, async () => {
    try {
        return console.log(`Server is listening on ${port}`);
    } catch (err) {
        console.log(err);
        return console.error(`Server error (on ${port})`);
    }
});
