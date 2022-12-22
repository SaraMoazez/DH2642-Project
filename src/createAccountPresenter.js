import React, { useState } from "react";
import { createNewUserInFirebase } from "./firebaseModel";
import resolvePromise from "./resolvePromise";
import CreateAccountView from "./views/createAccountView";
import {Link } from "react-router-dom";



function CreateAccount(props){
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);
    const [createAccountPromiseState] = useState({});
    const [, reRender] = useState();


    async function handleCreateAccountACB(){
        try{
            resolvePromise(createNewUserInFirebase(email, password), createAccountPromiseState, notifyACB);
        }
        catch(error){
            console.log(error.message)
        }
    }

    function notifyACB(){
        reRender(new Object());
    }

    function accountEmailACB(userEmail){
        setEmail(userEmail);
    }

    function accountPasswordACB(userPassword){
        setPassword(userPassword);
    }
    
    return(
        <div>
            <CreateAccountView onCreateAccount={handleCreateAccountACB} email={accountEmailACB} password={accountPasswordACB}/>
        </div>
    );
}

export default CreateAccount;