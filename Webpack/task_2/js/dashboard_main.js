import '../css/main.css';

const logo = document.createElement('div');
logo.id = 'logo';
document.body.appendChild(logo);

const button = document.createElement('button');
button.textContent = 'Click me';

const counter = document.createElement('span');
counter.className = 'counter';
counter.textContent = '0';

button.appendChild(counter);
document.body.appendChild(button);

button.addEventListener('click', () => {
  let count = parseInt(counter.textContent);
  counter.textContent = count + 1;
});
