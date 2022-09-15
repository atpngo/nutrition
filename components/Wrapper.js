import { IoMdExit } from "react-icons/io"
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

const Wrapper = ({title, children}) => {

    const router = useRouter();

    return (
        <div className="p-4 flex flex-col mb-16">
            <div className="flex justify-between">
                <p className="text-4xl text-primary-blue font-semibold">{title}</p>
                <button className="text-lg text-primary-blue" onClick={() => {

                    if (localStorage.hasOwnProperty('guest') && JSON.parse(localStorage.getItem('guest')))
                    {
                        router.push('/menus')
                    }
                    else
                    {
                        signOut({callbackUrl: `${window.location.origin}`});
                        // clear local storage
                        localStorage.clear();
                    }
                }
                }><IoMdExit size="2em"/></button>
            </div>
            <div className="pt-4">
                {children}
            </div>
        </div>
    )
}

export default Wrapper;