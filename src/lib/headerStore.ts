import { writable } from "svelte/store";

export type HeaderStoreTypes = {
    size: 'sm' | 'md'
    route: 'main' | 'chrono' | 'edit'

    // data
    search: string,
    selected: string[]
}

const headerStore = writable<HeaderStoreTypes>({
    size: 'md',
    route: 'main',

    search: '',
    selected: []
})

export default headerStore
