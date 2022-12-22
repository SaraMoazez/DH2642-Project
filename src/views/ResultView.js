const ResultView = ({tripResults, onAddTrip, userState}) =>{
    return (
        <div>
            <section className="bg-white ">
                <div className="container px-6 py-8 mx-auto ">
                    <div className=" grid  gap-6 mt-16 -mx-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  ">
                        {tripResults.map((trip) => {return <div key={trip.id}className="px-11 py-20 transition-colors duration-200 transform rounded-lg bg-gray-100  shadow-lg border-transparent border-2 hover:bg-gray-200 hover:border-[#afecc2]">
                            <p className="text-xl font-medium text-gray-800  text-center">{trip.travelMode}</p>   
                            <div className="mt-20 space-y-14">
                                <div className="flex items-center ">
                                    <span className="mx-4 text-gray-700  "><img className="object-scale-down h-6 w10 float-left mr-2" src="fast-time.png" />  Travel time: {trip.duration === null ? ("N/A"):(trip.duration)}</span>
                                 </div>
                                <div className="flex items-center">
                                    <span className="mx-4 text-gray-700 "><img className="object-scale-down h-6 w10 float-left mr-2" src="distance.png" />Distance: {trip.distance.text} km</span>
                                </div>
                                <div className="flex items-center">
                                    <span className="mx-4 text-gray-700 "><img className="object-scale-down h-6 w10 float-left mr-2" src="paws.png" />Footprint: {(trip.footprint).toFixed(2) + " CO₂e kg"}</span>
                                </div>
                            </div>
                            {userState === null ?(
                                <div className="flex items-center">
                                    <span className="mx-4 mt-20 text-gray-700 "> Sign up or log in to save this trip!</span>
                                </div>)
                                :(
                                    <button onClick={(e) => {onAddTrip(trip);e.currentTarget.disabled=true;}} className="w-full px-3 py-2 mt-24 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-green-500 rounded-md hover:bg-[#28A04B] focus:outline-none focus:ring-green-500">
                                    Add trip
                                    </button>
                                )}
                            
                        </div>})}
                    </div>
                </div>
            </section>
        </div>
        );
}

export default ResultView;