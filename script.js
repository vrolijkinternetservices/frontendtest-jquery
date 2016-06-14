/*
 * Front-end developer test, v1.0a.
 *
 * JavaScript file
 * 
 * Written by Raymond Vrolijk
 */
$(document).ready(function() {
  
  // Pre-fill form with JSON data
  $.getJSON("data.json", function(data) {
    $.each( data.data, function( key, val ) {
      $("#" + key).val(val);
    });
  });

  // Remove alphabetical characters from housenumber
  $("#housenumber").keyup(function (e) {
    $("#housenumber").val($("#housenumber").val().replace(/[^0-9]/g, ''));
  });

  function validate_postalcode() {
    var regexp = new RegExp("^\d{4} ?[A-Z]{2}$");
    
    // Check if postal code is a valid Dutch postal code
    if ($("#postalcode").val().toLowerCase().match(/^\d{4} ?[a-z]{2}$/i)) {
      return true;
    }
    else {
      // Add red highlighting to label and input field      
      $("#postalcode, #label-postalcode").addClass("error");      
      return false;
    }
  }

  function validate_city() {
    
    // Check if city is "Amsterdam"
    if ($("#city").val().toLowerCase() !== "amsterdam") {  
      // Add red highlighting to label and input field        
      $("#city, #label-city").addClass("error");
      return false;
    }
    else {
      return true;
    }
  }

  // When the form is clicked, remove all errors and highlight classes from
  // the HTML elements
  $("#form").click(function() {
    $(".field-error").html("&nbsp");
    $("label, input").removeClass("error");
  });

  $("#form").submit(function(e) {
    
    var has_errors = false;
    
    // Validate postalcode
    if (!validate_postalcode()) {
      $("#error-postalcode").html("Postalcode is invalid<br />");
      has_errors = true;      
    }

    // Validate housenumber
    if($("#housenumber").val() === "") {
      $("#error-housenumber").html("Please fill in housenumber<br />");
      
      // Add red highlighting to label and input field          
      $("#housenumber, #label-housenumber").addClass("error");   
      has_errors = true;      
    }

    // Validate street
    if($("#street").val() === "") {
      $("#error-street").html("Please fill in street<br />");
      
      // Add red highlighting to label and input field          
      $("#street, #label-street").addClass("error");
      has_errors = true;      
    }
    else if (!$("#street").val().match(/[^0-9]/g)) {
      $("#error-street").html("Street is invalid<br />");
      
      // Add red highlighting to label and input field         
      $("#street, #label-street").addClass("error");      
      has_errors = true;            
    }

    // Validate city
    if (!validate_city()) {
      $("#error-city").html("City should be 'Amsterdam'<br />");
      
      // Add red highlighting to label and input field          
      $("#city, #label-city").addClass("error");   
      has_errors = true;
    }

    // Show succesfully submitted message and disable form
    if (has_errors === false) {
      $("#form-successful").show();
      $("#form input").prop("disabled", true);
    }
    e.preventDefault();
  });

});
