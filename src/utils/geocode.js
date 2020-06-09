const request = require('request')

const geoCode =(address,callback)=>{
    const url='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?proximity=-74.70850,40.78375&access_token=pk.eyJ1IjoiZ2VlazE1OTkiLCJhIjoiY2thdXVuMGE3MTR3NjM0cWR4aW04MnFmbyJ9.RrjjCF0x6K82-IDbnYZlew&limit=1'
    request({ url, json:true },(error, { body })=>{
        if(error){
            callback('Not able access the Location services at the moment.',undefined)
        } else if (body.features.length === 0 ){
            callback('Unable to find the Location , Try Another Location.',undefined)
        }else{
            callback(undefined,{
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
        }
    })

}

module.exports = geoCode