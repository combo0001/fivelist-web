import { useRouter } from "next/router";

export default function ResetPassword(): JSX.Element {
    const { query } = useRouter();

    return (
        <>
            <pre>{query.token}</pre>
            <h1>Hello world!</h1>
        </>
    )
}