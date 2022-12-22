import firebaseConfig from "./firebaseConfig";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import TripModel from "./TripModel.js";


firebase.initializeApp(firebaseConfig);
const REF="TripModel";


function firebaseModelPromise() {
  return firebase
    .database()
    .ref(REF)
    .once("value")
    .then(() => {
       return new TripModel();
    });
}

function updateFirebaseFromModel(model){
  function observerACB(payload){
    if(payload){
        if(payload.hasOwnProperty("addTrip")){
            firebase
              .database()
              .ref(REF+"/users/" + model.currentUser + "/tripHistory/" + payload.addTrip.id)
              .set(payload.addTrip);
        }
        if(payload.hasOwnProperty("removeTrip")){
            firebase.database()
              .ref(REF+"/users/" + model.currentUser + "/tripHistory/" + payload.removeTrip)
              .set(null);
        }
    }
  }
  model.addObserver(observerACB)
  return;
}


function updateModelFromFirebase(model){
  firebase
    .auth()
    .onAuthStateChanged((user) => {
      if(user){
        model.setCurrentUser(user.uid);
        model.setEmail(user.email);

        firebase
        .database()
        .ref(REF+"/users/" + model.currentUser + "/tripHistory/")
        .on("child_added", 
          function tripHistoryAdded(firebaseData) {
            model.addToHistory(firebaseData.val());
          }
        );
      }
      else{
        model.setCurrentUser(null);
        model.setEmail(null);
      }
    })
    return;
}

async function createNewUserInFirebase(email, password) {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        return firebase
          .database()
          .ref(REF + "/users/" + userCredential.user.uid)
          .set({email: email,})
          .then(alert("Your account has been successfully created!"))
      })
      .catch((error) => {
        alert(error.message);
      });
}

function signInWithUserAccount(email, password){
  return firebase
    .auth()
    .signInWithEmailAndPassword(email,password)
    .catch((error) => {
      alert(error.message);
    });

}

function signOut(){
  return firebase
    .auth()
    .signOut()
    .catch((error) => {
      console.log(error);
    })
}

export{
    firebaseModelPromise, createNewUserInFirebase, signInWithUserAccount, signOut, updateModelFromFirebase, updateFirebaseFromModel
};
