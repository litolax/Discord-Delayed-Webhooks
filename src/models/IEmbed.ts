import {ObjectID} from "bson";

export default interface IEmbed {
    _id: ObjectID,
    title: string,
    color: number,
    description: string,
    thumbnail: string,
    footer: {
        text: string,
        icon_url: string
    },
    author: {
        name: string,
        icon_url: string
    },
    image: {
        url: string
    }
}