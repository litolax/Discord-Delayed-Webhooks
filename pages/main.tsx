﻿import MainLayout from '../components/MainLayout';
import { GetServerSideProps } from 'next';
import { authRedirect } from '../src/server/authRedirect';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export default function Main() {
	return <MainLayout />;
}

export const getServerSideProps: GetServerSideProps = async ctx => {
	return {
		redirect: await authRedirect(ctx),
		props: {
			...(await serverSideTranslations(ctx.locale || 'ru', ['common']))
		}
	};
};
