'use client';
import { SLOTS_PER_REEL } from './const';

export default function Slots({ options = [] }) {

	const REEL_RADIUS = 150;
	const slotAngle = 360 / SLOTS_PER_REEL;

	const slots = [];
	for (let i = 0; i < SLOTS_PER_REEL; i++) {
		const slotStyle = {
			// compute and assign the transform for this slot
			transform: 'rotateX(' + (slotAngle * i) + 'deg) translateZ(' + REEL_RADIUS + 'px)'
		}

		// If there is fewer options than slots, repeat the options.
		const index = i % options.length;
		const slot = <div key={i} className="slot" style={slotStyle}>
			<p>{options[index]}</p>
		</div>

		// add the poster to the row
		slots.push(slot);
	}

	return slots;
}
