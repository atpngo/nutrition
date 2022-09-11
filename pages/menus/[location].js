import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const DeNeve = () => {
    const [location, setLocation] = useState(null);
    const router = useRouter();
    const validDiningHall = ['DeNeve', 'Rieber', 'Epicuria', 'BruinPlate']

    useEffect(() => {
        let diningHall = window.location.pathname.split("/")[2];
        if (!validDiningHall.includes(diningHall))
        {
            router.push('/menus')
        }
        else
        {
            setLocation(diningHall)
        }
    }, [])
    
    return (
        <div>
            {location}
        </div>
    )
}

export default DeNeve;