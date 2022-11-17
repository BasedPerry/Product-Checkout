"use strict";
/*    JavaScript 7th Edition
      Chapter 6
      Chapter case

      Order Form Code
      Author: Brandon Perry
      Date:   10/03/2022

      Filename: js06a.js
 */

      window.addEventListener("load", function() { // Run the anonymous function when the page is loaded
            let orderForm = document.forms.orderForm; // Reference to the order form
            let model = orderForm.elements.model; // Reference to the selection list with the order form

            // Select Model selection list when form opens
            model.focus(); // Give the focus to the model selection list

            // Add an event listener for every form element
            for (let i = 0; i < orderForm.elements.length; i++) {
                  orderForm.elements[i].addEventListener("change", calcOrder); // Run the calcOrder() function when any order form element changes its value
            }

            // Calculate the cost of the order // Use toLocalString() method to convert to USD
            calcOrder(); // Calculate the cost of the customer order

            function calcOrder() {
                  // Determine the selected model
                  let mIndex = model.selectedIndex;
                  let mValue = model.options[mIndex].value; // Retrieve the value of the selected model

                  // Determine the selected quantity
                  let qIndex = orderForm.elements.qty.selectedIndex;
                  let quantity = orderForm.elements.qty[qIndex].value; // Retrieve the quantity ordered of that model

                  // Model cost = model cost times quantity
                  let modelCost = mValue*quantity;
                  orderForm.elements.modelCost.value = modelCost.toLocaleString("en-US", {style: "currency", currency: "USD"}); // Calculate the cost of ordering that model in the indicated quantity

                  // Retrieve the cost of the Protection plan
                  let planValue = document.querySelector('input[name="plan"]:checked').value; // Value of the plan selected by the customer

                  // Charge the plan to each item ordered
                  let planCost = planValue * quantity;
                  orderForm.elements.planCost.value = planCost.toLocaleString("en-US", {style: "currency", currency: "USD"}); // Calculate the cost of applying the plan to every item ordered 
                  
                  // Calculate the order subtotal
                  let subtotal = modelCost + planCost;
                  orderForm.elements.subtotal.value = subtotal.toLocaleString("en-US", {style: "currency", currency: "USD"}); // Calculate the sum of the cost of the model and the cost of the protection plan

                  // Calculate the 5% sales tax
                  let salesTax = subtotal * 0.05;
                  orderForm.elements.salesTax.value = salesTax.toLocaleString("en-US", {style: "currency", currency: "USD"}); // Calculate the sales tax applied to the subtotal

                  // Calculate the total cost of the order
                  let totalCost = subtotal + salesTax;
                  orderForm.elements.totalCost.value = totalCost.toLocaleString("en-US", {style: "currency", currency: "USD"}); // Calculate the total cost of the order

                  orderForm.elements.modelName.value = model.options[mIndex].text; // Store the text of the selected option in a selection list
                  let selectedPlan = document.querySelector('input[name="plan"]:checked');
                  orderForm.elements.planName.value = selectedPlan.labels[0].textContent; // Store the text of the label associated with the shcecked option in a set of option buttons
            }
      })


