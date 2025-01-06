require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./infrastructure/db/MongoDBClient');
const authRoutes = require('./routes/authRoutes');
const profileRoutes = require('./routes/profileRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/profiles', profileRoutes);

(async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
})();
