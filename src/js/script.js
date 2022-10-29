///--- DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");

// Form
const modalForm = document.getElementById("reserve");
const firstName = document.querySelector("#first");
const lastName = document.querySelector("#last");
const email = document.querySelector("#email");
const birthdate = document.querySelector("#birthdate");
const quantity = document.querySelector("#quantity");
const locations = document.querySelectorAll("#locations > input");
const conditions = document.querySelector("#checkbox1");

// Regex : https://regexr.com
const regexNumber = new RegExp(/^[0-9]$/);
const regexTextOnly = new RegExp(/^[^\s][a-zA-ZÀ-ȕ\s]{1,}$/);
const regexEMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
const regexDate = new RegExp(
  "([0-9]{4}[-](0[1-9]|1[0-2])[-]([0-2]{1}[0-9]{1}|3[0-1]{1})|([0-2]{1}[0-9]{1}|3[0-1]{1})[-](0[1-9]|1[0-2])[-][0-9]{4})"
);

///--- Functions

// Switch default nav to responsive nav
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
  modalForm.style.display = "block";
}
// close modal form
function closeModal() {
  modalbg.style.display = "none";
}

// Validation Form
function validationForm(e) {
  // Stop default action of submit button
  e.preventDefault();
  // remove all actually error message
  hiddenError();

  // Get all input on form and valid (or not) all datas
  let results = {
    firstName: validText(firstName),
    lastName: validText(lastName),
    email: validEMail(email),
    birthdate: validBirthdate(birthdate),
    quantity: validNumber(quantity),
    locations: validLocation(locations),
    conditions: validConditions(conditions),
  };

  // Checks if all results was true
  if (Object.values(results).every((e) => e == true)) {
    // Switch to validation Modal
    validationModal();
    // Or something is false / wrong data
  } else {
    Object.values(results).map((e) => {
      // Checks if we have a element and a message for this data
      if (e.hasOwnProperty("element") && e.hasOwnProperty("message")) {
        // we add a message error on this element / wront data
        showError(e.element, e.message);
      }
    });
  }
}
///--- Verification Form

// Checks valid text
function validText(text) {
  let message = "Veuillez saisir un texte valide.";

  // Checks if regexText is valid
  return regexTextOnly.test(text.value) && text !== null
    ? true
    : { element: text.parentNode, message: message };
}

// Checks valid email
function validEMail(email) {
  let message = "Veuillez saisir un email valide.";

  // Checks if regexEmail is valid
  return regexEMail.test(email.value)
    ? true
    : { element: email.parentNode, message: message };
}

// Checks valid birthdate
function validBirthdate(birthdate) {
  let message = "Veuillez saisir une date de naissance valide.";
  // Get birthdate year
  let dataDate = new Date(birthdate.value);
  let dataDateYear = dataDate.getFullYear();
  // Get current date year
  let today = new Date();
  let todayYear = today.getFullYear();
  // Compare current date with birthdate: not valid if < 3 years old // if < 120 years old
  let compareYearDate = todayYear - dataDateYear;

  // Checks if regexDate is valid, if its not current date and if compareYearDate (>3 <120 years old)
  return regexDate.test(birthdate.value) &&
    compareYearDate > 3 &&
    compareYearDate < 120
    ? true
    : { element: birthdate.parentNode, message: message };
}

// Ckecks valid number
function validNumber(number) {
  let message = "Veuillez saisir un nombre valide.";

  // Checks if regexNumber is valid
  return regexNumber.test(number.value)
    ? true
    : { element: number.parentNode, message: message };
}

// Checks if a location is checked
function validLocation(values) {
  let message = "Veuillez cocher un tournoi.";

  // Filters to find a box checked
  return Array.from(values).filter((e) => e.checked).length > 0
    ? true
    : { element: values[0].parentNode, message: message };
}

// Ckecks if conditions is checked
function validConditions(conditions) {
  let message = "Veuillez lire et accepté les conditions d'utilisation.";

  return conditions.checked
    ? true
    : { element: conditions.parentNode, message: message };
}

// show error message
function showError(element, message) {
  // create balise p HTML with message error and add error class style
  let p = document.createElement("p");
  p.innerText = message;
  p.classList.add("error");

  // Check if element is a input
  if (element.classList.contains("input-control")) {
    // Add red border style
    element.querySelector(".text-control").style.borderColor = "red";
  }

  // add this message error at end of element
  element.appendChild(p);
}

// remove all error class
function hiddenError() {
  // remove class error
  let allError = document.querySelectorAll(".error");
  Array.from(allError).map((e) => e.remove());

  // remove red border
  let allInput = document.querySelectorAll(".text-control");
  Array.from(allInput).map((e) => (e.style.borderColor = "green"));
}

// Show Validation modal
function validationModal() {
  let button = document.querySelector(".btn-submit");
  let label = document.querySelector(".text-label");
  // Hidden form Modal
  Array.from(formData).map((e) => (e.style.display = "none"));

  // Edit HTMLT elements
  label.innerHTML = "Merci pour<br> votre inscription";
  button.value = "Fermer";
  // Edit Styles
  modalForm.style.display = "flex";
  modalForm.style.flexDirection = "column";
  modalForm.style.alignItems = "center";
  modalForm.style.textAlign = "center";
  label.classList.add("valid-modal-label");

  // Close button
  button.addEventListener("click", () => {
    // valid submit form
    modalForm.submit();
  });
}

///--- Event Listener

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// Close modal event
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

// Submit modal form
modalForm.addEventListener("submit", validationForm);
