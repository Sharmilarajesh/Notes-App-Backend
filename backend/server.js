const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.path} - ${new Date().toLocaleString()}`);
    next();
});


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to Notes API',
        
    });
});

app.use('/api/notes', notesRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found'
    });
});


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on ${PORT}`);
    });
});