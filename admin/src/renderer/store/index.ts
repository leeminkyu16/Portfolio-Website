/* eslint-disable import/no-import-module-exports */
import { applyMiddleware, createStore, Store } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";

import { rootReducer } from "./reducers";
import { RootState } from "./RootState";

const configureStore = (initialState?: RootState): Store<RootState | undefined> => {
	const middlewares: any[] = [];
	const enhancer = composeWithDevTools(applyMiddleware(...middlewares));
	return createStore(rootReducer, initialState, enhancer);
};

const store: Store<RootState | undefined> = configureStore();

if (typeof module.hot !== "undefined") {
	module.hot.accept("./reducers", (): void =>
		store.replaceReducer(require("./reducers").rootReducer),
	);
}

export default store;
