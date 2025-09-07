const mongoose = require('mongoose');

const User = require('../models/User');

// Authenticate user
const authenticateUser = async(data) => {
    return await User.findOne({
        username: data.username,
        password: data.password
    });
}

module.exports = {
    authenticateUser
};