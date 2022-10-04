const express = require('express');
const app = express();
const merchants = require('./routes/merchants');
const connectDB = require('./db/connect');
require('dotenv').config();

// middleware

app.use(express.json());

// routes
app.use('/api/v1/merchants', merchants);


const port = process.env.PORT || 5000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();



