const express = require('express');
const session = require('express-session');
const cors = require('cors');
const passport = require('passport');
const bodyParser = require('body-parser');
const connectDB = require("../config/database");
const organizationRoutes = require('./routes/organizationRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
require('./middleware/passport');

const app = express();
connectDB()
app.use(cors());


app.use(session({
    secret: 'secret_key',
    resave: false,
    saveUninitialized: false
  }))

// Setup middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

// Define routes
app.use('/api/organizations', organizationRoutes);
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
