const startBtn = document.querySelector(".data-start");
const stopBtn = document.querySelector(".data-stop");
let intervalId = null;

startBtn.addEventListener("click", () => {
  intervalId = setInterval(changeBackgroundColor, 1000);
  startBtn.disabled = true;
});

stopBtn.addEventListener("click", () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
});

function changeBackgroundColor() {
  const body = document.body;
  const randomColor = getRandomHexColor();
  body.style.backgroundColor = randomColor;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
}
