$(document).ready(function() {

	var setSession = 25;
	var setBreak = 5;
	var count = toSeconds(setSession);
	var interval = null;
	$('input#session').val(setSession);
	$('input#break').val(setBreak);
	$('p#break-or-session').text('Session:');

	function toSeconds(num) {
		var seconds = num * 60;
		return seconds;
	};

	function displayMinute(num) {
		if (Math.floor(num / 60) === 0) {
			return "00";
		} else if (Math.floor(num / 60) < 10) {
			return "0" + Math.floor(num/60);
		} else {
			return Math.floor(num/60);
		};
	};

	function displaySeconds(num) {
		if (num % 60 === 0) {
			return "00";
		} else if (num % 60 < 10) {
			return "0" + (num % 60);
		} else {
			return num % 60;
		};
	};

	function displayTime(num) {
		$("span#counter").text(displayMinute(num) + ":" + displaySeconds(num));
	};

	function countdown(num) {
		count = num;
		displayTime(count);
		interval = setInterval(function() {
			count = count - 1;
			displayTime(count);
			if (count === 0) {
				clearInterval(interval);
				interval = null;
				if ($('p#break-or-session').text() === 'Session:') {
					$('p#break-or-session').text('Break:');
					displayTime(toSeconds(setBreak));
					countdown(toSeconds(setBreak));
				} else if ($('p#break-or-session').text() === 'Break:') {
					$('p#break-or-session').text('Session:');
					displayTime(toSeconds(setSession));
					countdown(toSeconds(setSession));
				};
			};
		}, 1000);
	};

	displayTime(toSeconds(setSession));

	$('button#play').on('click', function() {
		if (interval === null) {
			countdown(count);
		};
	});

	$('button#pause').on('click', function() {
		clearInterval(interval);
		interval = null;
	});

	$('button#stop').on('click', function() {
		clearInterval(interval);
		interval = null;
		displayTime(toSeconds(setSession));
		$('p#break-or-session').text('Session:');
		count = toSeconds(setSession);
	});

	$('button#refresh').on('click', function() {
		if (interval === null) {
			clearInterval(interval);
			interval = null;
			setSession = 25;
			setBreak = 5;
			count = toSeconds(setSession);
			displayTime(toSeconds(setSession));
			$('input#session').val(setSession);
			$('input#break').val(setBreak);
			$('p#break-or-session').text('Session:');
		};
	});

	$('button#session-increase').on('click', function() {
		if (interval === null) {
			setSession = setSession + 1;
			count = toSeconds(setSession);
			$('input#session').val(setSession);
			displayTime(toSeconds(setSession));
		}
	});

	$('button#session-decrease').on('click', function() {
		if (interval === null) {
			if (setSession === 1) {
			} else {
				setSession = setSession - 1;
				count = toSeconds(setSession);
				$('input#session').val(setSession);
				displayTime(toSeconds(setSession));
			};
		};
	});

	$('button#break-increase').on('click', function() {
		if (interval === null) {
			setBreak = setBreak + 1;
			$('input#break').val(setBreak);
		};
	});

	$('button#break-decrease').on('click', function() {
		if (interval === null) {
			if (setBreak === 1) {
			} else {
				setBreak = setBreak - 1;
				$('input#break').val(setBreak);
			};
		};
	});

	$('input#session').on('input', function() {
		if (interval === null) {
			setSession = parseInt($('input#session').val(), 10);
			count = toSeconds(setSession);
			$('input#session').val(setSession);
			displayTime(toSeconds(setSession));
		}
	});

	$('input#break').on('input', function() {
		if (interval === null) {
			if (setBreak === 1) {
			} else {
				setBreak = parseInt($('input#break').val(), 10);
				$('input#break').val(setBreak);
			};
		};
	});

});