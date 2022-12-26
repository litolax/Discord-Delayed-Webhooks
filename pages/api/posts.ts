import {NextApiRequest, NextApiResponse} from "next";
import { connectToDatabase } from "../../src/server/database";
import IPost from "../../src/models/IPost";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { db } = await connectToDatabase();
    const collection = await db
        .collection('posts');
    
    if (req.method !== 'POST') {
        const data = await collection.find().toArray();
        return res.status(405).json(data);
    }
    
    const postsData = JSON.parse(req.body) as IPost;
    collection.insertOne(postsData)
    
    res.json({ message: postsData })
}