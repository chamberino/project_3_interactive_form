
/*****
Sets focus on the first text field when the page is loaded
*****/
$(document).ready(function(){
  $("#name").focus();
  $("#other-title").hide()
});



/*****
Adds a text field that is revealed when the "Other" option is selected from the "Job Role" drop down menu.
*****/

$('#title').on('change', function() {
  if($(this).val()==='other') {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
})




/*****
Filters the color options that match the design selected in the "Design" menu.
*****/

const jsPuns = /JS puns/i;
const jsOnly = /(heart JS)|(I ♥ JS)/i;
$('#design').on('change', function() {
  $("#color option[value='tomato']").removeAttr("selected");
  $("#color option[value='cornflowerblue']").attr('selected', '');
  $.each($('#color option'), function(index, value) {
    $(value).show();
  });
  if(jsPuns.test($(this).val())) {
    $.each($('#color option'), function(index, value) {
      if(jsPuns.test(value.textContent) !== true) {
        $(value).hide();
      };
    })
  }
  if(jsOnly.test($(this).val())) {
    $("#color option[value='tomato']").attr('selected', '');
    $.each($('#color option'), function(index, value) {
      if(jsOnly.test(value.textContent) !== true) {
        $(value).hide();
      };
    })
  }
})

/*
”Register for Activities” section
Some events are at the same day and time as others. If the user selects a workshop, don't allow selection of a workshop at the same day and time -- you should disable the checkbox and visually indicate that the workshop in the competing time slot isn't available.

When a user unchecks an activity, make sure that competing activities (if there are any) are no longer disabled.

As a user selects activities, a running total should display below the list of checkboxes. For example, if the user selects "Main Conference", then Total: $200 should appear. If they add 1 workshop, the total should change to Total: $300.
*/

// function activityCompatibility(string) {
//   let regex = /string/
//   return /${string}/.test(string);
// }


//1. select element
const bookedTimeRegEx = /\d?\d?\wm-\d?\d?\wm/;
const activities = $('.activities').on('change', function(e) {
  if(e.target.checked) {
    console.log($(e.target).parent());

    console.log($(e.target).parent()[0].innerText);
    let bookedTime = $(e.target).parent()[0].innerText.match(bookedTimeRegEx)
    // console.log(bookedTime)
    bookedTime = bookedTime[0];
    bookedTime = new RegExp(bookedTime)
    // const activity = $('.activities label');
    $.each($('.activities label'), function(index, value) {
      // console.log(e.target);
      if(bookedTime.test(value.textContent)&&value.children[0]!==e.target){
        // $(value).hide();
        value.children[0].disabled = true;
        value.style.color = '#b20000';
      }
    });
}
});
//2. Use regex to f


/*
"Payment Info" section
Display payment sections based on the payment option chosen in the select menu.

The "Credit Card" payment option should be selected by default. Display the #credit-card div, and hide the "PayPal" and "Bitcoin" information. Payment option in the select menu should match the payment option displayed on the page.

When a user selects the "PayPal" payment option, the PayPal information should display, and the credit card and “Bitcoin” information should be hidden.

When a user selects the "Bitcoin" payment option, the Bitcoin information should display, and the credit card and “PayPal” information should be hidden.

NOTE: The user should not be able to select the "Select Payment Method" option from the payment select menu, because the user should not be able to submit the form without a chosen payment option.

*/


/*
Form validation
If any of the following validation errors exist, prevent the user from submitting the form:

Name field can't be blank.

Email field must be a validly formatted e-mail address (you don't have to check that it's a real e-mail address, just that it's formatted like one: dave@teamtreehouse.com for example.
*/
$('#mail').on('keypress', function(e) {
  const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  if(emailRegEx.test($(this).val())) {
    $('span.error').hide();
  };
})
function isValidEmail(email) {
  return /^[^@]+@[^.]+.[a-z]{3}$/i.test(email)
}

/*
User must select at least one checkbox under the "Register for Activities" section of the form.

If the selected payment option is "Credit Card," make sure the user has supplied a Credit Card number, a Zip Code, and a 3 number CVV value before the form can be submitted.

Credit Card field should only accept a number between 13 and 16 digits.

The Zip Code field should accept a 5-digit number.

The CVV should only accept a number that is exactly 3 digits long.
NOTE: Don't rely on the built in HTML5 validation by adding the required attribute to your DOM elements. You need to actually create your own custom validation checks and error messages.

NOTE: Avoid using snippets or plugins for this project. To get the most out of the experience, you should be writing all of your own code for your own custom validation.

NOTE: Make sure your validation is only validating Credit Card info if Credit Card is the selected payment method.
*/


/*
Form validation messages

Provide some kind of indication when there’s a validation error. The field’s borders could turn red, for example, or even better for the user would be if a red text message appeared near the field.

The following fields should have some obvious form of an error indication:

Name field
Email field
Register for Activities checkboxes (at least one must be selected)
Credit Card number (Only if Credit Card payment method is selected)
Zip Code (Only if Credit Card payment method is selected)
CVV (Only if Credit Card payment method is selected)

Note: Error messages or indications should not be visible by default. They should only show upon submission, or after some user interaction.
*/


/*
Form works without JavaScript - Progressive Enhancement
The user should still have access to all form fields and payment information if JS isn't working for whatever reason. For example, when the JS is removed from the project:
The “Other” text field under the "Job Role" section should be visible
All information for Bitcoin, PayPal or Credit Card payments should be visible.
*/


/*
Extra Credit
To get an "exceeds" rating, you can expand on the project in the following ways:

 3 steps
T Shirt Section
Hide the "Color" label and select menu until a T-Shirt design is selected from the "Design" menu.
Conditional Error Message
Program at least one of your error messages so that more information is provided depending on the error. For example, if the user hasn’t entered a credit card number and the field is completely blank, the error message reads “Please enter a credit card number.” If the field isn’t empty but contains only 10 numbers, the error message reads “Please enter a number that is between 13 and 16 digits long.”
Real-time Error Messages
Program your form so that it provides a real-time validation error message for at least one text input field. Rather than providing an error message on submit, your form should check for errors and display messages as the user begins typing inside a text field. For example, if the user enters an invalid email address, the error appears as the user begins to type, and disappears as soon as the user has entered a complete and correctly formatted email address. You must accomplish this will your own JavaScript code. Do not rely on HTML5's built-in email validation.
NOTE: If you implement the above exceeds requirements in your form, make sure you detail in your submission notes which input will have different error messages depending on the error, and which input will have "real time" validation messages, so your reviewer won't miss them by accident.
*/
