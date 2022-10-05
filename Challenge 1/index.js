const express = require('express');
const app = express();
// routers
const authRouter = require('./routes/auth');
const merchantsRouter = require('./routes/merchants');

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
require('dotenv').config();


// middleware

app.use(express.json());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/merchants', authenticateUser, merchantsRouter);


const port = process.env.PORT || 3000;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server is listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();




