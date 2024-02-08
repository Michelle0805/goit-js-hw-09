import flatpickr from "flatpickr";
import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import "flatpickr/dist/flatpickr.min.css";


const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      handleDateSelection(selectedDates);
    },
  };
  
  flatpickr("#datetime-picker", options);
  
  const startBtn = document.getElementById("data-start");
  const daysDisplay = document.querySelector("[data-days]");
  const hoursDisplay = document.querySelector("[data-hours]");
  const minutesDisplay = document.querySelector("[data-minutes]");
  const secondsDisplay = document.querySelector("[data-seconds]");
  
  let countdownInterval;
  let endDate;
  
  function handleDateSelection(selectedDates) {
    const selectedDate = selectedDates[0];
    const currentDate = new Date();
  
    if (selectedDate <= currentDate) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      endDate = selectedDate;
    }
  }
  
  function startCountdown() {
    if (endDate) {
      countdownInterval = setInterval(updateTimer, 1000);
      startBtn.disabled = true;
    }
  }
  
  function updateTimer() {
    const remainingTime = endDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      setTimerValues(0, 0, 0, 0);
      Notiflix.Notify.success('Countdown timer has reached the end date!')
    } else {
      const { days, hours, minutes, seconds } = convertMs(remainingTime);
      setTimerValues(days, hours, minutes, seconds);
    }
  }
  
  function setTimerValues(days, hours, minutes, seconds) {
    daysDisplay.textContent = addLeadingZero(days);
    hoursDisplay.textContent = addLeadingZero(hours);
    minutesDisplay.textContent = addLeadingZero(minutes);
    secondsDisplay.textContent = addLeadingZero(seconds);
  }
  
  function addLeadingZero(value) {
    return value.toString().padStart(2, '0');
  }
  
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  startBtn.addEventListener("click", startCountdown);
  