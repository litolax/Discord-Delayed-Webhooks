﻿import { MongoClient } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI ?? '';
const MONGODB_DB = process.env.DB_NAME ?? '';
const dev = process.env.NODE_ENV !== 'production';

// check the MongoDB URI
if (!MONGODB_URI) {
	throw new Error('Define the MONGODB_URI environmental variable');
}

// check the MongoDB DB
if (!MONGODB_DB) {
	throw new Error('Define the MONGODB_DB environmental variable');
}

let cachedClient: any = null;
let cachedDb: any = null;

export async function connectToDatabase() {
	// check the cached.
	if (cachedClient && cachedDb) {
		// load from cache
		return {
			client: cachedClient,
			db: cachedDb
		};
	}

	// set the connection options
	const opts = {
		// useNewUrlParser: true,
		// useUnifiedTopology: true,
	};

	// Connect to cluster
	let client = new MongoClient(
		dev
			? `${process.env.MONGODB_URI}`
			: `mongodb://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@${process.env.MONGODB_URI}`,
		opts
	);
	await client.connect();
	let db = client.db(MONGODB_DB);

	// set cache
	cachedClient = client;
	cachedDb = db;

	return {
		client: cachedClient,
		db: cachedDb
	};
}
