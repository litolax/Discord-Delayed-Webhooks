import { ObjectID } from 'bson';
import IEmbed from './IEmbed';

export default interface IPost {
	_id: ObjectID;
	content: string;
	creationDate: Date;
	publishDate: Date | undefined;
	sent: boolean;
	sender: string;
	webhook: string;
	username: string;
	avatarUrl: string | undefined;
	embeds: IEmbed[];
}
