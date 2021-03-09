const fs = require('fs');
const express = require('express');
const { random } = require('lodash');
const bodyParser = require('body-parser');
const { v4 } = require('uuid');

const app = express();
// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// обработка запроса по адресу http://localhost:3000/
app.get('/product-list', (reqest, res) => {
    const data = JSON.parse(fs.readFileSync('./product.json'));
    res.json(data);
});
app.get('/product-cart', (reqest, res) => {
    const data = JSON.parse(fs.readFileSync('./product-cart.json'));
    res.json(data);
});

app.post('/product-cart', (req, res) => {
    const data = JSON.parse(fs.readFileSync('./product-cart.json'));
    data.push({ productName: req.body.productName, price: req.body.price, id: v4() });
    fs.writeFileSync('product-cart.json', JSON.stringify(data));
    res.json({
        success: true,
    });
});
app.delete('/product-delete', (req, res) => {
    let data = JSON.parse(fs.readFileSync('./product-cart.json'));
    id = req.body.id;
    if (id == undefined) {
        res.json({
            err: '404 product ',
        });
    } else {
        console.log(id);
    }

    indexElement = data
        .map(function (o) {
            return o.id;
        })
        .indexOf(id);

    if (indexElement == '-1') {
        res.json({ err: '404 product' });
    } else {
        data.splice(indexElement, 1);
    }
    fs.writeFileSync('product-cart.json', JSON.stringify(data));
    res.json({
        success: 'delete',
    });
});

app.listen(3000, () => {
    console.log('App is running on port 3000');
});
