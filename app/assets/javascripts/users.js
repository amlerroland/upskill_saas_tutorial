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
    $submitBtn.val("Processing").prop('disabled', true);
    
    //collect the credit card fields
    var $cardNumber = $('#card_number').val(),
        $cvcNumber = $('#card_code').val(),
        $expMonth = $('#card_month').val(),
        $expYear = $('#card_year').val();
        
    //use stripe js library to check for card error
    var error = false;
    
    //validate card number
    if(!Stripe.card.validateCardNumber($cardNumber)) {
      error = true;
      alert('The credit card number appers to be invalid.');
    }
    //validate cvc number
    if(!Stripe.card.validateCVC($cvcNumber)) {
      error = true;
      alert('The CVC number appers to be invalid.');
    }
    //validate expiration number
    if(!Stripe.card.validateExpiry($expMonth, $expYear)) {
      error = true;
      alert('The expiration date appers to be invalid.');
    }
    
    if (error) {
      //if there are card errors, dont send to stripe
      $submitBtn.prop('disabled', false).val('Sign up');
    } else {
      //send the card info to stripe
      Stripe.createToken({
        number: $cardNumber,
        cvc: $cvcNumber,
        exp_month: $expMonth,
        exp_year: $expYear
      }, stripeResponseHandler);
    }
    return false;
  });

  //stripe will return a card token
  function stripeResponseHandler(status, response){
    // get the token from the response
    var token = response.id;
    
    //inject card token as hidden field into form
    $theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
  }
  
  //submit form to our rails app.
  $theForm.get(0).submit();
  
});