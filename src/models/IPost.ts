﻿import {ObjectID} from "bson";


export default interface IPost {
    _id: ObjectID,
    content: string,
    creationDate: Date,
    publishDate: Date,
    sent: boolean,
    sender: string
}