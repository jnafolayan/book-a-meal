(exports => {
	const rawStore = {
		state: {
			navbar: {
				collapsed: true,
				fix: false
			}
		},

		getters: {
			navbarCollapsed(state) {
				return state.navbar.collapsed;
			},
			navbarFix(state) {
				return state.navbar.fix;
			}
		},

		mutations: {
			navbarCollapsed(state, payload) {
				state.navbar.collapsed = payload;
			},
			navbarFix(state, payload) {
				state.navbar.fix = payload;
			}
		}
	};
	
	const { state, getters, mutations } = rawStore;

	exports.commit = (prop, payload) => {
		const handler = mutations[prop];
		handler.call(null, state, payload);
	};

	Object.entries(getters)
		.forEach(([prop, method]) => {
			exports.__defineGetter__(prop, () => method(state));
		});

})(window.store = {});