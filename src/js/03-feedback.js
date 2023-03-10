import throttle from 'lodash.throttle';

const form = document.querySelector('form.feedback-form');
const formEmail = document.querySelector('form input');
const formMessage = document.querySelector('form textarea');

populateForm();

let formData = {
  email: '',
  message: '',
};
form.addEventListener('input', throttle(onFormInput, 500));
function onFormInput(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

form.addEventListener('submit', onFormSubmit);
function onFormSubmit(evt) {
  evt.preventDefault();
  console.log(formData);
  localStorage.removeItem('feedback-form-state');
  evt.currentTarget.reset();
}

function populateForm() {
  const savedFormData = localStorage.getItem('feedback-form-state');

  if (savedFormData) {
    const parsedFormData = JSON.parse(savedFormData);
    formEmail.value = parsedFormData.email;
    formMessage.value = parsedFormData.message;
  } else {
    formEmail.value = '';
    formMessage.value = '';
  }
}
