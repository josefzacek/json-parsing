$(document).ready(function() {

  // get source with json
  var source = 'feed.json';

  // get root url
  var url = window.location.pathname;

  // Load JSON-encoded data from the server using a GET HTTP request.
  // http://api.jquery.com/jquery.getjson/
  $.getJSON( source, function( data ) {

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
      $('.content').append( '<div class="col-md-12 content-listing"></div>');
      $.each(product, function(key, value) {
        if (value.product_category === category || category === 'All' || category === 'Parse JSON' || category === 'Products Listing') {
          $('.content-listing').append('<h1><a href=' + value.product_id + ' class="product-detail" title="' + value.product_name + '"> ' + value.product_name + '</a></h1>');
          $('.content-listing').append('<p><b>Category:</b> ' + value.product_category + '</p>');
          $('.content-listing').append('<p><b>Short description:</b></p>');
          $('.content-listing').append('<p>'+ value.product_short_description + '</p>');
          $('.content-listing').append('<p><b>Price:</b> '+ value.product_price + '</p>');
          $('.content-listing').append('<p><small><a href=' + value.product_id + ' title="' + value.product_name + '" class="product-detail">  Read more... </a></small</p>');
          $('.content-listing').append('<hr>');
        }
      });
    }

    // get product detail id from link  
    $(".content").on("click", 'a.product-detail', function(e){
      e.preventDefault();
      var productHref = $(this).attr("href");
      showProductDetail(productHref);
    });

    // show product detail
    function showProductDetail(productHref){
      $('.content').empty();
      $.each(product, function(key, value) {
        if (value.product_id === productHref) {
          $('.content').append('<h1>' + value.product_name + '</h1>');
          $('.content').append('<p><b>Category:</b> '+ value.product_category + '</p>');
          $('.content').append('<p><b>Long description:</b></p>');
          $('.content').append('<p>'+ value.product_long_description + '</p>');
          $('.content').append('<p><b>Price:</b> '+ value.product_price + '</p>');
          if (value.product_image.length) {
            $('.content').append('<div><img src="' + url + '/images/' + value.product_image + '" class="img-responsive" ></div>');
          } else {
            $('.content').append('<div><img src="' + url + '/images/image-not-available.jpg" class="img-responsive" ></div>');
          }          
          $('.content').append('<p><a href="" title="Products Listing" class="products-listing">Products Listing</a></p>');
        }
      });
    }

    // link to on show product page to return to products listings
    $(".content").on("click", 'a.products-listing', function(e){
      e.preventDefault();
      var label = $(this).text();
      getProductByCategory(label);
    });

    // run this for first time only
    getProductByCategory('All');

  });

    
});
