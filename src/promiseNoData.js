function promiseNoData(promiseState){

    if(promiseState.promise){
        if(promiseState.data){
            return false
        }
        else{
            if(promiseState.error){
                return <div>{promiseState.error.toString()}</div>
            }
            else{
                return <img src="https://i.gifer.com/origin/b4/b4d657e7ef262b88eb5f7ac021edda87.gif" width="20" height="20"/>
            }
        }
    }
    else{
        return <div>No data</div>
    }


}

export default promiseNoData;