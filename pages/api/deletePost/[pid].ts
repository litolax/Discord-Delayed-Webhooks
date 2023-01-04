import {NextApiRequest, NextApiResponse} from "next";
import {connectToDatabase} from "../../../src/server/database";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const {pid} = req.query
    const {db} = await connectToDatabase();

    const post = await db.collection('posts')
        .deleteOne({_id: `${pid}`});

    res.json(post)
}