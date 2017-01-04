$(document).ready(function() {

  // get source with json
  var source = 'feed.json';

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
          $('.dynamic-navbar').append('<li><a href="" title=' + value + '>' + value + '</a></li>');
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
      $('.content-listing').append('<div class="alert alert-info"><strong>Total items:</strong> ' + product.length + '</div>');
      $.each(product, function(key, value) {
        if (value.product_category === category || category === 'All' || category === 'Parse JSON' || category === 'Products Listing') {
          $('.content-listing').append(
            '<div class="product">' + 
              '<h1><a href=' + value.product_id + ' class="product-detail" title="' + value.product_name + '"> ' + value.product_name + '</a></h1>' +
              '<p><b>Category:</b> ' + value.product_category + '</p>' +
              '<p><b>Short description:</b></p>' +
              '<p>'+ value.product_short_description + '</p>' +
              '<p><b>Price:</b> &euro;'+ value.product_price + '</p>' +
              '<p><small><a href=' + value.product_id + ' title="' + value.product_name + '" class="product-detail">  Read more... </a></small</p>' +
              '<hr>' + 
            '</div>'
          );
        }
      });
    }

    // display feed when clicked on 'Feed' link
    $('#feed').click(function(e) {
      e.preventDefault();
      $('.content').empty();
      $('.content').append( '<div class="col-md-12"><pre><code class="feed"></code></pre></div>');
      $(".feed").load("feed.json");
    });

    // get product detail id from link  
    $(".content").on("click", 'a.product-detail', function(e){
      e.preventDefault();
      var productHref = $(this).attr("href");
      showProductDetail(productHref);
    });

    // show product detail
    function showProductDetail(productHref){
      $('.content').empty();
      $('.content').append( '<div class="col-md-6 content-product-detail-text"></div>');
      $('.content').append( '<div class="col-md-6 content-product-detail-image"></div>');
      $.each(product, function(key, value) {
        if (value.product_id === productHref) {
          $('.content-product-detail-text').append('<h1>' + value.product_name + '</h1>');
          $('.content-product-detail-text').append('<p><b>Category:</b> '+ value.product_category + '</p>');
          $('.content-product-detail-text').append('<p><b>Long description:</b></p>');
          $('.content-product-detail-text').append('<p>'+ value.product_long_description + '</p>');
          $('.content-product-detail-text').append('<p><b>Price:</b> &euro;'+ value.product_price + '</p>');
          if (value.product_image.length) {
            $('.content-product-detail-image').append('<img src="images/' + value.product_image + '" class="img-responsive center-block img-thumbnail" >');
          } else {
            $('.content-product-detail-image').append('<img src="images/image-not-available.jpg" class="img-responsive center-block img-thumbnail" >');
          }
          $('.content-product-detail-text').append('<p><b><a href="mailto:info@josefzacek.com?subject=Parse JSON - ' + value.product_name + ' (ID:'+ value.product_id + ') product">Contact us about this product</a></b></p>');  
          $('.content-product-detail-text').append('<p><a href="" title="Products Listing" class="products-listing">Products Listing</a></p>');
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
  
  
  $(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
      console.log('bottom');
    }
});

    
});
