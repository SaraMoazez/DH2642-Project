//large portions of this file are (in terms of visuals) adapted from a tailwind component: https://tailwindui.com/components/application-ui/data-display/description-lists
function ProfileView(props){
    
    //Function to map travel history
    function getTravelHistoryCB(trip){
        return(<div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6" key={trip.id}>
            <dt class="text-sm font-medium text-gray-500">{trip.origin} to {trip.destination}</dt>
            <dd class="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">{trip.distance.text} with {trip.travelMode.toLowerCase()}; footprint: {trip.footprint.toFixed(2)} kg</dd>
        </div>);
    }
    
    return(<div class="overflow-hidden bg-white shadow sm:rounded-lg">
      <div class="px-4 py-5 sm:px-6">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Profile of {props.email}</h3>
        <p class="mt-1 max-w-2xl text-sm text-gray-500">Total carbon footprint: {props.totFootprint} kg</p>
      </div>
      <div class="border-t border-gray-200">
        <h3 class="text-lg font-medium leading-6 text-gray-900">Travel history</h3>
        <dl>
            {props.trips.map((trip) => getTravelHistoryCB(trip))}
        </dl>
      </div>
    </div>);
}

export default ProfileView;