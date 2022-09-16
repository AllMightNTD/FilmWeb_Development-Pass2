const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/Music_Dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connect succesfully');
    } catch (error) {
        console.log(error.message);
    }
}

module.exports = { connect };
