"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Brandon Perry
      Date:   10/07/2022

      Filename: js06b.js
 */

let subButton = document.getElementById("subButton");

// Validate the payment when the submit button is clicked
subButton.addEventListener("click", validateName); // Run the validateName() function when the submit button is clicked
subButton.addEventListener("click", validateCard); 
subButton.addEventListener("click", validateNumber);
subButton.addEventListener("click", validateMonth);
subButton.addEventListener("click", validateYear);
subButton.addEventListener("click", validateCVC);


// Check if the owner's name is entered on the cardfunction
function validateName() {
   let cardName = document.getElementById("cardName");
   if (cardName.validity.valueMissing) { // Test if a required value is missing from the cardName field
      cardName.setCustomValidity("Enter your name as it appears on the card"); // Popup error message when value is missing
   } else {
      cardName.setCustomValidity(""); // No popup error message when the field is valid
   }
}

// Check if a credit card has been selected
function validateCard() {
   let card = document.forms.payment.elements.credit[0]; // With options buttons you only have to check the first option in the list
   if (card.validity.valueMissing) {
      card.setCustomValidity("Select your credit card"); // Popup error message if no options are selected
   } else {
      card.setCustomValidity(""); // No popup error message when the field is valid
   }
}

// Check if the card number is valid
function validateNumber() {
   let cNum = document.getElementById("cardNumber");
   if (cNum.validity.valueMissing) { // Test whether the credit card number field was left blank
      cNum.setCustomValidity("Enter your card number"); // Popup error message if no card number is entered    
   } else if (cNum.validity.patternMismatch) { // Otherwise test if the card number matches the correct pattern
      cNum.setCustomValidity("Enter a valid card number"); // Popup error message if the card does not have the right pattern
   } else if (luhn(cNum.value) === false) {
      cNum.setCustomValidity("Enter a legitimate card number"); // If the card num fails the Luhn algorithm, display a validation error
   } else {
      cNum.setCustomValidity("");
   }
}

function validateMonth() {
   let month = document.getElementById("expMonth");
   if (month.selectedIndex === 0) { // If the first option in the selection list is selected, the month is invalid
      month.setCustomValidity("Select the expiration month");
   } else {
      month.setCustomValidity("");
   }
}

// Check that a year is selected for the expiration date
function validateYear() {
   let year = document.getElementById("expYear");
   if (year.selectedIndex === 0) { // If the first option in the selection list is selected the year is invalid
      year.setCustomValidity("Select the expiration year");
   } else {
      year.setCustomValidity("");
   }
}

function validateCVC() {
   // Determine which card was selected
   let card = document.querySelector('input[name="credit"]:checked').value; // Retrieve the name of the selected credit card
   let cvc = document.getElementById("cvc")

   // Validate the CVC value
   if (cvc.validity.valueMissing) {
      cvc.setCustomValidity("Enter your CVC number"); // If the CVC number is missing, it is invalid
   } else if ((card === "amex") && !(/^\d{4}$/.test(cvc.value))) {
      cvc.setCustomValidity("Enter a 4-digit number"); // If the card is American Express and the CVC does not have 4 digits, it is invalid
   } else if ((card !== "amex") && !(/^\d{3}$/.test(cvc.value))) {
      cvc.setCustomValidity("Enter a 3-digit number"); // if the card is not american Express and the CVC does not have 3 Digits it is invalid
   } else {
      cvc.setCustomValidity("");
   }
}














/* ------- Luhn Algorithm used for Validating Credit Card Numbers   ----- */

function luhn(idNum) {
   let string1 = "";
   let string2 = "";
   
   // Retrieve the odd-numbered digits starting from the back
   for (let i = idNum.length - 1; i >= 0; i-= 2) {
      string1 += idNum.charAt(i);
   }
   // Retrieve the even-numbered digits starting from the back and double them
   for (let i = idNum.length - 2; i >= 0; i-= 2) {
      string2 += 2*idNum.charAt(i);
   }
   
   // Return whether the sum of the digits is divisible by 10
   return sumDigits(string1 + string2) % 10 === 0;
   
   function sumDigits(numStr) {
      let digitTotal = 0;
      for (let i = 0; i < numStr.length; i++) {
         digitTotal += parseInt(numStr.charAt(i));
      }
      return digitTotal;
   }
}
   

