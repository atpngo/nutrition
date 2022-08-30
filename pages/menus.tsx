import { NextPage } from "next";
import { useEffect } from "react";

const MenusPage: NextPage = () => {
    useEffect(() => {
        console.log("i am at menus page")
    }, [])
    return(
        <div className="flex flex-col items-center">
            Hello from the menu page
        </div>
    )
}

export default MenusPage;