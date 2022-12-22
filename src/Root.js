import React, { useEffect, useState } from "react";
import { firebaseModelPromise, updateFirebaseFromModel, updateModelFromFirebase } from "./firebaseModel";
import promiseNoData from "./promiseNoData";
import resolvePromise from "./resolvePromise";
import Tripmodel from './TripModel';


const App=require("./App.js").default;

function Root(){
    const [model, setModel] = React.useState(new Tripmodel());
    const [, reRender] = useState();
    const [promiseState] = useState({});

    useEffect(() => {
        resolvePromise(firebaseModelPromise(), promiseState, connectAndNotifyModelACB);
    },[]);

    function connectAndNotifyModelACB(){
        reRender(new Object());
        if(promiseState.data){
            setModel(promiseState.data);
            updateModelFromFirebase(promiseState.data);
            updateFirebaseFromModel(promiseState.data);
        }     
    }
    return (
        <div>
            {promiseNoData(promiseState) || (
                <App model={model}/>

            )}
        </div>
    )
}

export default Root;