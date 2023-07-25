import type { ChronoNode, TimeNode } from './store';

export type Step = {
	from: number;
	to: number;
	deep: number;
	color: string;
};

export function nodesToTimeText(nodes: ChronoNode[]) {
	const time = getTotalTimeFromNodes(nodes);
	return timeToText(time);
}

export function getTotalTimeFromNodes(nodes: ChronoNode[]) {
	const timeNodes = getSequentialTimeNodeFromChronoNode(nodes);
	return getTotalTimeFromTimeNodes(timeNodes);
}

export function getTotalTimeFromTimeNodes(timeNodes: TimeNode[]) {
	return timeNodes.reduce((val, node) => val + node.duration, 0);
}

export function getStepsFromTimeNodes(nodes: TimeNode[]) {
	const result: Step[] = [];
	let total = 0;
	for (const node of nodes) {
		const from = total;
		total += node.duration;
		result.push({ from, to: total, deep: node.deep ?? 0, color: node.color });
	}
	return result;
}

export function findStep(steps: Step[], time: number) {
	let index = 0;
	let step: Step = { from: 0, to: 0, deep: 0, color: '#000' };
	for (let i = 0; i < steps.length; i++) {
		step = steps[i];
		index = i;
		if (step.to > time) {
			break;
		}
	}
	return { index, step };
}

export function timeToText(time: number) {
	const hours = Math.floor(time / 3600);
	const minutes = Math.floor((time % 3600) / 60);
	const seconds = time % 60;
	const parts = [hours, minutes, seconds];
	while (parts.length && !parts[0]) {
		parts.shift();
	}
	return parts.map((part) => part.toString().padStart(2, '0')).join(':') || '0';
}

export function getSequentialTimeNodeFromChronoNode(
	nodes: ChronoNode[],
	parentTitle: string = '',
	deep: number = 0
): TimeNode[] {
	const result: TimeNode[] = [];
	for (let i = 0; i < nodes.length; i++) {
		const node = nodes[i];
		if (node.isLoop) {
			const subnodes = getSequentialTimeNodeFromChronoNode(node.nodes, node.title, deep + 1);
			result.push(...subnodes);
		} else {
			if (parentTitle) {
				node.parentTitle = parentTitle;
			}
			node.deep = deep;
            node.totalTime = result.reduce((total, node) => total + node.duration, 0)
			if (!node.skipRepetitions.includes(i)) {
				result.push(node);
			}
		}
	}
	return result;
}
