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
    
    const error = 'created';
    
    const postData = JSON.parse(req.body) as IPost;
    
    if (postData.content.length < 1) return res.json({ error: 'error.empty.content' });
    if (postData.content.length > 2000) return res.json({ error: 'error.hugeLength' });
    if (!postData.publishDate) return res.json({ error: 'error.empty.date' });
    if (postData.webhook.length < 1) return res.json({ error: 'error.empty.webhook' });

    const posts = await collection.find({ content: postData.content, publishDate: postData.publishDate, webhook: postData.webhook, sent: false }).toArray();
    if (posts.length > 0) return res.json({ error: 'error.alreadyHaveSamePost' });
    
    collection.insertOne(postData)
    
    res.json({ error: error })
}