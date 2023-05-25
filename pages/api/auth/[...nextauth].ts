import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import {connectToDatabase} from "../../../src/server/database";

export default NextAuth({
	providers: [
		GoogleProvider({
			id: 'google',
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!
		})
	],
	secret: process.env.JWT_SECRET,
	pages: {
		signIn: '/',
		signOut: '/',
		error: '/'
	},
	callbacks: {
		async signIn(props) {
			const { db } = await connectToDatabase();
			const collection = await db.collection('accounts');
			const accounts = await collection.find({ email: props.user.email }).toArray();

			if (accounts.length < 1) return '/unauthorized';
			return true;
		}
	}
});
