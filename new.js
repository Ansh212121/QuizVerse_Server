require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');

const SignUpModel = require('./models/SignUpSchema');
const Results = require('./models/ResultSchema');

const app = express();

app.use(express.json());

const FRONTEND_URL = process.env.FRONTEND_URL || 'https://quiz-verse-client.vercel.app';
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true
  })
);

const MONGO_URI = process.env.MONGODB_URL;
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.get('/', (req, res) => {
  res.send('Backend is running!');
});

app.use('/user', require('./routes/auth'));
app.use('/results', require('./routes/results'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
