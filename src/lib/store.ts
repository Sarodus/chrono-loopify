import { v4 as uuid } from 'uuid';
import { writable } from 'svelte/store';
import { browser } from '$app/environment';

export type ChronoRecord = {
	id: string;
	title: string;
	description: string;
	nodes: ChronoNode[];
};

export type ChronoNode = LoopNode | TimeNode;

export type TimeNode = {
	isLoop: false;
	title: string;
	duration: number;
	pauseOnFinish: boolean;
	color: string;
	skipRepetitions: number[];
	parentTitle?: string;
	deep?: number;
	totalTime?: number
	repetition?: number;
	totalRepetitions?: number;
};

export type LoopNode = {
	isLoop: true;
	title: string;
	loops: number;
	nodes: ChronoNode[];
};

const CHRONOS_KEY = 'CHRONOS_KEY';

function createChronoStore() {
	const store = writable<ChronoRecord[]>([]);

	function createEmptyChrono() {
		const id = uuid();
		const chrono: ChronoRecord = {
			id,
			title: '',
			description: '',
			nodes: []
		};
		store.update((chronos) => [...chronos, chrono]);
		return id;
	}

	function saveChrono(chrono: ChronoRecord) {
		chronoStore.update((chronos) => {
			const index = chronos.findIndex(c => c.id === chrono.id)
			chronos[index] = chrono;
			localStorage.setItem(CHRONOS_KEY, JSON.stringify(chronos))
			return chronos;
		})
	}

	function init() {
		store.set(
			JSON.parse(localStorage.getItem(CHRONOS_KEY) || '[]') || []
		)
	}

	if (browser) {
		init();
	}

	return {
		...store,
		createEmptyChrono,
		saveChrono
	};
}

const chronoStore = createChronoStore();
export default chronoStore;
