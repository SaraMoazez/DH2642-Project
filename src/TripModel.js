import { v4 as uuidv4 } from 'uuid';
class TripModel{
    constructor(){
        this.observers = [];
        this.tripHistory = [];
        this.trips = [];
        this.currentUser = null;
        this.email = null;
    }
    
    addObserver(CB) {
        this.observers = [...this.observers, CB];
    }
    removeObserver(CB){
        function compareObserserverCB(callback){
            return !(callback === CB);
        }
        this.observers = this.observers.filter(compareObserserverCB);
    }
    notifyObservers(payload){
        
        this.observers.forEach(invokeObserverCB);

        function invokeObserverCB(obs){
            try{obs(payload);}
            catch(err){console.log(err);}
        } 
    }
    
    isTripsEqual(trip1, trip2){
        const keys1 = Object.keys(trip1);
        const keys2 = Object.keys(trip2);
        if (keys1.length !== keys2.length) {
          return false;
        }
        for (let key of keys1) {
          if (trip1[key] !== trip2[key]) {
            return false;
          }
        }
        return true;
    }

    createTrip(trip){
        var origin = trip.originAddresses[0];
        var destination = trip.destinationAddresses[0];
        var distance = trip.rows[0].elements[0].distance.text;
        var duration = trip.rows[0].elements[0].duration.text;
        var footprint = trip.carbonEquivalent;
        var travelMode = trip.travelMode;
        return {
            id: uuidv4(), 
            origin: origin, 
            destination: destination, 
            distance: {text: distance, value: trip.rows[0].elements[0].distance.value}, 
            duration: duration, 
            footprint: footprint,
            travelMode: travelMode
            };
    }

    newTripId(trip){
        const newTrip = JSON.parse(JSON.stringify(trip));
        newTrip.id = uuidv4();
        return newTrip;
    }

    setTrips(tripArray){
        if(this.trips.find((trip) => {return trip.id === tripArray[0].id})){
            return;
        }
        this.trips = JSON.parse(JSON.stringify(tripArray));
        this.notifyObservers({setArray: this.trips});
    }
   
    addToHistory(trip){
        if(this.tripHistory.find((th) => {return th.id === trip.id})){
            return;
        }

        this.tripHistory = [...this.tripHistory, trip]
        this.notifyObservers({addTrip: trip});
    }

    removeFromHistory(trip){
        if(!this.tripHistory.find((th) => {return th.id === trip.id})){
            return;
        }
        
        this.tripHistory = this.tripHistory.filter(() => {return this.tripHistory.trip.id === trip.id});
        this.notifyObservers({removeTrip: trip});
    }

    setCurrentUser(user){
        if(user){
            if(user != this.currentUser){ 
                this.currentUser = user;
                this.notifyObservers({currentUser: this.currentUser});
            }
        }  
    }

    setEmail(email){
        if(email){
            if(email != this.email){ 
                this.email = email;
                this.notifyObservers({email: this.email});
            }
        }  
    }

    signOutUser(){
        this.notifyObservers({currentUser: null})
    }
}

export default TripModel;