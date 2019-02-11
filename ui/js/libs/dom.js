const dom = (() => {
	function query(selector) {
		const isNode = selector == document || selector == window;
		return wrapNodes(isNode ? [selector] : document.querySelectorAll(selector));
	}

	function wrapNodes(nodes) {
		function each(cb) {
			[...nodes].forEach(cb);
		}

		return {
			on(event, cb) {
				each(node => node.addEventListener(event, cb, false));
				return this;
			},
			toggleClass(className) {
				each(node => node.classList.toggle(className));
			},
			addClass(className) {
				each(node => node.classList.add(className));
			},
			removeClass(className) {
				each(node => node.classList.remove(className));
			},
			hasClass(className) {
				return nodes[0].classList.contains(className);
			},
			isVisible() {
				return getComputedStyle(nodes[0]).display != 'none';
			}
		}
	}

	return {
		query
	}
})();