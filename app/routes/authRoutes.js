const express = require('express');
const passport = require('passport');
const { generateToken } = require('../services/authService');

const router = express.Router();

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
    (req, res) => {
        const token = generateToken(req.user);
        res.redirect(`/?token=${token}`);
    });

module.exports = router;
