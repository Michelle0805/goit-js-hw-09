import Notiflix from 'notiflix';


document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.form');

  form.addEventListener('submit', function(event) {
    event.preventDefault();

    const delayInput = document.querySelector('input[name="delay"]');
    const stepInput = document.querySelector('input[name="step"]');
    const amountInput = document.querySelector('input[name="amount"]');

    const firstDelay = parseInt(delayInput.value, 10);
    const step = parseInt(stepInput.value, 10);
    const amount = parseInt(amountInput.value, 10);

    createPromises(amount, firstDelay, step);
  });
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function createPromises(amount, firstDelay, step) {
  const promises = [];

  for (let i = 1; i <= amount; i++) {
    const currentDelay = firstDelay + (i - 1) * step;

    const promise = createPromise(i, currentDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });

    promises.push(promise);
  }

}
