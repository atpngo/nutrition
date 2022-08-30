import type { NextPage } from 'next';
import { signOut, useSession } from 'next-auth/react';
import { useEffect } from 'react';
import SlidingButton from '../components/SlidingButton';

const Test: NextPage = () => {

    const {data: session} = useSession();
    useEffect(() => {
        console.log(session);
    }, [])

    return (
        <div className="flex flex-col items-center">
            Test Page
        </div>
    )
}

export default Test;