const h1 = document.querySelector('h1');

function changeColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  h1.style.color = `rgb(${r}, ${g}, ${b})`;
}

setInterval(changeColor, 1000);

const waveText = document.querySelector('#wave');
const characters = waveText.textContent.split('');
waveText.textContent = '';

characters.forEach((char, i) => {
  const span = document.createElement('span');
  span.textContent = char;
  span.style.animationDelay = `${i * 0.1}s`;

  const rainbowDuration = (characters.length - i) * 0.1;

  span.style.setProperty('--rainbow-duration', `${rainbowDuration}s`);

  waveText.appendChild(span);
});
