import throttle from "lodash.throttle";

const LOCAL_KEY = 'feedback-form-state'
const form = document.querySelector('.feedback-form');

form.addEventListener('input', throttle(onInputForm, 500));
form.addEventListener('submit', onSubmitForm);

let valuesForm = JSON.parse(localStorage.getItem(LOCAL_KEY)) || {};
const { email, message } = form.elements;
reloadPage();

function onInputForm(evt) {
	valuesForm = { email: email.value, message: message.value };
	localStorage.setItem(LOCAL_KEY, JSON.stringify(valuesForm));
}

function reloadPage() {
	if (valuesForm) {
		email.value = valuesForm.email || '';
		message.value = valuesForm.message || '';
	}
}

function onSubmitForm(evt) {
	evt.preventDefault();
	console.log({ email: email.value, message: message.value });
	if (email.value === '' || message.value === '') {
		return console.log('Please fill in all the fields!');
	}

	localStorage.removeItem(LOCAL_KEY);
	evt.currentTarget.reset();
	valuesForm = {};
}