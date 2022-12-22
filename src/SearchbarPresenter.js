import { useEffect, useState } from "react"
import SearchbarView from "./views/SearchbarView";
import Title from "./views/titleView.js";
import { googleApi, getCarbonFootprint, getFlightRoute} from "./tripSource";
import { useRef } from "react";
import ResultView from "./views/ResultView";

const Searchbar = (props) => {
    const [startpoint, setStartpoint] = useState("");
    const [endpoint, setEndpoint] = useState("");
    const [,reRender] = useState();
    const [service, setService] = useState();
    const [trips, setTrips] = useState([]);

    const results = useRef(null);

    const scrollToRef = (elementToRef) => {
        window.scrollTo({
            top:elementToRef.current.offsetTop,
            behavior: "smooth",
        });
    }

    useEffect(() => {
        googleApi().then((google) => {
            setService(new google.maps.DistanceMatrixService());
        });
    }, []);

    useEffect(() => {
        if(!trips[0]){return;}
        const controller = new AbortController();
        getCarbonFootprint(trips, controller.signal).then((response) => {
            if (controller.signal.aborted){return;}
            let tripArray = [];
            response.forEach((trip) => {
                tripArray = [...tripArray, props.model.createTrip(trip)];
            });
            props.model.setTrips(tripArray);
            reRender({})
            scrollToRef(results);
        });
        return () => controller.abort();
    }, [trips]);
    
    function handleSearch(e){
        e.preventDefault();
        let tripArray = [];
        if(startpoint === "" || endpoint === ""){return;}
        var request = {
            origins: [startpoint],
            destinations: [endpoint],
            travelMode: "DRIVING"
        };
        
        service.getDistanceMatrix(request).then((response) => {
            response.travelMode = "Car";
            tripArray = [...tripArray, response];
            if(response.rows[0].elements[0].status === "ZERO_RESULTS"){
                return;
            }
            var motorBike = JSON.parse(JSON.stringify(response));
            motorBike.travelMode = "Motor Bike";
            tripArray = [...tripArray, motorBike];
            
        }).then(() => {
            
            request.travelMode = "TRANSIT";
            service.getDistanceMatrix(request).then((response) => {
                if(response.rows[0].elements[0].status === "ZERO_RESULTS"){
                    return;
                }
                response.travelMode = "Transit";
                tripArray = [...tripArray, response];
                
            }).then(() => {
                getFlightRoute(request).then((distance) => {
                    const trip = createFlightTrip(JSON.parse(JSON.stringify(tripArray[0])), distance);
                    tripArray = [...tripArray, trip];
                    if(trip.rows[0].elements[0].status === "ZERO_RESULTS"){
                        setTrips([trip]);
                        return;
                    }
                    
                    setTrips(tripArray);
                })
            });
        }); 
    }

    function createFlightTrip(trip, distance){
        if(trip.rows[0].elements[0].status === "ZERO_RESULTS"){
            trip.rows[0].elements[0] = {distance: {text: "", value: 0}, duration: {text: null}, status: "ZERO_RESULTS"}
        }
        trip.travelMode = "Flight";
        trip.rows[0].elements[0].distance.text = Math.round(distance / 1000) + " km";
        trip.rows[0].elements[0].distance.value = distance;
        trip.rows[0].elements[0].duration.text = null;
        return trip;
    }

    function renderTrips(){
        return props.model.trips.map((trip) => {
            return <div key={trip.id}>{JSON.stringify(trip)}</div>;
        });
    }
    function handleAddTrip(trip){
        props.model.addToHistory(trip);
        alert("Trip added!");

    }
    return (
        <>
 
        <Title />
        <SearchbarView 
            startpoint={startpoint} 
            onStartpointChange={(startpointText) => {setStartpoint(startpointText)}} 
            endpoint={endpoint} 
            onEndpointChange={(endpointText) => { setEndpoint(endpointText)}} 
            onSwap={(e) => {setStartpoint(endpoint); setEndpoint(startpoint)}}
            onSearch={(e) => {handleSearch(e)}}
        />
       
        {trips.length === 0 ?(<div></div>)
            :(
            <div ref={results}>
                <ResultView tripResults={props.model.trips}
                onAddTrip={(trip, e) => {handleAddTrip(trip)}}
                userState = {props.model.currentUser}
                />
            </div>
            )}
        </>
    );
}
export default Searchbar;