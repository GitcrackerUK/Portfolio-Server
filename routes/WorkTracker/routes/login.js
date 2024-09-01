const router = require('express').Router()
const User = require('../models/user.model.js')
const mongoose = require('mongoose');
require('dotenv').config();

router.get('/', (req, res) => {
    res.send('Login router');
});

router.route('/').post((req,res)=>{
    const user = req.user;
    const password = req.password;
    const email = req.email;

    res.send('user logged in!!!')
})

module.exports = router