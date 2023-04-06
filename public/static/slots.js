const SLOTS_PER_REEL = 12;
// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
// current settings give a value of 149, rounded to 150
const REEL_RADIUS = 150;

const ALL_OPTIONS = {
	hk1: ['Avion', 'Choosy Fresh', 'Náplavka', 'Nepálská'],
	hk2: ['Avion', 'Hieu Thao', 'Choosy Fresh', 'Cook Look', 'Localis', 'McDonald\'s', 'Na Hradě', 'Sport cafe', 'Ugo', 'Uvař si!', 'Nežer!'],
	emoji: ['🥞', '🥩', '🌭', '🍔', '🍕', '🥗', '🍣', '🥪', '🌮', '🍜', '🍰'],
	level5vegan: ['🍎', '🍌', '🥦', '🥑', '🥒', '🌽', '🥔', '🍠', '🥕', '🥬', '🫑', '🍍']
}

function createSlots(ring, options) {

	const slotAngle = 360 / SLOTS_PER_REEL;

	for (let i = 0; i < SLOTS_PER_REEL; i++) {
		const slot = document.createElement('div');

		slot.className = 'slot';

		// compute and assign the transform for this slot
		const transform = 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)';

		slot.style.transform = transform;

		// setup the number to show inside the slots
		// the position is randomized to 
		const option = Math.floor(Math.random() * options.length)
		$(slot).append('<p>' + options[option] + '</p>');

		// add the poster to the row
		ring.append(slot);
	}
}

function getSeed() {
	// generate random number smaller than 13 then floor it to settle between 0 and 12 inclusive
	return Math.floor(Math.random() * (SLOTS_PER_REEL));
}

function spin(timer) {
	//const txt = 'seeds: ';

	let oldSeed = -1;
	/*
	checking that the old seed from the previous iteration is not the same as the current iteration;
	if this happens then the reel will not spin at all
	*/
	const oldClass = $('#ring').attr('class');
	if (oldClass.length > 4) {
		oldSeed = parseInt(oldClass.slice(10));
	}
	let seed = getSeed();
	while (oldSeed == seed) {
		seed = getSeed();
	}

	$('#ring')
		.css('animation', 'back-spin 1s, spin-' + seed + ' ' + timer + 's')
		.attr('class', 'ring spin-' + seed);
}

$(document).ready(function() {

	const urlParams = new URLSearchParams(window.location.search);
	const foodType = urlParams.get('t') || 'emoji'; // type
	console.log("Food type:", foodType)

	let options;
	switch (foodType) {
		case "mix1":
			options = ALL_OPTIONS.emoji + ALL_OPTIONS.emoji
			break;

		default:
			options = ALL_OPTIONS[foodType] || ALL_OPTIONS.emoji
			break;
	}

	// initiate slots
	createSlots($('#ring'), options);

	// hook start button
	$('.go').on('click', function() {
		//createSlots($('#ring'), options);
		const timer = 3;
		spin(timer);
	})

	// hook xray checkbox
	$('#xray').on('click', function() {
		let tilt = 'tiltout';

		if ($(this).is(':checked')) {
			tilt = 'tiltin';
			$('.slot').addClass('backface-on');
			$('#rotate').css('animation', tilt + ' 2s 1');

			setTimeout(function() {
				$('#rotate').toggleClass('tilted');
			}, 2000);
		} else {
			tilt = 'tiltout';
			$('#rotate').css({ 'animation': tilt + ' 2s 1' });

			setTimeout(function() {
				$('#rotate').toggleClass('tilted');
				$('.slot').removeClass('backface-on');
			}, 1900);
		}
	})

	// hook perspective
	$('#perspective').on('click', function() {
		$('#stage').toggleClass('perspective-on perspective-off');
	})
});
