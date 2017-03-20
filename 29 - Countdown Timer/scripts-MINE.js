let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

function displayTimeLeft(seconds) {
	const minutes = Math.floor(seconds / 60);
	const secondsRemaining = seconds % 60;
	const display = `${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
	document.title = display;
	timerDisplay.textContent = display;
}

function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minute = end.getMinutes();
	endTime.textContent = `Will return at: ${hour > 12 ? hour - 12 : hour}:${minute < 10 ? '0' : ''}${minute}`;
}

function timer(seconds) {
	const now = Date.now();
	const then = now + (seconds * 1000);
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		if (secondsLeft < 0) {
			clearInterval(countdown);
			return;
		}
		displayTimeLeft(secondsLeft);
	}, 1000);
}

function startTimer() {
	clearInterval(countdown);
	const secsChosen = parseInt(this.dataset.time);
	timer(secsChosen);
}

buttons.forEach(button => button.addEventListener('click', startTimer));
document.customForm.addEventListener('submit', function(e) {
	clearInterval(countdown);
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins * 60);
	this.reset();
});
