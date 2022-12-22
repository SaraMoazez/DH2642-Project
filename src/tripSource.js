import { GOOGLE_API_KEY, CARBONFOOTPRINT_API_KEY } from "./apiConfig";
import axios from "axios";
import { Loader } from "@googlemaps/js-api-loader";


//Just enter the distance from the google api as param
//Should return json, need testing
function getCarbonFootprintFromCarTravel(trip, signal){
    const dist = trip.rows[0].elements[0].distance.value / 1000;
    
    const options = {
    method: 'GET',
    url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromCarTravel',
    params: {vehicle: 'MediumPetrolCar', distance: dist},
    signal: signal,
    headers: {
        'X-RapidAPI-Key': CARBONFOOTPRINT_API_KEY,
        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
    }
    };
    return axios.request(options).then(function (response) {
        trip.carbonEquivalent = response.data.carbonEquivalent;
        return trip;
    }).catch(function (error) {
        if (signal.aborted){
            console.log('Fetch aborted')
        }
        else {
            console.error(error);
        }
    });
}

function getCarbonFootprintFromMotorBike(trip, signal){
    const dist = trip.rows[0].elements[0].distance.value / 1000;

    const options = {
    method: 'GET',
    url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromMotorBike',
    params: {distance: dist, type: 'MediumMotorBike'},
    signal: signal,
    headers: {
        'X-RapidAPI-Key': CARBONFOOTPRINT_API_KEY,
        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
    }
    };

    return axios.request(options).then(function (response) {
        trip.carbonEquivalent = response.data.carbonEquivalent;
        return trip;
    }).catch(function (error) {
        if (signal.aborted){
            console.log('Fetch aborted')
        }
        else {
            console.error(error);
        }
    });
}
//Might need a function to figure out what type of flight to get
function getCarbonFootprintFromFlight(trip, signal){
    const dist = trip.rows[0].elements[0].distance.value / 1000;

    const options = {
      method: 'GET',
      url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromFlight',
      params: {type: 'DomesticFlight', distance: dist},
      signal: signal,
      headers: {
        'X-RapidAPI-Key': CARBONFOOTPRINT_API_KEY,
        'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
      }
    };
    
    return axios.request(options).then(function (response) {
        trip.carbonEquivalent = response.data.carbonEquivalent;
        return trip;
    }).catch(function (error) {
        if (signal.aborted){
            console.log('Fetch aborted')
        }
        else {
            console.error(error);
        }
    }); 
}
//Same as above, might need to determine what type of trasit is possible for the trip 
function getCarbonFootprintFromPublicTransit(trip, signal){
    const dist = trip.rows[0].elements[0].distance.value / 1000;

    const options = {
        method: 'GET',
        url: 'https://carbonfootprint1.p.rapidapi.com/CarbonFootprintFromPublicTransit',
        params: {type: 'NationalTrain', distance: dist},
        signal: signal,
        headers: {
          'X-RapidAPI-Key': CARBONFOOTPRINT_API_KEY,
          'X-RapidAPI-Host': 'carbonfootprint1.p.rapidapi.com'
        }
      };
      
      return axios.request(options).then(function (response) {
        trip.carbonEquivalent = response.data.carbonEquivalent;
        return trip;
      }).catch(function (error) {
            if (signal.aborted){
                console.log('Fetch aborted')
            }
            else {
                console.error(error);
            }
      });
}

export function getCarbonFootprint(trips, signal){
    
    const tripPromiseArray = trips.map((trip) => {
        if(trip.travelMode === "Car"){
            return getCarbonFootprintFromCarTravel(trip, signal)
        }
        if(trip.travelMode === "Motor Bike"){
            return getCarbonFootprintFromMotorBike(trip, signal);
        }
        if(trip.travelMode === "Transit"){
            return getCarbonFootprintFromPublicTransit(trip, signal);
        }
        if(trip.travelMode === "Flight"){
            return getCarbonFootprintFromFlight(trip, signal);
        }
    });
    
    return Promise.all(tripPromiseArray).then((response) => {return response;});
}
//params should include atleast orgins and destinations as propities of the params object. can also include mode: transit

export function googleApi(){
    const loader = new Loader({
        apiKey: GOOGLE_API_KEY,
        version: "weekly",
        language: "en",
        libraries: ['geometry']
      });
    return loader.load();
}

export function getFlightRoute(request){
    const loader = new Loader({
        apiKey: GOOGLE_API_KEY,
        version: "weekly",
        language: "en",
        libraries: ['geometry']
    });
        
    return loader.load().then((google) => {

        const geocoder = new google.maps.Geocoder();
        let distance;

        return Promise.all([
            geocoder.geocode({'address' : request.origins[0]})
            .then((response) => {return response.results[0].geometry.location}),
            geocoder.geocode({'address' : request.destinations[0]})
            .then((response) => { return response.results[0].geometry.location})
        ]).then((cordinates) => {
            const [p1, p2] = cordinates;
            distance = google.maps.geometry.spherical.computeDistanceBetween(p1, p2);
            return distance;
        });
    });
}




export {getCarbonFootprintFromCarTravel, getCarbonFootprintFromMotorBike, getCarbonFootprintFromPublicTransit, getCarbonFootprintFromFlight, };