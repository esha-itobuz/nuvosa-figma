import "../scss/styles.scss";
// Import Toastify
import Toastify from 'toastify-js'
import "toastify-js/src/toastify.css"

// Toastify toast function
function showToast(message, isSuccess = true) {
  Toastify({
    text: message,
    duration: 5000,
    gravity: "top",
    position: "right",
    backgroundColor: isSuccess 
      ? "linear-gradient(to right, #00b09b, #96c93d)" 
      : "linear-gradient(to right, #ff5f6d, #ffc371)",
    close: true,
    stopOnFocus: true,
    style: {
      borderRadius: "8px",
      fontFamily: "inherit",
      fontSize: "14px"
    }
  }).showToast();
}

function validateName(name) {
  if (!name || typeof name !== 'string') return false;
  return name.trim().length >= 2;
}

function validateEmail(email) {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

// Form handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('subscribeForm');
  if (!form) return;

  const nameInput = document.getElementById('subscribeName');
  const emailInput = document.getElementById('subscribeEmail');
  const submitBtn = form.querySelector('button[type="submit"]');

  // Simple validation on blur
  nameInput.addEventListener('blur', () => {
    const isValid = validateName(nameInput.value);
    nameInput.style.borderColor = isValid ? '#28a745' : '#dc3545';
    
    const feedback = nameInput.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = isValid ? '' : 'Name must be at least 2 characters';
      feedback.style.display = isValid ? 'none' : 'block';
    }
  });

  emailInput.addEventListener('blur', () => {
    const isValid = validateEmail(emailInput.value);
    emailInput.style.borderColor = isValid ? '#28a745' : '#dc3545';
    
    const feedback = emailInput.parentNode.querySelector('.invalid-feedback');
    if (feedback) {
      feedback.textContent = isValid ? '' : 'Please enter a valid email';
      feedback.style.display = isValid ? 'none' : 'block';
    }
  });

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const name = nameInput.value.trim();
    const email = emailInput.value.trim();

    console.log('Form submitted:', { name, email }); 

    const nameValid = validateName(name);
    const emailValid = validateEmail(email);
    
    console.log('Validation results:', { nameValid, emailValid });

    if (!nameValid || !emailValid) {
      showToast('Invalid input', false);
      return;
    }

    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Subscribing...';

    setTimeout(() => {
      form.reset();
      nameInput.style.borderColor = '';
      emailInput.style.borderColor = '';
      
      const feedbacks = form.querySelectorAll('.invalid-feedback');
      feedbacks.forEach(feedback => {
        feedback.style.display = 'none';
        feedback.textContent = '';
      });
      
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      
      showToast('Successfully subscribed! Thank you.');
    }, 1500);
  });
});
