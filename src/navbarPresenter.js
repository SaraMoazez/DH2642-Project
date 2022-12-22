import { useEffect, useState } from "react";
import { signOut } from "./firebaseModel.js";
import NavbarSignedIn from "./views/navbarSignedInView.js";
import NavbarSignedOut from "./views/navbarSignedOutView.js";


function Navbar(props){
    const [currentUser, setCurrentUser] = useState(props.model.currentUser);

    function observerACB(){
        setCurrentUser(props.model.currentUser);
    }
    function wasCreatedACB(){
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){props.model.removeObserver(observerACB);};
    }

    useEffect(wasCreatedACB, []); 

    function handleSignOutACB(){
        signOut();
        props.model.signOutUser();
    }

    return (
    <div>
        {currentUser? 
            <NavbarSignedIn onSignOut={handleSignOutACB}/> 
            :
            <NavbarSignedOut/>
        }
    </div>
    )
}

export default Navbar;