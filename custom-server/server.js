﻿const next = require('next')
const express = require('express')
const dotenv = require('dotenv')
const MongoClient = require('mongodb').MongoClient;
const url = require('url')
const axios = require('axios')
const bson = require('bson');

dotenv.config({ path: './.env.local' })

///////
const MONGODB_URI = process.env.MONGODB_URI ?? '';
const MONGODB_DB = process.env.DB_NAME ?? '';

// check the MongoDB URI
if (!MONGODB_URI) {
    throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
    throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient = null;
let cachedDb = null;

async function databaseUse() {
    // check the cached.
    if (cachedClient && cachedDb) {
        // load from cache
        return {
            client: cachedClient,
            db: cachedDb,
        };
    }

    // set the connection options
    const opts = {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(dev ? `${process.env.MONGODB_URI}` : `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`, opts);
    await client.connect();
    let db = client.db(MONGODB_DB);

    // set cache
    cachedClient = client;
    cachedDb = db;

    return {
        client: cachedClient,
        db: cachedDb,
    };
}

const port = process.env.PORT;
const dev = process.env.NODE_ENV !== 'production';
const app = next.default({dev});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    // server.get('*', (req, res) => {
    //     const parsedUrl = parse(req.url, true);
    //    
    //     return handle(req, res, parsedUrl)
    // })
    
    server.use(async (req, res, next) => {
        const parsedUrl = url.parse(req.url, true);

        return handle(req, res, parsedUrl)
    })

    server.listen(port, (err) => {
        if (err) throw err;
        else {
            console.log(`Server started at port ${port}`)
        }
    })
    
    setInterval(async() => {
        let { db } = await databaseUse();

        const collection = await db.collection('posts');
        
        const result = await collection
            .find({ sent: false })
            .toArray()

        for (const element of result) {
            if (new Date() > new Date(element.publishDate) && !element.sent) {
                sendWebhook(element)
                await collection.updateOne({_id: element._id}, { $set: { sent: true}})
        }}
    }, 10000)
})

function sendWebhook(element) {
    let data = JSON.stringify({
        'content': element.content,
        ...(username.length > 0 && { 'username': element.username }),
        ...(avatarUrl.length > 0 && { 'avatarUrl': element.avatarUrl }),
        'embeds': element.embeds
    })

    const config = {
        method: "POST",
        url: element.webhook,
        headers: {"Content-Type": "application/json"},
        data: data,
    };

    axios(config)
        .then((response) => {
            console.log("Webhook delivered successfully");
            return response;
        })
        .catch((error) => {
            console.log(error);
            return error;
        });
}

