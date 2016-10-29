$(document).ready(function() {

  // get url with json
  // https://crossorigin.me/ is used to fix No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
  var url = 'https://crossorigin.me/http://adminstaging.bpcloud.searchoptics.net/blueprintcms/sites/1472c6e0482f9d9fe1bf7b70cc6f8c78/data/datalayer.json';

  // Load JSON-encoded data from the server using a GET HTTP request.
  // http://api.jquery.com/jquery.getjson/
  $.getJSON( url, function( data ) {

    // get top level
    category = data.Category;  // data['Category'];
    product = data.Product;    // date['Product'];


    // show top level
    $.each(data, function(key, value){
      $('.content-top-level').append('<p>'+ key + '</p>');
    });


    // show full category
    $.each(category, function(key, value) {
      $.each(value, function(key, value){
        $('.content-category-feed').append('<p>'+ key + ' : ' + value + '</p>');
      });
    });
  });

    
});
