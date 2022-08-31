import { NextPage } from "next";
import { useEffect } from "react";
import Wrapper from "../components/Wrapper";

const MenusPage: NextPage = () => {


    return(
        <Wrapper title={"Menus"}>
            <div className="flex flex-col items-center">
                Hello from the menu page
            </div>
        </Wrapper>
    )
}

export default MenusPage;