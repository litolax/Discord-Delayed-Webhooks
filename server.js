import * as next from 'next';
import * as express from 'express';
import * as dotenv from 'dotenv'
import {MongoClient} from "mongodb";
import {parse} from "url"



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

export async function databaseUse() {
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
        // useNewUrlParser: true,
        // useUnifiedTopology: true,
    };

    // Connect to cluster
    let client = new MongoClient(MONGODB_URI, opts);
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

const port = 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next.default({dev});

const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express.default();

    // server.get('*', (req, res) => {
    //     const parsedUrl = parse(req.url, true);
    //    
    //     return handle(req, res, parsedUrl)
    // })
    
    server.use(async (req, res, next) => {
        const parsedUrl = parse(req.url, true);

        return handle(req, res, parsedUrl)
    })

    server.listen(port, (err) => {
        if (err) throw err;
        else {
            console.log(`Server started at port ${port}`)
        }
    })

    // setInterval(async() => {
    //     let {db} = await databaseUse();
    //
    //     let result = await db
    //         .collection('DayTimetables')
    //         .find({})
    //         .toArray()
    //
    //     console.log(result);
    // }, 2000)
})
