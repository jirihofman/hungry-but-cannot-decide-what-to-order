import SlotsMachine from "./machine";

export default async function Home() {

	return (
		<div>
			<div className="hidden w-screen h-px animate-glow md:block animate-fade-left bg-gradient-to-r from-zinc-300/0 via-zinc-300/50 to-zinc-300/0" />

			<SlotsMachine />
		</div>
	);
}
