import {getSession, signIn} from "next-auth/react";
import {GetServerSideProps} from "next";
import PrimaryButton from "../components/PrimaryButton";

const Unauthorized = () => {
    return <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        fontFamily: 'Greycliff CF',
        fontSize: '3.5vh',
        gap: '5%'
    }}>
        <p>
            You are not authorized
        </p>
        <PrimaryButton onClick={() => signIn('rise')}>Sign in</PrimaryButton>
</div>
}

async function redirectMainPage(ctx: any) {
    const session = await getSession(ctx);
    if (session) return {
        destination: '/main',
        permanent: false
    }
    return undefined;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: await redirectMainPage(ctx),
        props: {}
    };
}

export default Unauthorized;
