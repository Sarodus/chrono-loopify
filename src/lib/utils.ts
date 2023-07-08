import type { ChronoNode, TimeNode } from "./store";

export function nodesToTimeText(nodes: ChronoNode[]) {
    const time = getTotalTimeFromNodes(nodes)
    return timeToText(time)
}

export function getTotalTimeFromNodes(nodes: ChronoNode[]) {
    return Math.floor(Math.random() * 100)
}

export function timeToText(time: number) {
    const hours = Math.floor(time / 60 / 60);
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    const parts = [hours, minutes, seconds];
    for (let i = 0; i < parts.length; i++) {
        const part = parts[i];
        if (part) {
            break;
        }
        parts.shift();
    }
    return parts.map((part) => part.toString().padStart(2, '0')).join(':');
}

export function getSequentialTimeNodeFromChronoNode(nodes: ChronoNode[], parentTitle?: string): TimeNode[] {
    const result: TimeNode[] = []
    for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        if (node.isLoop) {
            const subnodes = getSequentialTimeNodeFromChronoNode(node.nodes, node.title)
            result.push(...subnodes)
        } else {
            if (parentTitle) {
                node.parentTitle = parentTitle;
            }
            if (!node.skipRepetitions.includes(i)) {
                result.push(node)
            }
        }
    }
    return result
}
