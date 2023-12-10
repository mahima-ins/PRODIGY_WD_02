let timerDisplay = document.querySelector('.timerDisplay');
let stopBtn = document.getElementById('stopBtn');
let startBtn = document.getElementById('startBtn');
let resetBtn = document.getElementById('resetBtn');
let lapBtn = document.getElementById('lapBtn');

let msec = 00;
let secs = 00;
let mins = 00;

let timerId = null;
let lapTimes = []

startBtn.addEventListener('click', function(){
    if(timerId !== null){
        clearInterval(timerId);
    }
    timerId = setInterval(startTimer, 10);
});

stopBtn.addEventListener('click', function(){
    clearInterval(timerId);
});

resetBtn.addEventListener('click', function(){
    clearInterval(timerId);
    timerDisplay.innerHTML = `00 : 00 : 00`;
    msec = secs = mins = 00;
    
    lapTimes = [];
    displayLapTimes();
});

lapBtn.addEventListener('click', function(){
    if (timerId !== null) {
        lapTimes.push(formatTime(msec, secs, mins));
        displayLapTimes();
    }
});

function startTimer(){
    msec++;
    if(msec == 100){
        msec = 0;
        secs++;
        if(secs == 60){
            secs = 0;
            mins++;
        }
    }

    timerDisplay.innerHTML = formatTime(msec, secs, mins);
}

function formatTime(millisecond, second, minute) {
    let msecString = millisecond < 10 ? `0${millisecond}` : millisecond;
    let secsString = second < 10 ? `0${second}` : second;
    let minsString = minute < 10 ? `0${minute}` : minute;

    return `${minsString} : ${secsString} : ${msecString}`;
}

function displayLapTimes() {
    const lapTimesContainer = document.getElementById('lapTimes');
    lapTimesContainer.innerHTML = '';

    lapTimes.forEach((lapTime, index) => {
        const lapTimeDisplay = document.createElement('div');
        lapTimeDisplay.textContent = `Lap ${index + 1}: ${lapTime}`;
        lapTimesContainer.appendChild(lapTimeDisplay);
    });
}