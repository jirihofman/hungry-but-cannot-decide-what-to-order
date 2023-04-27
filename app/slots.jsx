'use client';
import { SLOTS_PER_REEL } from './const';
// Desc: Client component for the slots game.
export default function Slots({ options = [] }) {

	// radius = Math.round( ( panelWidth / 2) / Math.tan( Math.PI / SLOTS_PER_REEL ) ); 
	// current settings give a value of 149, rounded to 150
	const REEL_RADIUS = 150;

	const slotAngle = 360 / SLOTS_PER_REEL;

	const slots = [];
	for (let i = 0; i < SLOTS_PER_REEL; i++) {
		const slotStyle = {
			// compute and assign the transform for this slot
			transform: 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)'
		}

		// setup the number to show inside the slots
		// the position is randomized to 
		const option = Math.floor(Math.random() * options.length)		
		const slot = <div key={i} className="slot" style={slotStyle}>
			<p>{options[option]}</p>
		</div>


		// add the poster to the row
		slots.push(slot);
	}

	return slots;
}
