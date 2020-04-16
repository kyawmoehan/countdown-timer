const timerDisplay = document.querySelector('.display__time-left');
const endtime = document.querySelector('.display__end-time');
const btns = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
    // clear any existing timer
    clearInterval(countdown);
    const now = Date.now();
    const then = now + seconds * 1000;
    displayTimeLeft(seconds);
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondLeft = Math.round((then - Date.now()) / 1000);  
        // check if shop
        if(secondLeft < 0) {
            clearInterval(countdown);
            return;
        } 
        displayTimeLeft(secondLeft);
    }, 1000);
}

function displayTimeLeft(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remiderSeconds = seconds % 60;
    const display = `${minutes}:${remiderSeconds < 10 ? '0':'' }${remiderSeconds}`;
    document.title = display;
    timerDisplay.textContent = display;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hour = end.getHours();
    const minute = end.getMinutes();
    endtime.textContent = `Be Back At ${hour > 12 ? hour - 12 : hour}:${minute < 10 ? '0':'' }${minute}`;
}

function startTimer(){
   const seconds = parseInt(this.dataset.time);
   timer(seconds);
}

btns.forEach(btn => btn.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    this.reset();
});