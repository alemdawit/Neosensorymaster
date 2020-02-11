#!/usr/bin/env node
const express = require('express');
const lodash = require('lodash');
const crypto = require('crypto');
const faker = require('faker');
const uuidv4 = require('uuid/v4');

const HOST = '0.0.0.0';
const PORT = process.env.PORT || 8080;
const FAKE_USER_COUNT = 30;

const USER_ALLOWED_FIELDS = ['email', 'name', 'notes', 'enabled'];
const USER_REQUIRED_FIELDS = ['email'];

const app = express();
app.use(express.json());

const users = [];

function randomEmail() {
    const randomString = crypto.randomFillSync(Buffer.alloc(4)).toString('hex');
    return randomString + '_' + faker.internet.email();
}

function generateFakeUsers(count) {
    for (let i = 0; i < count; ++i) {
        users.push({
            uuid: uuidv4(),
            email: randomEmail(),
            notes: faker.lorem.text(),
            name: faker.name.findName(),
            enabled: true,
        });
    }
}

app.get('/users', (req, res) => {
    let { offset, limit } = req.query;

    if (offset == null) {
        offset = 0;
    }
    if (limit == null) {
        limit = 10;
    }

    offset = +offset;
    limit = +limit;

    let page = lodash.slice(users, offset, offset + limit);

    res.send({
        data: page,
        offset,
        limit,
        total: users.length,
    });
});

app.post('/users', (req, res) => {
    if (!req.body) {
        res.status(400).end();
        return;
    }

    const user = { uuid: uuidv4() };

    for (const field of USER_ALLOWED_FIELDS) {
        if (req.body.hasOwnProperty(field)) {
            user[field] = req.body[field];
        }
    }

    for (const field of USER_REQUIRED_FIELDS) {
        if (!user.hasOwnProperty(field) || user[field] == null) {
            res.status(400).end();
            return;
        }
    }

    users.push(user);

    res.send({
        data: user,
    });
});

app.get('/users/:uuid', (req, res) => {
    let id = users.find(id => id.uuid == req.params.uuid);
    if (id) {
        res.status(200).json({
            id: id
        })
    } else {
        res.status(200).json({
            message: 'ID not found',
        });
    }
    //res.status(500).end();
});

app.put('/users/:uuid', (req, res) => {

    //const id = req.params.uuid;

    let id = users.find(id => id.uuid == req.params.uuid);
    if (id) {
        //body = id
        if (req.body.name) {
            id.name = req.body.name
        }
        if (req.body.email) {
            id.email = req.body.email
        }
        if (req.body.notes) {
            id.notes = req.body.notes
        }
        if (req.body.enabled) {
            id.enabled = req.body.enabled
        }
        res.status(200).json({
            message: 'successfully Updated',
            id: id
        })
    } else {
        res.status(200).json({
            message: 'ID not found'
        });
    }

    //res.status(500).end();
});

generateFakeUsers(FAKE_USER_COUNT);

console.log(`Serving on ${HOST}:${PORT}`);
app.listen(PORT, HOST);
