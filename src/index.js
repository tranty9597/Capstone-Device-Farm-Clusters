import express from 'express';
import bodyParser from 'body-parser'
import cors from 'cors'

import { IncreaseComsumedElectricNumber } from './cronJob';
import { InfoRequestRoute } from './routes';

// Set up the express app
const app = express();

app.use(cors())
// support parsing of application/json type post data
app.use(bodyParser.json());

//support parsing of application/x-www-form-urlencoded post data
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', InfoRequestRoute)

IncreaseComsumedElectricNumber.start()

const PORT = process.env.PORT || 4200

app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
});
