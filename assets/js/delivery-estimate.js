var botNameEl = document.getElementById('botName')
var botPriceEl = document.getElementById('botPrice')
var botCostEl = document.getElementById('totalCost')
var loadingEl = document.getElementById('loading')

var params = new URLSearchParams(window.location.search)
var botName = params.get('botName')
var botPrice = parseInt(params.get('botPrice'))



var shippingFee = 0.5

var factoryCoordinates = {
    lat: 42.358990,
    lon: -71.058632
}

function getDistanceFromFactory(position){
    var userLat = console.log(position.coords.latitude)
    var userLon = console.log(position.coords.longitude)

    fetch('https://api.distancematrix.ai/maps/api/distancematrix/json?origins=' + factoryCoordinates.lat+ ',' +factoryCoordinates.lon + '&destinations=' +userLat + ',' + userLon + '&key=FfjlQNSycwguu8hTigfcqloxlIRYU')
    .then(function(response){
        return response.json()
    })
    .then(function(distanceData){
       var distance = console.log(distanceData.rows[0].elements[0].distance.value)
       var total = calculateShipping(distance)
       displayTotals(total)
    })
    .catch(function(error){
        console.log('error')
    })
    .finally(function(){
        loadingEl.classList.remove('d-flex')
        loadingEl.classList.add('d-none')
    })

}

function calculateShipping(distance){
   return (distance * shippingFee) + botPrice
}

function displayTotals(total){
    botNameEl.innerText = botName
    botPriceEl.innerText = 'Base Price: $' + botPrice
    botCostEl.innerText = 'Total Cost: $' + total
}

if (navigator.geolocation){

    function success(position){
        getDistanceFromFactory(position)
    }

    navigator.geolocation.getCurrentPosition(success, function(){console.log('Error with geolocation')})
}else{
    console.log('Geolocation API is not supported.')
}