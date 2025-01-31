const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

// Use the PORT environment variable provided by Vercel (or fallback to 5000 locally)
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// MongoDB URI from environment variables
const dbURI = process.env.MONGO_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("MongoDB Connection Error: ", err);
  });

// Define the Result schema and model
const resultSchema = new mongoose.Schema({
  registrationNumber: { type: String, unique: true, required: true },
  time: { type: Number, required: true },
});

const Result = mongoose.model('Result', resultSchema);

// Route to handle the result data
app.post('/api/results', async (req, res) => {
  const { time, registrationNumber } = req.body;

  try {
    // Save the new result
    const newResult = new Result({ time, registrationNumber });
    await newResult.save();
    res.status(201).json({ message: 'Result saved successfully' });
  } catch (error) {
    // Check for MongoDB duplicate key error (E11000)
    if (error.code === 11000) {
      return res.status(200).json({ message: 'Result for this registration number already exists. No new entry made.' });
    }
    console.error('Error saving result:', error);
    res.status(500).json({ message: 'Error saving result.' });
  }
});

// Listen on the dynamic port (or fallback to 5000)
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
