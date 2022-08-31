import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

const NavBar = () => {
    const {data: session} = useSession();

    return (
        <div className="fixed inset-x-0 bottom-0 h-16 bg-primary-blue">
            <div className="flex flex-row gap-3">
                <Link href="/">HOME</Link>
                <Link href="/menus">Menus</Link>
                <Link href="/test">Test</Link>
                <button onClick={() => signOut({callbackUrl: `${window.location.origin}`}) }>Sign Out</button>
            </div>
        </div>
    )
}

export default NavBar;