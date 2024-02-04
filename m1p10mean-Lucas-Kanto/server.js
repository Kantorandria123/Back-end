const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
const routes = require('./routes/routes');
const cors = require('cors');

app.use(cors({
  origin: "http://localhost:4200"
}));

const PORT = 3000;

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/salon_beaute");

// Handling MongoDB connection events
const db = mongoose.connection;
db.on('error', (error) => {
    console.error('Error connecting to DB:', error);
});

db.once('open', () => {
    console.log('Successfully connected to DB');
    
    // Start the server after successfully connecting to the database
    app.listen(PORT, () => {
        console.log('Server started on port ${PORT}');
    });
});

app.use(express.json());
app.use(routes);
