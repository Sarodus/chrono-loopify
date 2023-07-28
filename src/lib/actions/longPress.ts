type LongPressOptions = {
	delay: number;
	click: () => any;
	longPress: () => any;
};
const defaultLongPressOptions: LongPressOptions = {
	delay: 500,
	click: () => {},
	longPress: () => {}
};

export default function longPress(node: HTMLElement, options: Partial<LongPressOptions> = {}) {
	node.addEventListener('mousedown', onStart);
	node.addEventListener('touchstart', onStart);
	node.addEventListener('click', onEnd);

	const ops: LongPressOptions = {
		...defaultLongPressOptions,
		...options
	};

	let timeout: ReturnType<typeof setTimeout>;
	let isLongPress = false;

	function onStart(event: Event) {
		clearTimeout(timeout);
		isLongPress = false;
		timeout = setTimeout(() => {
			event.preventDefault();
			isLongPress = true;
			ops.longPress();
		}, ops.delay);
	}

	function onEnd(event: Event) {
		clearTimeout(timeout);
		event.preventDefault();
		if (!isLongPress) {
			ops.click();
		}
	}

	return () => {
		clearTimeout(timeout);
		node.removeEventListener('mousedown', onStart);
		node.removeEventListener('touchstart', onStart);
		node.removeEventListener('click', onEnd);
	};
}
