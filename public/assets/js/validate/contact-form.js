/*!
 * Contact Form JS  v1.0
 * Copyright @ 2026 The Ashen Hansaka Authors
 * Licensed under MIT
 */

(function () {
  "use strict";

  const form = document.getElementById("contactForm");
  const btn = document.getElementById("contactBtn");
  const loading = document.getElementById("contactLoading");
  
  const errorWrapper = document.querySelector(".error-message");
  const sentWrapper = document.querySelector(".sent-message");
  const errorMessageText = document.getElementById("contactErrorMessage");

  const name = document.querySelector("#contactName");
  const email = document.querySelector("#contactEmail");
  const phone = document.querySelector("#contactPhone");
  const subject = document.querySelector("#contactSubject");
  const message = document.querySelector("#contactMessage");

  // Regex Patterns
  const nameRegex = /^[a-zA-Z\s]{3,50}$/; // letters and spaces only (length 3 - 50)
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Standard email format
  const phoneRegex = /^(?:07|\+947)[-.\s]?\d[-.\s]?\d{3}[-.\s]?\d{4}$/; // Sri Lankan phone numbers (starting with 07 or +947, followed by 8 digits, allowing optional separators)
  const subjectRegex = /^.{5,}$/; // Subject cannot be empty, at least 5 characters
  const messageRegex = /^.{10,}$/; // Message must be at least 10 characters

  function toggleError(input, helpId, isValid) {
    const helpElement = document.getElementById(helpId);
    if (isValid) {
      input.classList.remove("is-invalid");
      input.classList.add("is-valid");
      helpElement.classList.add("d-none");
    } else {
      input.classList.remove("is-valid");
      input.classList.add("is-invalid");
      helpElement.classList.remove("d-none");
    }
  }

  function checkFormValidity() {
    const isNameValid = nameRegex.test(name.value.trim());
    const isEmailValid = emailRegex.test(email.value.trim());
    const isPhoneValid = phoneRegex.test(phone.value.trim());
    const isSubjectValid = subjectRegex.test(subject.value.trim());
    const isMessageValid = messageRegex.test(message.value.trim());

    if (isNameValid && isEmailValid && isPhoneValid && isSubjectValid && isMessageValid) {
      btn.removeAttribute("disabled");
    } else {
      btn.setAttribute("disabled", "true");
    }
  }

  // Event Listeners (Real-time Validation)
  name.addEventListener("input", function () {
    toggleError(name, "contactNameHelp", nameRegex.test(name.value.trim()));
    checkFormValidity();
  });

  email.addEventListener("input", function () {
    toggleError(email, "contactEmailHelp", emailRegex.test(email.value.trim()));
    checkFormValidity();
  });

  phone.addEventListener("input", function () {
    toggleError(phone, "contactPhoneHelp", phoneRegex.test(phone.value.trim()));
    checkFormValidity();
  });

  subject.addEventListener("input", function () {
    toggleError(subject, "contactSubjectHelp", subjectRegex.test(subject.value.trim()));
    checkFormValidity();
  });

  message.addEventListener("input", function () {
    toggleError(message, "contactMessageHelp", messageRegex.test(message.value.trim()));
    checkFormValidity();
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevents page reloading (necessary for AJAX submission)

    loading.style.display = 'block';
    errorWrapper.style.display = 'none';
    sentWrapper.style.display = 'none';

    const formData = new FormData(form);

    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    })
    .then(response => {
      loading.style.display = 'none';
      
      if (response.ok) {
        // If there is a successful response from the server (Status 200)
        return response.text().then(text => {
          if (text.trim().toLowerCase().endsWith('ok') || text.trim() === '') {
            sentWrapper.style.display = 'block'; // The success message is displayed
            form.reset(); // The form is cleared

            form.querySelectorAll('.form-control').forEach(input => {
                input.classList.remove('is-valid', 'is-invalid');
            }); // All validation states are cleared
            btn.setAttribute("disabled", "true"); // The button is disabled again
          } else {
            // If the server returns a response but it's not "OK", it means there is an error message from the server
            errorMessageText.innerHTML = "Server Error: " + text;
            errorWrapper.style.display = 'block';
          }
        });
      } else {
        // If there is an error from the server (e.g., Status 404, 500)
        errorMessageText.innerHTML = "Server Error: (Status: " + response.status + ")";
        errorWrapper.style.display = 'block';
      }
    })
    .catch(error => {
      loading.style.display = 'none';
      errorMessageText.innerHTML = error.message || 'The message could not be sent. Check your internet connection.';
      errorWrapper.style.display = 'block'; // The error message is displayed
    });
  });
})();
