const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { initModels } = require('./models');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
const PORT = process.env.PORT || 8080;
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());

// Initialize models and sync database
initModels();

// Routes
app.use('/api/students', studentRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
