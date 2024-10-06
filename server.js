const express = require('express');
const errorHandler=require('./Middleware/ErrorHandler');
const connectDb = require('./config/dbConnection');
const app = express();
const PORT=process.env.PORT||6000;
const dotenv = require('dotenv').config();

connectDb();


app.use(express.json());
app.use('/api/contacts',require('./routes/contactRoute'))
app.use('/api/users',require('./routes/userRoute'))
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));