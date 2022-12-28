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
    
    const error = 'Post has create successfully';
    
    const postData = JSON.parse(req.body) as IPost;
    
    if (postData.content.length < 1) return res.json({ error: 'Content can\'t be empty' });
    if (!postData.publishDate) return res.json({ error: 'Publication date can\'t be empty' });

    const posts = await collection.find({ content: postData.content, publishDate: postData.publishDate, sent: false }).toArray();
    if (posts.length > 0) return res.json({ error: 'You\'re already have post with these arguments' });
    
    collection.insertOne(postData)
    
    res.json({ error: error })
}