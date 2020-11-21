const express = require('express')
const axios = require('axios')
const app = express()
const port = 3000

app.get('/api/v1/clusters', (req, res) => {
    axios({
        method: 'get',
        url: 'https://www.nea.gov.sg/api/OneMap/GetMapData/DENGUE_CLUSTER',
        })
        .then(result => {
            // clean up api by converting to a Json obj and then into an array from api
            let clustersApi = (JSON.parse(result.data)).SrchResults.slice(1)
            // initialise full coords array
            let fullCoords = []
            // loop through all the clusters api
            clustersApi.forEach(item => {
                // init array for each hot spot
                let oneSpotCoords = []
                // loop through each hot spot to and split the latlng by "|"
                item.LatLng.split("|").forEach (item => {
                    let coordsArr = item.split(",")
                    let obj = {
                        "lat" : coordsArr[0],
                        "lng" : coordsArr[1]
                    }
                    // push into each spot
                    oneSpotCoords.push(obj)
                })
                // push into full coords
                fullCoords.push(oneSpotCoords)
            })
            res.send(fullCoords)
        });
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
