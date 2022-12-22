const SearchbarView = ({ startpoint, onStartpointChange, endpoint, onEndpointChange, onSwap, onSearch}) => {
    
    return (
        <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <form className="m-4 flex" onSubmit={(e) => {onSearch(e)}}>
            <label htmlFor="startpoint" className="sr-only">startpoint</label>
            <input id="startpoint" value={startpoint} onChange={(e) => {onStartpointChange(e.target.value)}}type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white focus:border-green-500 focus:ring-green-500 focus:outline-none" placeholder="From"/>
            <button type="button" tabIndex = "-1" onClick={(e) => {onSwap(e)} } className=" hover:shadow px-150 bg-[#21b04c] text-white font-bold p-4 uppercase border-[#25c154] border-t border-b border-r"><div className="md:scale-100"><img className="object-scale-down h-6 w10" src="swap.png" /></div></button>
            <label htmlFor="endpoint" className="sr-only">endpoint</label>
            <input id="endpoint" value={endpoint} onChange={(e) => {onEndpointChange(e.target.value)}} type="text" className="rounded-l-lg p-4 border-t mr-0 border-b border-l text-gray-800 border-gray-200 bg-white focus:border-green-500 focus:ring-green-500 focus:outline-none" placeholder="To"/>
            <button type="submit" className=" hover:shadow px-8 rounded-r-lg bg-[#21b04c] text-white font-bold p-4 uppercase border-[#25c154] border-t border-b border-r"><div className="md:scale-100"><img className="object-scale-down h-6 w10" src="search.png" /></div></button>
          </form>
    </div>
    );
}
export default SearchbarView;