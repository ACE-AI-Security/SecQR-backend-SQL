const express = require('express');
const passport = require('passport');
const session = require('express-session');
const urlRoutes = require('./routes/urlRoutes');
const authRoutes = require('./routes/authRoutes');
require('dotenv').config();
require('./services/authService');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({ secret: process.env.JWT_SECRET, resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/auth', authRoutes);
app.use('/api', urlRoutes);

module.exports = app;
