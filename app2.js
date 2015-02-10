$(document).ready(function() {
  

//114 Sansome Street San Francisco CA

var basicURLwithId = "http://afs.expedia.com/affinity/api/v1/get/hotels?format=jsonp&offset=0&maxResults=10&userId=ama";

//When user enters address for searching
// used documentation from: http://api.jquery.com/jquery.get/


//Need an if/else statement here b/c we want the same ajax "GET" for address or zip code search request. 


var address; 
var zip; 
  if ($("#address").on("click", function (event)) {
      event.preventDefault();
      address = $("#address_input").val().trim().split(' ').join('+');
      // console.log(address);
      var url = basicURLwithId + "&address=" + address; 
  } else {
   
    $("#zip").on("click", function (event){
      event.preventDefault();
      zip = $("#zip_input").val().trim();
      // console.log(address);
      var url = basicURLwithId + "&address=" + zip;

      }
  }

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
        
        hotel_id_array = [];
        hotel_star_array = [];
        hotel_guest_array = [];
        hotel_thumb_array = [];
        // hotel_url_array = [];

        // this is to grab the hotel id to feed into the URL for the results page
        for(i=0; i<json_data.searchResults.searchResult.length; i++) {
          var searchResult_array = json_data.searchResults.searchResult[i];
          // console.log(search_Result_array);

            for (j=0; j<searchResult_array.results.result.length; j++) {
              var result_array = searchResult_array.results.result[j];
              // console.log(result_array.item.itemId.id);
              hotel_star_array.push(result_array.item.starRating);
              hotel_guest_array.push(result_array.item.guestRating);
              hotel_thumb_array.push(result_array.item.thumbnailLink);
              hotel_id_array.push(result_array.item.itemId.id);
               
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

               var hotel_info = {
                  star: hotel_star,
                  guest: hotel_guest,
                  url: hotel_url,
                  thumb: hotel_thumb
                };
                console.log(hotel_info);
                
            }
          } 


        alert( "success" );
        return hotel_info;

        // $(document).on("click", "#zip", function()
        // {    
        // var source = $("#hotel-template").html();
        // var template = Handlebars.compile(source);
        // var html = template({hotelData: json_data});
        // $("#hotel_data_container").html(html);
        // }
      })

      .fail(function() {
        alert( "error" );
      })

      .always(function() {
        alert( "finished" );
      });

      // console.log(json_data);

      });




}



// $("#address").on("click", function (event){
//       event.preventDefault();
//       address = $("#address_input").val().trim().split(' ').join('+');
//       // console.log(address);
//       var url = basicURLwithId + "&address=" + address;
//       console.log(url);

//     $.ajax({
//         type: "GET",
//         dataType: 'jsonp',
//         url: url,
//         crossDomain : true,
//         xhrFields: {
//             withCredentials: true
//         }
//     })
//       .done(function(json_data) {
//         console.log(json_data);
//         alert( "success" );
//         console.log(json_data);
//       })
//       .fail(function() {
//         alert( "error" );
//       })
//       .always(function() {
//         alert( "finished" );
//       });
//       console.log(json_data);
// });


// When user enters zip code for searching 
// var zip; 
//     $("#zip").on("click", function (event){
//       event.preventDefault();
//       zip = $("#zip_input").val().trim();
//       // console.log(address);
//       var url = basicURLwithId + "&address=" + zip;
//       console.log(url);

//        $.ajax({
//         type: "GET",
//         dataType: 'jsonp',
//         url: url,
//         crossDomain : true,
//         xhrFields: {
//             withCredentials: true
//         }
//       })

//       .done(function(json_data) {
        
//         hotel_id_array = [];
//         hotel_star_array = [];
//         hotel_guest_array = [];
//         hotel_thumb_array = [];
        // hotel_url_array = [];

        // this is to grab the hotel id to feed into the URL for the results page
        // for(i=0; i<json_data.searchResults.searchResult.length; i++) {
        //   var searchResult_array = json_data.searchResults.searchResult[i];
          // console.log(search_Result_array);

            // for (j=0; j<searchResult_array.results.result.length; j++) {
            //   var result_array = searchResult_array.results.result[j];
            //   // console.log(result_array.item.itemId.id);
            //   hotel_star_array.push(result_array.item.starRating);
            //   hotel_guest_array.push(result_array.item.guestRating);
            //   hotel_thumb_array.push(result_array.item.thumbnailLink);
            //   hotel_id_array.push(result_array.item.itemId.id);
               
              // console.log(hotel_star_array);
              // console.log(hotel_guest_array);
              // console.log(hotel_thumb_array);

      //          for (k=0; k<hotel_id_array.length; k++){
      //           var hotel_id = hotel_id_array[k];
      //           // console.log(hotel_id);
      //           var hotel_url = "http://www.expedia.com/h"+hotel_id+".Hotel-Information";
      //           // console.log(hotel_url);
      //           }

      //          for (l=0; l<hotel_star_array.length; l++){
      //             var hotel_star = hotel_star_array[l];
      //             }
                
      //           for (m=0; m<hotel_guest_array.length; m++){
      //             var hotel_guest = hotel_guest_array[m];
      //             }

      //           for (n=0; n<hotel_thumb_array.length; n++){
      //             var hotel_thumb = hotel_thumb_array[n];
      //             }

      //          var hotel_info = {
      //             star: hotel_star,
      //             guest: hotel_guest,
      //             url: hotel_url,
      //             thumb: hotel_thumb
      //           };
      //           console.log(hotel_info);
                
      //       }
      //     } 


      //   alert( "success" );
      //   return hotel_info;

      //   // $(document).on("click", "#zip", function()
      //   // {    
      //   // var source = $("#hotel-template").html();
      //   // var template = Handlebars.compile(source);
      //   // var html = template({hotelData: json_data});
      //   // $("#hotel_data_container").html(html);
      //   // }
      // })

      // .fail(function() {
      //   alert( "error" );
      // })

      // .always(function() {
      //   alert( "finished" );
      // });

      // // console.log(json_data);

      // });



});