const fs = require('fs');
const mongoose = require('mongoose');
const colors = require('colors');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({path: './config/config.env'});

// Load models
const Bootcamp = require('./models/Bootcamp');

//connect to db
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

//read JSON file
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`), 'utf-8');

// Import into DB
const importData = async () => {
    try {
        await Bootcamp.create(bootcamps);
        console.log('Data imported...'.green.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// destroy seeder data
const deleteData = async () => {
    try {
        await Bootcamp.deleteMany();
        console.log('Data destroyed...'.red.inverse);
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') {
importData();
} else if(process.argv[2] === '-d') {
    deleteData();
}