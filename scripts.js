$(document).ready(function() {

  // get url with json
  // https://crossorigin.me/ is used to fix No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'null' is therefore not allowed access.
  var url = 'https://crossorigin.me/http://adminstaging.bpcloud.searchoptics.net/blueprintcms/sites/1472c6e0482f9d9fe1bf7b70cc6f8c78/data/datalayer.json';

  // Load JSON-encoded data from the server using a GET HTTP request.
  // http://api.jquery.com/jquery.getjson/
  $.getJSON( url, function( data ) {

    // get top level
    category = data.Category;  // data['Category'];
    product = data.Product;    // data['Product'];

    // list all categories in header navigation
    $.each(category, function(key, value) {
      $.each(value, function(key, value){
        if(key == 'category_name' ) {
          $('.navbar-nav').append('<li><a href="" title=' + value + '>' + value + '</a></li>');
        }
      });
    });

    // get link text in header navbar
    $('.navbar-brand, .nav li a').click(function(e) {
      e.preventDefault();
      var label = $(this).text();
      getProductByCategory(label);
    });

    // show all products by category
    function getProductByCategory(category) {
      $('.content').empty();
      $.each(product, function(key, value) {
        if (value.product_category === category || category === 'All' || category === 'Parse JSON') {
          $('.content').append('<h1><a href=' + value.product_id + '  class="product-detail" title=' + value.product_category + '> ' + value.product_name + '</a></h1>');
          $('.content').append('<p>'+ value.product_category + '</p>');
          $('.content').append('<p>'+ value.product_price + '</p>');
          $('.content').append('<p><small><a href=' + value.product_id + ' title=' + value.product_category + '>  Read more... </a></small</p>');
          $('.content').append('<hr>');
        }
      });
    }

    // run this for first time only
    getProductByCategory('All');

  });

    
});
