const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const connectDB = require('./connection');

const app = express();

dotenv.config({ path: 'config.env' });

// CORS
app.use(cors({
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

// mongoDB Connection
connectDB();

app.use(express.json());

// app.post();
// app.put();
// app.delete();

// load routers
app.use('/', require('./routes/router'));

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`listening on port ${port}...`);
});