$(document).ready(function() {
  //from the handlebars documentation 
  var source   = $("#hotel-template").html();
  var template = Handlebars.compile(source);
  var hotel_data_array = [];


var basicURLwithId = "http://afs.expedia.com/affinity/api/v1/get/hotels?format=jsonp&offset=0&maxResults=10&userId=ama";

var hotel_info_function = function(json_data) {
  var hotel_id_array = [];
   var hotel_star_array = [];
   var hotel_guest_array = [];
   var hotel_thumb_array = [];
   var hotel_name_array = [];
   var hotel_address_array = [];
   var hotel_city_array = [];
   var hotel_zip_array = [];
   var hotel_fulladdress_array = [];
   var hotel_longit_array = [];
   var hotel_latit_array = [];
  

  hotel_data_array = [];

  // this is to grab the hotel id to feed into the URL for the results page
  for(i=0; i<json_data.searchResults.searchResult.length; i++) {
    var searchResult_array = json_data.searchResults.searchResult[i];
    // console.log(search_Result_array);

      for (j=0; j<searchResult_array.results.result.length; j++) {
        var result_array = searchResult_array.results.result[j];
        // console.log(result_array.item.itemId.id);
        var result_item = result_array.item;
        hotel_star_array.push(result_item.starRating);
        hotel_guest_array.push(result_item.guestRating);
        hotel_thumb_array.push(result_item.thumbnailLink);
        hotel_id_array.push(result_item.itemId.id);
         
        //Address and name of hotel 
        hotel_name_array.push(result_item.geoName);

        var result_addr = result_item.location.address;
        // hotel_address_array.push(result_add.streetAddress);
        // hotel_city_array.push(result_add.city)
        // hotel_zip_array.push(result_add.postalCode)
        
        hotel_fulladdress_array.push(result_addr.streetAddress + " "+ result_addr.city +" "+ result_addr.postalCode);

        hotel_longit_array.push(result_item.location.point.longitude);
        hotel_latit_array.push(result_item.location.point.latitude);
        // console.log(hotel_star_array);
        // console.log(hotel_guest_array);
        // console.log(hotel_thumb_array);

         for (k=0; k<hotel_id_array.length; k++){
          var hotel_id = hotel_id_array[k];
          // console.log(hotel_id);
          var hotel_url = "http://www.expedia.com/h"+hotel_id+".Hotel-Information";
          // console.log(hotel_url);
          }

         for (l=0; l<hotel_star_array.length; l++){
            var hotel_star = hotel_star_array[l];
            }
          
          for (m=0; m<hotel_guest_array.length; m++){
            var hotel_guest = hotel_guest_array[m];
            }

          for (n=0; n<hotel_thumb_array.length; n++){
            var hotel_thumb = hotel_thumb_array[n];
            }

          for (o=0; o<hotel_name_array.length; o++){
            var hotel_name = hotel_name_array[o];
          }
            
          for (p=0; p<hotel_fulladdress_array.length; p++){
            var hotel_full_address = hotel_fulladdress_array[p];
          }

          for (q=0; q<hotel_longit_array.length; q++){
            var  hotel_longit  =  hotel_longit_array[q];
          }

           for (r=0; r<hotel_latit_array.length; r++){
            var  hotel_latit  =  hotel_latit_array[r];
          }

          // console.log(hotel_latit);
        //we create an object of the properties that we want from the entire json object, returned from search 
         var hotel_info = {
            name: hotel_name,
            address: hotel_full_address,
            star: hotel_star,
            guest: hotel_guest,
            url: hotel_url,
            thumb: hotel_thumb,
            longitude: hotel_longit,
            latitude: hotel_latit
          };

          // Mapbox related function to push long and lat 
          var marker = L.mapbox.featureLayer({
                type: 'Feature',
                geometry: {
                  type: 'Point',
                  coordinates: [hotel_info.longitude, hotel_info.latitude]
                },
                properties: {
                  title: hotel_info.name,
                  description: hotel_info.address,
                  'marker-symbol': "monument",
                  'marker-color': '#4B0082'
                }
              }).addTo(map);

          // console.log(marker);
          //we push the objects into an array so that handlebar can loop through it using "each"
          hotel_data_array.push(hotel_info);
          
        }
    } 
    // we pass into the array of hotel_info objects and pass it into the template created by handlebars
         var template_html = template({hotel_data: hotel_data_array});
          $("#hotel_data").html(template_html);

};

// //////////////////////////////////////////////////////////////////////
//When user enters address for searching
// used documentation from: http://api.jquery.com/jquery.get/
var address; 
$("#address").on("click", function (event){
      event.preventDefault();
      address = $("#address_input").val().trim().split(' ').join('+');
      // console.log(address);
      var url = basicURLwithId + "&address=" + address;
      console.log(url);

    $.ajax({
        type: "GET",
        dataType: 'jsonp',
        url: url,
        crossDomain : true,
        xhrFields: {
            withCredentials: true
        }
    })
      .done(function(json_data) {
        // console.log(json_data);

        hotel_info_function(json_data);

        console.log( "success" );
        // console.log(json_data);
      })
      .fail(function() {
        console.log( "error" );
      })
      .always(function() {
        console.log( "finished" );
      });
      // console.log(json_data);
});

// //////////////////////////////////////////////////////////////////////

// When user enters zip code for searching 
var zip; 
    $("#zip").on("click", function (event){
      event.preventDefault();
    
      zip = $("#zip_input").val().trim();
      var url = basicURLwithId + "&address=" + zip;
      console.log(url);

       $.ajax({
        type: "GET",
        dataType: 'jsonp',
        url: url,
        crossDomain : true,
        xhrFields: {
            withCredentials: true
        }
      })

      .done(function(json_data) {
        
        // console.log(hotel_info_function(json_data));
        console.log( "success" );
        // console.log(json_data);

        hotel_info_function(json_data);
      })

      .fail(function() {
        console.log( "error" );
      })

      .always(function() {
        console.log( "finished" );
      });

      // console.log(json_data);

      });



});