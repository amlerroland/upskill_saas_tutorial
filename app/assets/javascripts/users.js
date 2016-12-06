//MY CODE
// /* global $, Stripe */

// //Document ready
// $(document).on('turbolinks:load', function(){
//   var $theForm = $('#pro-form'),
//       $submitBtn = $('$form-signup-btn');
  
//   //Set stripe public key
//   Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
  
//   //when user clicks submit button
//   $submitBtn.click(function(event){
//     //prevent default submission behavior
//     event.prevent.Default();
//     $submitBtn.val("Processing").prop('disabled', true);
    
//     //collect the credit card fields
//     var $cardNumber = $('#card_number').val(),
//         $cvcNumber = $('#card_code').val(),
//         $expMonth = $('#card_month').val(),
//         $expYear = $('#card_year').val();
        
//     //use stripe js library to check for card error
//     var error = false;
    
//     //validate card number
//     if(!Stripe.card.validateCardNumber($cardNumber)) {
//       error = true;
//       alert('The credit card number appers to be invalid.');
//     }
//     //validate cvc number
//     if(!Stripe.card.validateCVC($cvcNumber)) {
//       error = true;
//       alert('The CVC number appers to be invalid.');
//     }
//     //validate expiration number
//     if(!Stripe.card.validateExpiry($expMonth, $expYear)) {
//       error = true;
//       alert('The expiration date appers to be invalid.');
//     }
    
//     if (error) {
//       //if there are card errors, dont send to stripe
//       $submitBtn.prop('disabled', false).val('Sign up');
//     } else {
//       //send the card info to stripe
//       Stripe.createToken({
//         number: $cardNumber,
//         cvc: $cvcNumber,
//         exp_month: $expMonth,
//         exp_year: $expYear
//       }, stripeResponseHandler);
//     }
//     return false;
//   });

//   //stripe will return a card token
//   function stripeResponseHandler(status, response){
//     // get the token from the response
//     var token = response.id;
    
//     //inject card token as hidden field into form
//     $theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
//     //submit form to our rails app.
//   $theForm.get(0).submit();
//   }
  
// });

//TUTORIAL CODE
/* global $, Stripe */
//Document ready.
$(document).on('turbolinks:load', function(){
  var theForm = $('#pro_form');
  var submitBtn = $('#form-submit-btn');
  //Set Stripe public key.
  Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content') );
  //When user clicks form submit btn,
  submitBtn.click(function(event){
    //prevent default submission behavior.
    event.preventDefault();
    submitBtn.val("Processing").prop('disabled', true);
    //Collect the credit card fields.
    var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(),
        expMonth = $('#card_month').val(),
        expYear = $('#card_year').val();
    //Use Stripe JS library to check for card errors.
    var error = false;
    //Validate card number.
    if(!Stripe.card.validateCardNumber(ccNum)) {
      error = true;
      alert('The credit card number appears to be invalid');
    }
    //Validate CVC number.
    if(!Stripe.card.validateCVC(cvcNum)) {
      error = true;
      alert('The CVC number appears to be invalid');
    }
    //Validate expiration date.
    if(!Stripe.card.validateExpiry(expMonth, expYear)) {
      error = true;
      alert('The expiration date appears to be invalid');
    }
    if (error) {
      //If there are card errors, don't send to Stripe.
      submitBtn.prop('disabled', false).val("Sign Up");
    } else {
      //Send the card info to Stripe.
      Stripe.createToken({
        number: ccNum,
        cvc: cvcNum,
        exp_month: expMonth,
        exp_year: expYear
      }, stripeResponseHandler);
    }
    return false;
  });
  //Stripe will return a card token.
  function stripeResponseHandler(status, response) {
    //Get the token from the response.
    var token = response.id;
    //Inject the card token in a hidden field.
    theForm.append( $('<input type="hidden" name="user[stripe_card_token]">').val(token) );
    //Submit form to our Rails app.
    theForm.get(0).submit();
  }
});