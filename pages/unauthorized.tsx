import { getSession, signIn } from 'next-auth/react';
import { GetServerSideProps } from 'next';
import PrimaryButton from '../components/PrimaryButton';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const Unauthorized = () => {
	const { t } = useTranslation('common');

	return (
		<div
			style={{
				width: '100%',
				height: '100vh',
				display: 'flex',
				flexDirection: 'column',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'Greycliff CF',
				fontSize: '3.5vh',
				gap: '5%',
				color: 'rgb(255, 255, 255)'
			}}
		>
			<p>{t('notAuthorized')}</p>
			<PrimaryButton onClick={() => signIn('rise')}>
				{t('signIn')!}
			</PrimaryButton>
		</div>
	);
};

async function redirectMainPage(ctx: any) {
	const session = await getSession(ctx);
	if (session)
		return {
			destination: '/main',
			permanent: false
		};
	return undefined;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	return {
		redirect: await redirectMainPage(ctx),
		props: {
			...(await serverSideTranslations(ctx.locale || 'ru', ['common', 'posts']))
		}
	};
};

export default Unauthorized;
