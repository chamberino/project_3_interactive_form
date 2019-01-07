
/* * * * * * * *
Sets focus on the first text field when the page is loaded
* * * * * * * */
$(document).ready(function(){
  $("#name").focus();
  $("#other-title").hide()
});

/* * * * * * * *
Validation Object contains objects for each input field. Each input object contains
an error message string and boolean value that is updated if field is filled out correctly.
* * * * * * * */
let validation = {
  email: {
      field: 'mail',
      isValid: false,
      message: 'Please enter a valid email'
    },
  name: {
      field: 'name',
      isValid: false,
      message: 'Please enter your name'
    },
  creditCard: {
      field: 'cc-num',
      isValid: false,
      message: 'Please enter a valid credit card number between 13-16 digits long'
    },
  zip: {
      field: 'zip',
      isValid: false,
      message: 'Please enter a valid zip code'
    },
  cvv: {
      field: 'cvv',
      isValid: false,
      message: 'Please enter a valid CVV'
    },
  registered: {
      isValid: false,
      message: 'Please select an activity',
    }
}

/* * * * * * * *
Adds a text field that is revealed when the "Other" option is selected from the "Job Role" drop down menu.
* * * * * * * */
$('#title').on('change', function() {
  if($(this).val()==='other') {
    $("#other-title").show();
  } else {
    $("#other-title").hide();
  }
})

//Hides all T-Shirt color options inititally
$("#colors-js-puns").hide();
/* * * * * * * *
Filters the T-Shirt color options to only show those that match the design selected in the "Design" menu.
* * * * * * * */
$('#design').on('change', function() {
  //Regular expressions that will be used to filter options that don't match
  const jsPuns = /JS puns/i;
  const jsOnly = /(heart JS)|(I ♥ JS)/i;
  //T-Shirt options are revealed if design theme is selected.
  if($('#design').val()!=='Select Theme') {
    $("#colors-js-puns").show();
    $("#color option[value='tomato']").removeAttr("selected");
    $("#color option[value='cornflowerblue']").attr('selected', '');
  //If design theme is selected, colors are shown
  $.each($('#color option'), function(index, value) {
    $(value).show();
  });
  //Colors that don't match design selected are hidden
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
  //hides color options
} else {
  $("#colors-js-puns").hide();
  }
})


/* * * * *
runningTotal variable is initialized and will be used to store total cost of selected activities
* * * * */
let runningTotal = 0;
/* * * * *
Handler updates available options as user selects activities. A running total is also displayed
and updated each time a selection is made.
* * * * */
const activities = $('#activities').on('change', function(e) {
  //Total is removed each time a selection is made.
  $('.total').remove();
  //Regular expressions that will be used to extract the time and cost from each option
  const bookedTimeRegEx = /\w+day\s\d?\d\w?m-\d?\d\w?m/;
  const costRegEx = /\$\d+/;
  //Cost variable holds the cost of the selected events
  let cost = $(e.target).parent()[0].innerText.match(costRegEx)[0];
  //The number is extracted from the string and variable is updated
  cost = parseInt(cost.replace(/(\$)(\d+)/, '$2'), 10)
  //bookedTime holds time of the selected event
  let bookedTime = $(e.target).parent()[0].innerText.match(bookedTimeRegEx);
  if (e.target.checked) {
    runningTotal += cost;
  }
  if (e.target.checked !== true) {
    runningTotal -= cost;
  }
    /*Condition checks if bookedTime hold a valid value. If Main Conference is select_method
    it would show up as null since there is no time associated with that option.*/
  if (bookedTime !== null) {
    //Regular Expression is dynamically created
    bookedTime = new RegExp(bookedTime[0])
    /*Options are iterated over and styles are updated based on whether user selects or
    deselects an option and if the selected time slot conflicts with another option*/
    $.each($('#activities label'), function(index, value) {
      if (e.target.checked) {
        if(bookedTime.test(value.textContent)&&value.children[0]!==e.target){
          value.children[0].disabled = true;
          value.style.color = '#5b5b5b';
        }
      }
      if (e.target.checked !== true) {
        if(bookedTime.test(value.textContent)&&value.children[0]!==e.target){
          value.children[0].disabled = false;
          value.style.color = 'black';
        }
      }
    });
  }
  //Validation Object is updated based on runningTotal value
  if(runningTotal>0){
      validation.registered.isValid = true;
      $('.activityError').remove();
    } else if(runningTotal<=0) {
      validation.registered.isValid = false;
      $('#activities').after(`<p class="activityError"style="color:#e5001a; margin-top:0;">Please select an activity</p>`);
  }
  //Running total is concatenated into HTML
  $('#activities').append(`<div class="total">Total: $${runningTotal}</div>`);
});

/* * * * * * * *
"Payment Info" section
* * * * * * * */
// 'Select Method' is disabled as an available option
$("option[value='select_method']").attr('disabled', '');
// Credit Card option is set by default
$("option[value='credit-card']").attr('selected', '');
// Hides paypal and bitcoin instructions
$('.paypal').hide();
$('.bitcoin').hide();

// Handler hides all payment options, then shows the information relevant to the selected option
$('#payment').on('change', function(e) {
  $('.paypal').hide();
  $('.bitcoin').hide();
  $('.credit-card').hide();
  $(`.${$(this).val()}`.toLowerCase()).show();
  //Validation Object is updated if option other than credit-card is selected.
  if($(this).val()!=='credit-card'){
    validation.creditCard.isValid = true;
    validation.zip.isValid = true;
    validation.cvv.isValid = true;
  } else if ($(this).val()==='credit-card'){
    validation.creditCard.isValid = false;
    validation.zip.isValid = false;
    validation.cvv.isValid = false;
  }
});

/* * * * * * * *
Handler checks if input field is empty and updates Validation Object. A placeholder attribute
is also added for user guidance.
* * * * * * * */
$('#name').on('focusin', function(e) {
  $('#name').attr('placeholder','Required')
});
$('#name').on('focusout', function(e) {
  $('#name').attr('placeholder','')
  if($('#name').val().length>0){
    validation.name.isValid = true;
  }
  if($('#name').val().length===0){
    validation.name.isValid = false;
  }
});

/* * * * * * * *
Handler adds placeholder attribute to display properly formatted email address to user.
* * * * * * * */
$('#mail').on('focusin', function(e) {
  $('#mail').attr('placeholder','Required (mail@example.com)')
});
$('#mail').on('focusout', function(e) {
  $('#mail').attr('placeholder','')
  $('span.error').hide();
});

/* * * * * * * *
Handler checks for valid email format and displays error message until valid string is entered
* * * * * * * */
$('#mail').on('keyup', function(e) {
  if($('span.error').length === 0){
    $('#mail').after(`<div class=errorDiv><span class="error" style=display:none>Must be a valid email address</span></div>`);
  }
  const emailRegEx = /^[^@]+@[^@.]+\.[a-z]+$/i;
  if(emailRegEx.test($(this).val()) || $('#mail').val()
 === '') {
    $('span.error').hide();
    validation.email.isValid = true;
  };
  if(emailRegEx.test($(this).val())!==true) {
    $('span.error').text('Must be a valid email address')
    $('span.error').show();
    validation.email.isValid = false;
  }
  if($('#mail').val().length === 0){
    $('span.error').text('Please enter email address')
  }
})
function isValidEmail(email) {
  return /^[^@]+@[^.]+.[a-z]{3}$/i.test(email)
}



$('#cc-num').on('keyup', function(e) {
  const ccRegEx = /^\d{13,16}$/;
  if(ccRegEx.test($(this).val())){
    validation.creditCard.isValid = true;
  };
  if(ccRegEx.test($(this).val()) === false){
    validation.creditCard.isValid = false;
  }
});

$('#zip').on('keyup', function(e) {
  const zipRegEx = /^\d{5}$/;
  if(zipRegEx.test($(this).val())){
    validation.zip.isValid = true;
  } else {
    validation.zip.isValid = false;
  }
});

$('#cvv').on('keyup', function(e) {
  const cvvRegEx = /^\d{3}$/;
  if(cvvRegEx.test($(this).val())){
    validation.cvv.isValid = true;
  } else {
    validation.cvv.isValid = false;
  }

});

/* * * * *
HANDLER CHECKS VALIDATION OBJECT AND PREVENTS SUBMISSION IF ANY FALSE VALUES ARE ENCOUNTERED
* * * * */
$('form').on('submit', function(e) {
  $('.error-message').remove();
  $.each(validation, function(key, value){
  	if(value.isValid === false) {
      e.preventDefault();
      $('button').after(`<p class='error-message'>${value.message}</p>`);
      $(`#${value.field}`).addClass('error-border')
  	}
    if(value.isValid === true) {
      $(`#${value.field}`).removeClass('error-border')
    }
  })
})
