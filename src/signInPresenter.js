import React, { useState, useEffect } from "react";
import { signInWithUserAccount } from "./firebaseModel";
import resolvePromise from "./resolvePromise";
import SignInView from "./views/signInView";
import { Navigate } from "react-router-dom";


function SignIn(props){
    const [signInPromiseState] = useState({});
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [, reRender] = useState();
    const [currentUser, setCurrentUser] = useState(props.model.currentUser);

    function observerACB(){
        setCurrentUser(props.model.currentUser);
    }
    function wasCreatedACB(){
        props.model.addObserver(observerACB);
        return function isTakenDownACB(){props.model.removeObserver(observerACB);};
    }

    useEffect(wasCreatedACB, []); 
    
    function handleUserSignInACB(){
        resolvePromise(signInWithUserAccount(email, password),signInPromiseState, notifyACB);

    }
    function accountEmailACB(userEmail){
        setEmail(userEmail);
    }

    function accountPasswordACB(userPassword){
        setPassword(userPassword);
    }
    function notifyACB(){
        reRender(new Object());
    }
    
    return(
        <div>
            {currentUser != null &&
                <Navigate to="/" replace={true} />
            }
            <SignInView onSignIn={handleUserSignInACB} email={accountEmailACB} password={accountPasswordACB}/>
        </div>
    );
}

export default SignIn;