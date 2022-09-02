import { IoMdExit } from "react-icons/io"
import { signOut } from "next-auth/react";

const Wrapper = ({title, children}) => {
    return (
        <div className="p-4 flex flex-col mb-16">
            <div className="flex justify-between">
                <p className="text-4xl text-primary-blue font-semibold">{title}</p>
                <button className="text-lg text-primary-blue" onClick={() => signOut({callbackUrl: `${window.location.origin}`})}><IoMdExit size="2em"/></button>
            </div>
            {children}
        </div>
    )
}

export default Wrapper;