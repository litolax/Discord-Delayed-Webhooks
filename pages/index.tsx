import {GetServerSideProps} from "next";
import {authRedirect} from "../src/server/authRedirect";

export default function Home() {
    return <></>
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    return {
        redirect: await authRedirect(ctx) ?? {
            destination: "/main",
        },
        props: {}
    };
}