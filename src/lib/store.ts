import { v4 as uuid } from 'uuid';
import { writable } from "svelte/store";
import { browser } from '$app/environment';

export type ChronoRecord = {
    id: string;
    title: string;
    description: string;
    nodes: ChronoNode[]
};

export type ChronoNode = LoopNode | TimeNode

export type TimeNode = {
    isLoop: false,
    title: string,
    duration: number,
    pauseOnFinish: boolean,
    color: string,
    skipRepetitions: number[]
    parentTitle?: string
}

export type LoopNode = {
    isLoop: true,
    title: string,
    loops: number,
    nodes: ChronoNode[]
}


function createChronoStore() {
    const store = writable<ChronoRecord[]>([])

    function createEmptyChrono() {
        const id = uuid()
        const chrono: ChronoRecord = {
            id,
            title: '',
            description: '',
            nodes: []
        }
        store.update(chronos => [...chronos, chrono])
        return id
    }

    function init() {
        store.set([{
            id: 'cb0f2e35-0584-420a-bd11-8002295337e8',
            title: 'Workout',
            description: 'This is the description',
            nodes: [
                {
                    isLoop: false,
                    title: 'my first chrono',
                    duration: 10,
                    pauseOnFinish: false,
                    color: '#4e8',
                    skipRepetitions: []
                }
            ]
        },
        {
            id: uuid(),
            title: 'Exercice',
            description: 'This is the description',
            nodes: []
        },
        {
            id: uuid(),
            title: 'Yaaas',
            description: 'This is the description',
            nodes: []
        }])
    }
    if (browser) {
        init()
    }

    return {
        ...store,
        createEmptyChrono
    }
}

const chronoStore = createChronoStore()
export default chronoStore
