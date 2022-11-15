import throttle from 'lodash.throttle';

const LOCALSTORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

refs.form.addEventListener('submit', onFormSubmit);
refs.form.addEventListener('input', throttle(onInputForm, 500));
window.addEventListener('load', populateMessageOutput);
populateMessageOutput();

function onFormSubmit(evt) {
  evt.preventDefault();
  const {
    elements: { email, message },
  } = evt.currentTarget;
  console.log({ email: email.value, message: message.value });
  localStorage.removeItem(LOCALSTORAGE_KEY);
  refs.form.reset();
}

function onInputForm(evt) {
  evt.preventDefault();
  const message = refs.form.elements.message.value;
  const email = refs.form.elements.email.value;
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ message, email }));
}

function populateMessageOutput() {
  const outputTextContent = localStorage.getItem(LOCALSTORAGE_KEY);
  const outputObjectContent = JSON.parse(outputTextContent) || {
    email: '',
    message: '',
  };
  const { email, message } = outputObjectContent;
  refs.form.elements.email.value = email;
  refs.form.elements.message.value = message;
}
