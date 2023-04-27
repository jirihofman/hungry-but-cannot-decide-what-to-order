'use client';
import { useState } from 'react';
import Slots from './slots.jsx';
import { ALL_OPTIONS, SLOTS_PER_REEL, TIMER } from './const';

export default function Machine() {

	const [seed, setSeed] = useState(-1);
	// Psuedoramdom number generator to get rid of mismatch between server and client values. Doesn't work all the time. 1 second difference is common.
	// Error: xt content did not match. Server: "🥞" Client: "🍰"
	const [options, setOptions] = useState(ALL_OPTIONS.emoji.sort(() => .5 - new Date().getSeconds() / 60));

	function handleGoClick() {

		// Randomize options on every go.
		setOptions(options.sort(() => .5 - Math.random()))
		setSeed(Math.floor(Math.random() * (SLOTS_PER_REEL)));
	}

	const className = seed === -1 ? '' : `spin-${seed}`;
	const animation = seed === -1 ? '' : 'back-spin 1s, spin-' + seed + ' ' + TIMER + 's';

	return (
		<main className='flex flex-col items-center w-screen h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black'>
			<div className="mt-1 text-center animate-fade-in">
				<h2 className="text-lg text-zinc-300">
					Bon appétit!
				</h2>
			</div>
			<div className="perspective-on text-lg text-zinc-500">
				<div id="rotate" className=''>
					<div className={`ring ${className}`} style={{ animation }}>
						<Slots options={options} />
					</div>
				</div>
				<div className="mt-36 flex justify-center text-sm duration-1000 cursor-default whitespace-nowrap">
					<button onClick={() => setOptions(ALL_OPTIONS.hk1)} className="hover:bg-blue-700 text-zinc-300 font-bold py-2 px-2 rounded rounded-lg">HK fancy</button>
					<button onClick={() => setOptions(ALL_OPTIONS.hk2)} className="hover:bg-blue-700 text-zinc-300 font-bold py-2 px-2 rounded rounded-lg">HK mainstream</button>
					<button onClick={() => setOptions(ALL_OPTIONS.emoji)} className="hover:bg-blue-700 text-zinc-300 font-bold py-2 px-2 rounded rounded-lg">Emoji</button>
					<button onClick={() => setOptions(ALL_OPTIONS.level5vegan)} className="flex flex-row hover:bg-blue-700 text-zinc-300 font-bold py-2 px-2 rounded rounded-lg">Ultravegan</button>
				</div>
				<div className="mt-2 flex flex-row justify-center">
					<button style={{ color: '#dc1c22', fontStyle: 'italic'}} className='flex flex-row hover:bg-zinc-300 text-zinc-300 font-bold py-2 px-2 rounded rounded-lg border-zinc-500' onClick={() => handleGoClick()}>Vyber jídlo</button>
				</div>

				{/* This is gone for a long time. See original codepen or first commit to see how it worked. */}
				<div className="hidden">
					<label>
						<input type="checkbox" id="xray" />
						Show inner workings
					</label>
					<label>
						<input type="checkbox" id="perspective" />
						Toggle perspective
					</label>
				</div>
			</div>
		</main>
	);
}
