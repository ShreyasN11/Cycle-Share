require('dotenv').config();
const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
app.use(cors())

const mongoose = require('mongoose');
const { logger } = require('./middleware/logEvents');
const errorHandler = require('./middleware/errorHandler');
const connectDB = require('./config/dbCon');

const PORT = process.env.PORT || 3500;
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger);

app.use('/', require('./api/root'));

app.use(errorHandler);

app.listen(PORT, () => console.log(`Server running on port number ${PORT}`));