require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./infrastructure/db/MongoDBClient');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/profiles', profileRoutes);


// Only start the server if it's not in test environment
if (process.env.NODE_ENV !== 'test') {
  (async () => {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })();
}

module.exports = app;  // Export app for testing purposes
