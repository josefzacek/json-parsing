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
        if(key == 'category_name' ) {
          var extension = '.html';
          $('.navbar-nav').append('<li><a href=' + value.toLowerCase() + extension +' title=' + value + '>' + value + '</a></li>');
        }
      });
    });


    // show full product feed
    $.each(product, function(key, value) {
      $.each(value, function(key, value){
        $('.content-product-feed').append('<p>'+ key + ' : ' + value + '</p>');
      });
    });


    // show full feed
    $.each(data, function(key, value) {
      $('.content-full-feed').append('<p><b>'+ key + '</b></p>');
      $.each(value, function(key, value){
        if(value.category_name != null && value.category_description != null ) {
          $('.content-full-feed').append('<p>' + key + ' => ' + value.category_name  + ', ' + value.category_description + '</p>');
        }
        if(value.product_name != null && value.product_category != null && value.product_price != null ) {
          $('.content-full-feed').append('<p>' + key + ' => ' + value.product_name  + ', ' + value.product_category + ', ' + value.product_price + '</p>');
        }
      });
    });


    // product page show all products
    var i = 1;
    $.each(product, function(key, value) {
      $.each(value, function(key, value){
        $('.content-all-product-feed').append('<p><b>' + key.toUpperCase().replace(/\_/g, ' ') +'</b>: ' + value + '</p>');
        if(i % 4 === 0){
          $('.content-all-product-feed').append('<hr>');
        }
        i++;
      });
    });


    // show all vegetable products on vegetable page
    $.each(product, function(key, value) {
      $.each(value, function(key, value){
        $('.content-vegetable').append('<p>'+ value + '</p>');
      });
      $('.content-vegetable').append('<hr>');
    });

  });

    
});
