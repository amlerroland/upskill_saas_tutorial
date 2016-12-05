/* global $, Stripe */

//Document ready
$(document).on('turbolinks:load', function(){
  var $theForm = $('#pro-form'),
      $submitBtn = $('$form-signup-btn');
  
  //Set stripe public key
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
  //when user clicks submit button
  $submitBtn.click(function(event){
    //prevent default submission behavior
    event.prevent.Default();
    
    //collect the credit card fields
    var $cardNumber = $('#card_number').val(),
        $cvcNumber = $('#card_code').val(),
        $expMonth = $('#card_month').val(),
        $expYear = $('#card_year').val();
    
    //send the card info to stripe
    Stripe.createToken({
      number: $cardNumber,
      cvc: $cvcNumber,
      exp_month: $expMonth,
      exp_year: $expYear
    }, stripeResponseHandler);
  });
  
  
  //stripe will return a card token
  //inject card token as hidden field into form
  //submit form to our rails app.

});