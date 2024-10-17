const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');

const app = express();
app.use(bodyParser.json());
app.use(cors());

mongoose.connect('mongodb://localhost:27017/sensDatabase');

const dataSchema = new mongoose.Schema({
    name: String,
    age: Number,
    height: Number,
    weight: Number,
    oxygen: {
        type: Number,
        default: null
    },
    heartRate: {
        type: Number,
        default: null
    }
});

const Data = mongoose.model('Data', dataSchema);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/addData', (req, res) => {
    console.log('Received data:', req.body); // Log received data
    const newData = new Data(req.body);
    newData.save()
        .then(() => {
            console.log('Data saved successfully');
            res.send('Data added successfully!');
        })
        .catch(err => {
            console.error('Error saving data:', err);
            res.status(400).send(err);
        });
});

app.delete('/clearData', (req, res) => {
    Data.deleteMany({})
        .then(() => {
            console.log('All data cleared successfully');
            res.send('All data cleared successfully!');
        })
        .catch(err => {
            console.error('Error clearing data:', err);
            res.status(400).send(err);
        });
});

app.get('/getData', (req, res) => {
    Data.find({})
        .then(data => {
            console.log('Fetched data:', data); // Log fetched data
            res.json(data);
        })
        .catch(err => {
            console.error('Error fetching data:', err);
            res.status(400).send(err);
        });
});

app.use(express.static(path.join(__dirname, 'public')));

// Serial port setup
let port;
try {
    port = new SerialPort({ path: 'COM6', baudRate: 9600 });
    const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

    parser.on('data', (data) => {
        console.log('Received data from Arduino:', data);
        const [oxygen, heartRate] = data.split(',').map(Number);
        const newData = new Data({ oxygen, heartRate });
        newData.save()
            .then(() => console.log('Data saved successfully'))
            .catch(err => console.error('Error saving data:', err));
    });

    port.on('error', (err) => {
        console.error('Error: ', err.message);
    });
} catch (err) {
    console.error('Failed to open serial port:', err.message);
}

app.listen(3000, () => console.log('Server running on port 3000'));
