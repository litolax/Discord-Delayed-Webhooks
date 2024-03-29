﻿import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function SignIn() {
	const session = useSession();
	const router = useRouter();
	useEffect(() => {
		if (session.status == 'unauthenticated') signIn('google');
		else router.push('/main');
	});

	return null;
}
