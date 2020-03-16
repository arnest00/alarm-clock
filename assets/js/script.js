const alarm = new Audio('https://freespecialeffects.co.uk/soundfx/computers/bleep_06.wav');
alarm.loop = true;

let time = document.getElementById('time');
// period[1] is am, period[2] is pm
let period = document.getElementsByClassName('period');
let hourSelect = document.getElementById('hour-select');
let minSelect = document.getElementById('min-select');
let secSelect = document.getElementById('sec-select');
let perSelect = document.getElementById('per-select');
let setButton = document.getElementById('set-button');
let clearButton = document.getElementById('clear-button');
let currentPer = '';
let alarmHour = '';
let alarmMin = '';
let alarmSec = '';
let alarmPer = '';

// add zero if less than two digits
function addZero(unit) {
	return (unit < 10) ? '0' + unit : unit;
}

// find if time is am or pm
function findPeriod(hour) {
	if (hour < 12) {
		period[1].classList.add('hidden');
		period[0].classList.remove('hidden');
		currentPer = 'am';
	} else {
		period[0].classList.add('hidden');
		period[1].classList.remove('hidden');
		currentPer = 'pm';
	};
}

function hourMenu() {
	let hours = 12;
	for (i = 1; i <= hours; i++) {
		hourSelect.options[hourSelect.options.length] = new Option(i < 10 ? "0" + i: i, i);
	};
}
hourMenu();

function minMenu() {
	let mins = 59;
	for (i = 0; i <= mins; i++) {
		minSelect.options[minSelect.options.length] = new Option(i < 10 ? "0" + i : i, i);
	};
}
minMenu();

function secMenu() {
	let secs = 59;
	for (i = 0; i <= secs; i++) {
		secSelect.options[secSelect.options.length] = new Option(i < 10 ? "0" + i : i, i);
	};
}
secMenu();

function alarmInit() {
	alarmHour = '';
	alarmMin = '';
	alarmSec = '';
	alarmPer = '';
}

// displays the current time
const currentTime = setInterval(() => {
	let date = new Date(),
			hours = date.getHours(),
			minutes = date.getMinutes(),
			seconds = date.getSeconds();
	findPeriod(hours);
	// convert 24-hr clock to 12-hr clock
	if (hours > 12) {
		hours = hours - 12;
	} else if (hours === 0) {
		hours = 12;
	} else {
		hours = hours;
	};
	time.textContent =
		`${addZero(hours)}:${addZero(minutes)}:${addZero(seconds)}`;
	// hourChime(minutes, seconds);
// refreshes every 1000 milliseconds
}, 1000);

// sets the alarm
setButton.onclick = function alarmSet() {
	alarmInit();
	alarmHour = hourSelect.options[hourSelect.selectedIndex].value;
	alarmMin = minSelect.options[minSelect.selectedIndex].value;
	alarmSec = secSelect.options[secSelect.selectedIndex].value;
	alarmPer = perSelect.options[perSelect.selectedIndex].value;
	const alarmTime = `${addZero(alarmHour)}:${addZero(alarmMin)}:${addZero(alarmSec)}`;
	// disable select while alarm is active
	hourSelect.disabled = true;
	minSelect.disabled = true;
	secSelect.disabled = true;
	perSelect.disabled = true;
	// checks every second to sound alarm
	setInterval(() => {
		if (alarmTime === time.textContent && alarmPer === currentPer) {
			alarm.play();
		}
	}, 1000);
}

// clears the alarm
clearButton.onclick = function alarmClear() {
	alarmInit();
	hourSelect.disabled = false;
	minSelect.disabled = false;
	secSelect.disabled = false;
	perSelect.disabled = false;
	// stops alarm playback
	alarm.pause();
	// resets alarm to initial state
	alarm.load();
}