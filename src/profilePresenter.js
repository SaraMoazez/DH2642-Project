import ProfileView from "./views/profileView.js";
import { useEffect, useState } from "react";


function Profile(props){
    const [totalFootprint, setTotalFootprint] = useState(0);
    
    useEffect(() => {   
        let total = 0;
        props.model.tripHistory.map((trip) => {
            total += trip.footprint;
        });
        setTotalFootprint(total);
    }, []);
    

    return <ProfileView email={props.model.email} trips={props.model.tripHistory} totFootprint={totalFootprint.toFixed(2)}/>;
}

export default Profile;
