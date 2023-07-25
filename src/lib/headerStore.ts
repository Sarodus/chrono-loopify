import { writable } from "svelte/store";

export type HeaderStoreTypes = {
    size: 'sm' | 'md'
    route: 'main' | 'chrono' | 'edit'

    // data
    search: string,
    selected: string[]
}

type ActionHandler = (action: string) => any

function createHeaderStore() {

    const store = writable<HeaderStoreTypes>({
        size: 'md',
        route: 'main',

        search: '',
        selected: []
    })

    let handler: ActionHandler

    function sendAction(action: string) {
        handler?.(action)
    }

    function setHandler(_handler: ActionHandler) {
        handler = _handler;
    }

    return {
        ...store,
        sendAction,
        setHandler
    }
}

const headerStore = createHeaderStore();
export default headerStore
