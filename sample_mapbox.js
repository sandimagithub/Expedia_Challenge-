$(document).ready(function() {
  var latLong = [];
  $('#form').on('submit',  function(e) {
    e.preventDefault();
    var album = $('#searchTerm').val();
    var results = getResult(album);

    function getResult(search){
      $.ajax({
        type: 'GET',
        url: 'https://api.spotify.com/v1/' + 'search?q=name&type=album,track',
        dataType: "json",
      }).done(function(data) {
        //console.log(data);
        for (i = 0; i < data.albums.items.length; i ++){
          var album = data.albums.items[i];
          console.log(album);
          for (j=0; j < album.available_markets.length; j++){
            var market = album.available_markets[j];
            var coord = getLatLong(market);
            if (coord) {
              var marker = L.mapbox.featureLayer({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [coord.lng, coord.lat]
                },
                properties: {
                  title: album.name,
                  'marker-color': '#f86767'
                }
              }).addTo(map);
              // marker.eachLayer(function(m) {
              //   m.openPopup();
              // });
            }
          }
        }
      });
    }

    var getLatLong = function(market){
      for (var i = 0; i < countries.length; i++){
        var iso2Code = countries[i].iso2Code;
        var latitude = countries[i].latitude;
        var longitude = countries[i].longitude;
        if (iso2Code == market){
          return {lng: longitude, lat: latitude};
        }
      }
      console.log("This is not a valid market", market);
    };
  });
});




  //Mapbox related function to push long and lat 
          // var marker = L.mapbox.featureLayer({
          //       type: 'Feature',
          //       geometry: {
          //         type: 'Point',
          //         coordinates: hotel_info.long_lat
          //       },
          //       properties: {
          //         title: hotel_info.name,
          //         description: hotel_info.address,
          //         'marker-symbol': "monument",
          //         'marker-color': '#4B0082'
          //       }
          //     }).addTo(map);